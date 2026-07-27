import { UserLogin, UserCreate, Token, UserRead } from '../../types/auth';
import { IAuthService } from './authService';

export class MockAuthService implements IAuthService {
  async login(data: UserLogin): Promise<Token> {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      access_token: 'mock_token',
      token_type: 'bearer',
      refresh_token: 'mock_refresh_token',
    };
  }

  async register(data: UserCreate): Promise<UserRead> {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      id: 'mock_id',
      email: data.email,
      full_name: data.full_name,
      role: 'CUSTOMER',
      is_active: true,
      is_verified: false,
    };
  }

  async getCurrentUser(): Promise<UserRead> {
    await new Promise((r) => setTimeout(r, 500));
    return {
      id: 'mock_id',
      email: 'mock@example.com',
      full_name: 'Mock User',
      role: 'CUSTOMER',
      is_active: true,
      is_verified: true,
    };
  }

  logout(): void {
    console.log('Mock Logout');
  }
}
