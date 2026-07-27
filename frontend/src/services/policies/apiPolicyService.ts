import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { Policy, PolicyWorkspace } from '../../types/policy';
import { IPolicyService } from './policyService';

export class ApiPolicyService implements IPolicyService {
  async listMyPolicies(): Promise<Policy[]> {
    const response = await apiClient.get<Policy[]>(ENDPOINTS.POLICIES.MY);
    return response.data;
  }

  async getPolicyWorkspace(id: string): Promise<PolicyWorkspace> {
    const response = await apiClient.get<PolicyWorkspace>(ENDPOINTS.POLICIES.WORKSPACE(id));
    return response.data;
  }
}
