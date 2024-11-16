import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  accountType: string;
  companyName?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    accountType: string;
    companyName?: string;
  };
}

export const authApi = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  }
}; 