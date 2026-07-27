import { Policy, PolicyWorkspace } from '../../types/policy';

export interface IPolicyService {
  listMyPolicies(): Promise<Policy[]>;
  getPolicyWorkspace(id: string): Promise<PolicyWorkspace>;
}
