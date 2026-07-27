import { InsuranceProduct, ProductCategory } from '../../types/product';

export interface IProductService {
  listProducts(): Promise<InsuranceProduct[]>;
  getProductById(id: string): Promise<InsuranceProduct>;
  getCategories(): Promise<ProductCategory[]>;
}
