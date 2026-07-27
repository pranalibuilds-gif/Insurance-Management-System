import apiClient from '../../api/client';
import { UserLogin, UserCreate, Token, UserRead } from '../../types/auth';
import { IAuthService } from './authService';

export class ApiAuthService implements IAuthService {
  async login(data: UserLogin): Promise<Token> {
    const response = await apiClient.post<Token>('/auth/login', data);
    const token = response.data;
    localStorage.setItem('auth_token', token.access_token);
    return token;
  }

  async register(data: UserCreate): Promise<UserRead> {
    const response = await apiClient.post<UserRead>('/auth/register', data);
    return response.data;
  }

  async getCurrentUser(): Promise<UserRead> {
    const response = await apiClient.get<UserRead>('/auth/me'); // To be implemented in backend
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
