import { Claim, ClaimWorkspace, ClaimCreate } from '../../types/claim';

export interface IClaimService {
  getClaims(): Promise<Claim[]>;
  getClaimWorkspace(id: string): Promise<ClaimWorkspace>;
  submitClaim(data: ClaimCreate): Promise<Claim>;
  uploadEvidence(claimId: string, file: File): Promise<void>;
  updateStatus(claimId: string, status: string, notes: string): Promise<void>;
  assignInvestigator(claimId: string, userId: string): Promise<void>;
}
