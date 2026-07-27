import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { Claim, ClaimWorkspace, ClaimCreate } from '../../types/claim';
import { IClaimService } from './claimService';

export class ApiClaimService implements IClaimService {
  async getClaims(): Promise<Claim[]> {
    const response = await apiClient.get<Claim[]>(ENDPOINTS.CLAIMS.LIST);
    return response.data;
  }
  async getClaimWorkspace(id: string): Promise<ClaimWorkspace> {
    const response = await apiClient.get<ClaimWorkspace>(ENDPOINTS.CLAIMS.WORKSPACE(id));
    return response.data;
  }
  async submitClaim(data: ClaimCreate): Promise<Claim> {
    const response = await apiClient.post<Claim>(ENDPOINTS.CLAIMS.SUBMIT, data);
    return response.data;
  }
  async uploadEvidence(claimId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    await apiClient.post(`/claims/${claimId}/evidence`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
  async updateStatus(claimId: string, status: string, notes: string): Promise<void> {
    await apiClient.patch(`/claims/${claimId}/status`, { status, notes });
  }
  async assignInvestigator(claimId: string, userId: string): Promise<void> {
    await apiClient.post(`/claims/${claimId}/assign`, { userId });
  }
}
