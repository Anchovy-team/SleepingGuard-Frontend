export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api';

export interface AuthRequest {
  login: string;
  password: string;
  name?: string;
  companyName?: string;
}

export interface AuthResponse {
  userId: number;
  login: string;
  name: string;
  companyName: string;
  message: string;
}

type ApiErrorObject = { message?: string; error?: string; details?: unknown };
type ApiErrorBody = ApiErrorObject | string | null;

const isBrowser = () => typeof window !== 'undefined';

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text; // plain text response
  }
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body) return fallback;
  if (typeof body === 'string') return body;

  if (typeof body === 'object') {
    const b = body as ApiErrorObject;
    return b.message || b.error || fallback;
  }

  return fallback;
}

async function postJson<T>(path: string, payload?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });

  const body = await parseBody(res);

  if (!res.ok) {
    throw new Error(extractErrorMessage(body, `Request failed (${res.status})`));
  }

  // For successful responses we expect JSON object
  if (!body || typeof body !== 'object') {
    throw new Error(`Unexpected backend response: ${String(body)}`);
  }

  return body as T;
}

const STORAGE_KEYS = {
  userId: 'sg.userId',
  login: 'sg.login',
  name: 'sg.name',
  companyName: 'sg.companyName',
} as const;

function safeGet(key: string): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
}

function safeSet(key: string, value: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
}

function safeRemove(key: string): void {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

export const authApi = {
  register: (credentials: AuthRequest) =>
    postJson<AuthResponse>('/auth/register', credentials),

  login: (credentials: AuthRequest) =>
    postJson<AuthResponse>('/auth/login', credentials),

  setAuth: (response: AuthResponse) => {
    if (!response?.userId) {
      throw new Error(
        `Backend did not return userId: ${JSON.stringify(response)}`
      );
    }
    if (!isBrowser()) return;

    safeSet(STORAGE_KEYS.userId, String(response.userId));
    safeSet(STORAGE_KEYS.login, response.login ?? '');
    safeSet(STORAGE_KEYS.name, response.name ?? '');
    safeSet(STORAGE_KEYS.companyName, response.companyName ?? '');
  },

  logout: () => {
    safeRemove(STORAGE_KEYS.userId);
    safeRemove(STORAGE_KEYS.login);
    safeRemove(STORAGE_KEYS.name);
    safeRemove(STORAGE_KEYS.companyName);
  },

  isAuthed: () => Boolean(safeGet(STORAGE_KEYS.userId)),

  getUser: (): {
    userId: number | null;
    login: string | null;
    name: string | null;
    companyName: string | null;
  } | null => {
    const userIdRaw = safeGet(STORAGE_KEYS.userId);
    if (!userIdRaw) return null;

    const userIdNum = Number(userIdRaw);
    return {
      userId: Number.isFinite(userIdNum) ? userIdNum : null,
      login: safeGet(STORAGE_KEYS.login),
      name: safeGet(STORAGE_KEYS.name),
      companyName: safeGet(STORAGE_KEYS.companyName),
    };
  },
};

export type BillingPeriod = 'MONTHLY' | 'YEARLY';

export interface OrderRequest {
  userId: number;
  subscriptionCount: number;
  physicalKeyCount: number;
}

export interface OrderResponse {
  message: string;
  orderId?: number;
}

export const orderApi = {
  create: (order: OrderRequest) =>
    postJson<OrderResponse>('/orders', order),
};
