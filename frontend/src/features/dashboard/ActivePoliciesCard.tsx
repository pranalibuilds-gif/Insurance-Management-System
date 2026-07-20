import React from 'react';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import { Policy } from '../../types/policy';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivePoliciesCardProps {
  policies: Policy[];
}

export const ActivePoliciesCard: React.FC<ActivePoliciesCardProps> = ({ policies }) => {
  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between">
        <h3 className="font-bold text-neutral-900">Active Policies</h3>
        <Link to="/portal/policies" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </Card.Header>
      <Card.Content className="p-0">
        <div className="divide-y divide-neutral-50">
          {policies.map((policy) => (
            <div key={policy.id} className="p-4 hover:bg-neutral-50/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{policy.policyNumber}</p>
                  <p className="text-xs text-neutral-500">Coverage: ${policy.coverageAmount.toLocaleString()}</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
          ))}
          {policies.length === 0 && (
            <div className="p-8 text-center text-neutral-500 italic">
              No active policies found.
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};
