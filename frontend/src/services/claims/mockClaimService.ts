import { Claim, ClaimWorkspace, ClaimCreate } from '../../types/claim';
import { IClaimService } from './claimService';
import { getClaims, getClaimWorkspace, mockClaims } from '../../mocks/claims';

export class MockClaimService implements IClaimService {
  async getClaims(): Promise<Claim[]> {
    return getClaims();
  }
  async getClaimWorkspace(id: string): Promise<ClaimWorkspace> {
    const workspace = await getClaimWorkspace(id);
    if (!workspace) throw new Error('Claim not found');
    return workspace;
  }
  async submitClaim(data: ClaimCreate): Promise<Claim> {
    const newClaim: Claim = {
      ...mockClaims[0],
      id: `clm_${Math.random().toString(36).substr(2, 9)}`,
      claimNumber: `CLM-${new Date().getFullYear()}-NEW`,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };
    return newClaim;
  }
  async uploadEvidence(claimId: string, file: File): Promise<void> {
    console.log('Mock Upload Evidence', claimId, file.name);
  }
  async updateStatus(claimId: string, status: string, notes: string): Promise<void> {
    console.log('Mock Update Status', claimId, status);
  }
  async assignInvestigator(claimId: string, userId: string): Promise<void> {
    console.log('Mock Assign', claimId, userId);
  }
}
