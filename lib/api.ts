const API_BASE_URL = 'http://localhost:8080/api';

export interface AuthRequest {
  login: string;
  password: string;
  name?: string;
  companyName?: string;
  isLogin?: boolean;
}

export interface AuthResponse {
  id: number;
  login: string;
  name: string;
  companyName: string;
  message: string;
}

export const authApi = {
  register: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  },

  getToken: () => localStorage.getItem('token'),
  getUser: () => ({
    login: localStorage.getItem('login'),
    name: localStorage.getItem('name'),
    companyName: localStorage.getItem('companyName'),
  }),

  setAuth: (response: AuthResponse) => {
    localStorage.setItem('token', response.id.toString());
    localStorage.setItem('login', response.login);
    localStorage.setItem('name', response.name);
    localStorage.setItem('companyName', response.companyName);
  },
};
