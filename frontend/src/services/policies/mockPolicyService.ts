import { Policy, PolicyWorkspace } from '../../types/policy';
import { IPolicyService } from './policyService';
import { getAllPolicies, getPolicyWorkspace } from '../../mocks/policies';

export class MockPolicyService implements IPolicyService {
  async listMyPolicies(): Promise<Policy[]> {
    return getAllPolicies();
  }

  async getPolicyWorkspace(id: string): Promise<PolicyWorkspace> {
    const workspace = await getPolicyWorkspace(id);
    if (!workspace) throw new Error('Policy not found');
    return workspace;
  }
}
