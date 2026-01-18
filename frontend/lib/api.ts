const API_BASE_URL = 'http://localhost:8080/api';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
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
  getEmail: () => localStorage.getItem('email'),

  setAuth: (token: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  },
};
