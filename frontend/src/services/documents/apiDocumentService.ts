import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { DocumentMetadata } from '../../types/document';
import { IDocumentService } from './documentService';

export class ApiDocumentService implements IDocumentService {
  async listDocuments(): Promise<DocumentMetadata[]> {
    const response = await apiClient.get<DocumentMetadata[]>(ENDPOINTS.DOCUMENTS.LIST);
    return response.data;
  }

  async getDocument(id: string): Promise<DocumentMetadata> {
    const response = await apiClient.get<DocumentMetadata>(ENDPOINTS.DOCUMENTS.DETAIL(id));
    return response.data;
  }

  async uploadDocument(file: File, category: string): Promise<DocumentMetadata> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const response = await apiClient.post<DocumentMetadata>(ENDPOINTS.DOCUMENTS.LIST, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.DOCUMENTS.DETAIL(id));
  }

  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<string[]>(ENDPOINTS.DOCUMENTS.CATEGORIES);
    return response.data;
  }
}
