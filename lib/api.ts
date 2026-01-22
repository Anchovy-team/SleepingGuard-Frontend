export const API_BASE_URL ='http://localhost:8080/api';

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

type ApiErrorBody =
  | { message?: string; error?: string; details?: any }
  | string
  | null;

async function parseBody(res: Response): Promise<ApiErrorBody> {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractErrorMessage(body: ApiErrorBody, fallback: string): string {
  if (!body) return fallback;
  if (typeof body === 'string') return body;
  return body.message || body.error || fallback;
}

async function postJson<T>(path: string, payload: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await parseBody(res);

  if (!res.ok) {
    throw new Error(extractErrorMessage(body, `Request failed (${res.status})`));
  }

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

export const authApi = {
  register: (credentials: AuthRequest) =>
    postJson<AuthResponse>('/auth/register', credentials),

  login: (credentials: AuthRequest) =>
    postJson<AuthResponse>('/auth/login', credentials),

  setAuth: (response: AuthResponse) => {
    if (!response?.userId) {
      throw new Error(`Backend did not return userId: ${JSON.stringify(response)}`);
    }

    localStorage.setItem(STORAGE_KEYS.userId, String(response.userId));
    localStorage.setItem(STORAGE_KEYS.login, response.login ?? '');
    localStorage.setItem(STORAGE_KEYS.name, response.name ?? '');
    localStorage.setItem(STORAGE_KEYS.companyName, response.companyName ?? '');
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.userId);
    localStorage.removeItem(STORAGE_KEYS.login);
    localStorage.removeItem(STORAGE_KEYS.name);
    localStorage.removeItem(STORAGE_KEYS.companyName);
  },

  isAuthed: () => {
    if (typeof window === 'undefined') return false;
    return Boolean(localStorage.getItem(STORAGE_KEYS.userId));
  },

  getUser: () => {
    if (typeof window === 'undefined') return null;
    return {
      userId: localStorage.getItem(STORAGE_KEYS.userId),
      login: localStorage.getItem(STORAGE_KEYS.login),
      name: localStorage.getItem(STORAGE_KEYS.name),
      companyName: localStorage.getItem(STORAGE_KEYS.companyName),
    };
  },
};