import { ApiAuthService } from './auth/apiAuthService';
import { MockAuthService } from './auth/mockAuthService';
import { IAuthService } from './auth/authService';
import { ApiProductService } from './products/apiProductService';
import { MockProductService } from './products/mockProductService';
import { IProductService } from './products/productService';
import { ApiPolicyService } from './policies/apiPolicyService';
import { MockPolicyService } from './policies/mockPolicyService';
import { IPolicyService } from './policies/policyService';
import { ApiCustomerService } from './customers/apiCustomerService';
import { MockCustomerService } from './customers/mockCustomerService';
import { ICustomerService } from './customers/customerService';
import { ApiDocumentService } from './documents/apiDocumentService';
import { MockDocumentService } from './documents/mockDocumentService';
import { IDocumentService } from './documents/documentService';
import { ApiPurchaseService } from './purchase/apiPurchaseService';
import { MockPurchaseService } from './purchase/mockPurchaseService';
import { IPurchaseService } from './purchase/purchaseService';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';

class ServiceFactory {
  private authService: IAuthService;
  private productService: IProductService;
  private policyService: IPolicyService;
  private customerService: ICustomerService;
  private documentService: IDocumentService;
  private purchaseService: IPurchaseService;

  constructor() {
    this.authService = isMock ? new MockAuthService() : new ApiAuthService();
    this.productService = isMock ? new MockProductService() : new ApiProductService();
    this.policyService = isMock ? new MockPolicyService() : new ApiPolicyService();
    this.customerService = isMock ? new MockCustomerService() : new ApiCustomerService();
    this.documentService = isMock ? new MockDocumentService() : new ApiDocumentService();
    this.purchaseService = isMock ? new MockPurchaseService() : new ApiPurchaseService();
  }

  getAuthService(): IAuthService { return this.authService; }
  getProductService(): IProductService { return this.productService; }
  getPolicyService(): IPolicyService { return this.policyService; }
  getCustomerService(): ICustomerService { return this.customerService; }
  getDocumentService(): IDocumentService { return this.documentService; }
  getPurchaseService(): IPurchaseService { return this.purchaseService; }
}

export const serviceFactory = new ServiceFactory();
