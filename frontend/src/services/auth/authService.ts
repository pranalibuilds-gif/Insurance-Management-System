import { UserLogin, UserCreate, Token, UserRead } from '../../types/auth';

export interface IAuthService {
  login(data: UserLogin): Promise<Token>;
  register(data: UserCreate): Promise<UserRead>;
  getCurrentUser(): Promise<UserRead>;
  logout(): void;
}
