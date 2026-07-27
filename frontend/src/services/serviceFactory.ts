import { ApiAuthService } from './auth/apiAuthService';
import { MockAuthService } from './auth/mockAuthService';
import { IAuthService } from './auth/authService';
import { ApiProductService } from './products/apiProductService';
import { MockProductService } from './products/mockProductService';
import { IProductService } from './products/productService';
import { ApiPolicyService } from './policies/apiPolicyService';
import { MockPolicyService } from './policies/mockPolicyService';
import { IPolicyService } from './policies/policyService';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';

class ServiceFactory {
  private authService: IAuthService;
  private productService: IProductService;
  private policyService: IPolicyService;

  constructor() {
    this.authService = isMock ? new MockAuthService() : new ApiAuthService();
    this.productService = isMock ? new MockProductService() : new ApiProductService();
    this.policyService = isMock ? new MockPolicyService() : new ApiPolicyService();
  }

  getAuthService(): IAuthService { return this.authService; }
  getProductService(): IProductService { return this.productService; }
  getPolicyService(): IPolicyService { return this.policyService; }
}

export const serviceFactory = new ServiceFactory();
