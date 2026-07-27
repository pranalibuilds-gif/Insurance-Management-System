import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { InsuranceProduct, ProductCategory } from '../../types/product';
import { IProductService } from './productService';

export class ApiProductService implements IProductService {
  async listProducts(): Promise<InsuranceProduct[]> {
    const response = await apiClient.get<InsuranceProduct[]>(ENDPOINTS.PRODUCTS.LIST);
    return response.data;
  }

  async getProductById(id: string): Promise<InsuranceProduct> {
    const response = await apiClient.get<InsuranceProduct>(ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  }

  async getCategories(): Promise<ProductCategory[]> {
    const response = await apiClient.get<ProductCategory[]>(ENDPOINTS.PRODUCTS.CATEGORIES);
    return response.data;
  }
}
