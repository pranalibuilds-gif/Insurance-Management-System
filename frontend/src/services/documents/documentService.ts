import { DocumentMetadata } from '../../types/document';

export interface IDocumentService {
  listDocuments(): Promise<DocumentMetadata[]>;
  getDocument(id: string): Promise<DocumentMetadata>;
  uploadDocument(file: File, category: string): Promise<DocumentMetadata>;
  deleteDocument(id: string): Promise<void>;
  getCategories(): Promise<string[]>;
}
