import { ApiAuthService } from './auth/apiAuthService';
import { MockAuthService } from './auth/mockAuthService';
import { IAuthService } from './auth/authService';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';

class ServiceFactory {
  private authService: IAuthService;

  constructor() {
    this.authService = isMock ? new MockAuthService() : new ApiAuthService();
  }

  getAuthService(): IAuthService {
    return this.authService;
  }
}

export const serviceFactory = new ServiceFactory();
