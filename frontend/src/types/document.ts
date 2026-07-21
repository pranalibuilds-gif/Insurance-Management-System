export type DocumentCategory =
  | 'IDENTITY'
  | 'ADDRESS'
  | 'POLICY'
  | 'CLAIM'
  | 'MEDICAL'
  | 'VEHICLE'
  | 'FINANCIAL'
  | 'OTHER';

export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';

export interface DocumentVersion {
  id: string;
  version: number;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: VerificationStatus;
}

export interface DocumentMetadata {
  id: string;
  title: string;
  category: DocumentCategory;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  remarks?: string;
  currentVersion: number;
  versions: DocumentVersion[];
}

export interface DocumentTimelineEvent {
  id: string;
  type: 'UPLOADED' | 'SUBMITTED' | 'ASSIGNED' | 'REVIEWED' | 'VERIFIED' | 'REJECTED';
  description: string;
  timestamp: string;
  actor: string;
}
