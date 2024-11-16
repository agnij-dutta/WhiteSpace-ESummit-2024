import { apiClient } from './api-client';
import { cookies } from 'next/headers';

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.auth.login({ email, password });
    const { token, user } = response.data;
    
    // Store token in HTTP-only cookie
    document.cookie = `token=${token}; path=/; HttpOnly; SameSite=Strict`;
    
    return { user };
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
}

export async function register(data: {
  email: string;
  password: string;
  accountType: 'personal' | 'company';
  companyName?: string;
}) {
  try {
    const response = await apiClient.auth.register(data);
    const { token, email } = response.data;
    
    // Store token in HTTP-only cookie
    document.cookie = `token=${token}; path=/; HttpOnly; SameSite=Strict`;
    
    return { email };
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Registration failed');
  }
}

export async function logout() {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.href = '/login';
} 