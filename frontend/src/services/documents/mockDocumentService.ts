import { DocumentMetadata } from '../../types/document';
import { IDocumentService } from './documentService';
import { mockDocuments, getDocuments } from '../../mocks/documents';

export class MockDocumentService implements IDocumentService {
  async listDocuments(): Promise<DocumentMetadata[]> {
    return getDocuments();
  }

  async getDocument(id: string): Promise<DocumentMetadata> {
    const doc = mockDocuments.find(d => d.id === id);
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  async uploadDocument(file: File, category: any): Promise<DocumentMetadata> {
    return {
      id: Math.random().toString(),
      title: file.name,
      category: category,
      mimeType: file.type,
      uploadedBy: 'Current User',
      uploadedAt: new Date().toISOString(),
      status: 'VERIFIED',
      currentVersion: 1,
      versions: []
    };
  }

  async deleteDocument(id: string): Promise<void> {
    return;
  }

  async getCategories(): Promise<string[]> {
    return ['IDENTITY', 'ADDRESS', 'MEDICAL', 'VEHICLE', 'FINANCIAL', 'OTHER'];
  }
}
