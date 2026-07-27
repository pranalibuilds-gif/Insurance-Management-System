import { InsuranceProduct, ProductCategory } from '../../types/product';
import { IProductService } from './productService';
import { mockProducts, getProducts, getProductById } from '../../mocks/products';

export class MockProductService implements IProductService {
  async listProducts(): Promise<InsuranceProduct[]> {
    return getProducts();
  }

  async getProductById(id: string): Promise<InsuranceProduct> {
    const product = await getProductById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async getCategories(): Promise<ProductCategory[]> {
    return ['HEALTH', 'VEHICLE', 'LIFE', 'TRAVEL'];
  }
}
