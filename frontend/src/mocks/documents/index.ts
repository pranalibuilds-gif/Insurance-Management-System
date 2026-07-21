import { DocumentMetadata, DocumentTimelineEvent } from '../../types/document';
import { mockDelay } from '..';

export const mockDocuments: DocumentMetadata[] = [
  {
    id: 'doc_1',
    title: 'Aadhaar Card',
    category: 'IDENTITY',
    mimeType: 'image/jpeg',
    uploadedBy: 'John Doe',
    uploadedAt: '2026-02-10T09:00:00Z',
    status: 'VERIFIED',
    verifiedBy: 'Agent Sarah',
    verifiedAt: '2026-02-10T14:30:00Z',
    currentVersion: 1,
    versions: [
      { id: 'v1_doc_1', version: 1, fileName: 'aadhaar_front.jpg', fileSize: 1024 * 450, uploadedAt: '2026-02-10T09:00:00Z', status: 'VERIFIED' }
    ]
  },
  {
    id: 'doc_2',
    title: 'Medical Report - Surgery',
    category: 'MEDICAL',
    mimeType: 'application/pdf',
    uploadedBy: 'John Doe',
    uploadedAt: '2026-03-18T10:00:00Z',
    status: 'REJECTED',
    remarks: 'Document image was blurry and unreadable.',
    currentVersion: 1,
    versions: [
      { id: 'v1_doc_2', version: 1, fileName: 'discharge_summary.pdf', fileSize: 1024 * 2500, uploadedAt: '2026-03-18T10:00:00Z', status: 'REJECTED' }
    ]
  },
  {
    id: 'doc_3',
    title: 'Driving License',
    category: 'VEHICLE',
    mimeType: 'image/png',
    uploadedBy: 'John Doe',
    uploadedAt: '2026-03-15T11:20:00Z',
    status: 'PENDING',
    currentVersion: 1,
    versions: [
      { id: 'v1_doc_3', version: 1, fileName: 'license_2026.png', fileSize: 1024 * 850, uploadedAt: '2026-03-15T11:20:00Z', status: 'PENDING' }
    ]
  }
];

export const getDocuments = async (): Promise<DocumentMetadata[]> => {
  await mockDelay();
  return mockDocuments;
};

export const getDocumentById = async (id: string): Promise<DocumentMetadata | undefined> => {
  await mockDelay();
  return mockDocuments.find(d => d.id === id);
};

export const getDocumentTimeline = async (docId: string): Promise<DocumentTimelineEvent[]> => {
  await mockDelay();
  return [
    { id: 'ev_1', type: 'UPLOADED', description: 'Document version 1 uploaded', timestamp: '2026-03-18T10:00:00Z', actor: 'John Doe' },
    { id: 'ev_2', type: 'SUBMITTED', description: 'Submitted for verification', timestamp: '2026-03-18T10:05:00Z', actor: 'John Doe' },
  ];
};
