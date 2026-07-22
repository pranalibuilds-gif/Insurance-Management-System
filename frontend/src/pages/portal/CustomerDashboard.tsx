import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { WelcomeCard } from '../../features/dashboard/WelcomeCard';
import { ActivePoliciesCard } from '../../features/dashboard/ActivePoliciesCard';
import { QuickActionsCard } from '../../features/dashboard/QuickActionsCard';
import { ActivityFeed } from '../../features/dashboard/ActivityFeed';
import { StatCard } from '../../components/molecules/StatCard';
import { PageHeader } from '../../components/molecules/PageHeader';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { Shield, Clock, FileCheck } from 'lucide-react';
import { getCustomerProfile } from '../../mocks/customers';
import { getCustomerPolicies } from '../../mocks/policies';
import { getCustomerClaims } from '../../mocks/claims';
import { Policy } from '../../types/policy';

const CustomerDashboard: React.FC = () => {
  const { data: customer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  const { data: policies, isLoading: isLoadingPolicies } = useQuery({
    queryKey: ['customer-policies', customer?.id],
    queryFn: () => getCustomerPolicies(customer!.id),
    enabled: !!customer?.id,
  });

  const { data: claims, isLoading: isLoadingClaims } = useQuery({
    queryKey: ['customer-claims', policies?.map((p: Policy) => p.id)],
    queryFn: () => getCustomerClaims(policies!.map((p: Policy) => p.id)),
    enabled: !!policies && policies.length > 0,
  });

  const isLoading = isLoadingCustomer || isLoadingPolicies || isLoadingClaims;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-entrance">
        <LoadingSkeleton variant="list" count={1} className="h-48 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton variant="cards" count={3} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton variant="list" count={5} />
          <LoadingSkeleton variant="list" count={5} />
        </div>
      </div>
    );
  }

  const activePoliciesCount = policies?.filter((p: Policy) => p.status === 'ACTIVE').length || 0;
  const pendingClaimsCount = claims?.filter(c => c.status !== 'PAID' && c.status !== 'REJECTED' && c.status !== 'CLOSED').length || 0;

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Dashboard"
        description="Monitor your insurance portfolio and recent activities at a glance."
      />

      {customer && <WelcomeCard kycStatus={customer.kycStatus} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Active Policies"
          value={activePoliciesCount}
          icon={Shield}
          trend={{ value: 12, isPositive: true }}
          description="Coverage in force"
        />
        <StatCard
          label="Next Premium"
          value="$1,240"
          icon={Clock}
          description="Due in 12 days"
        />
        <StatCard
          label="Open Claims"
          value={pendingClaimsCount}
          icon={FileCheck}
          description="Currently processing"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivePoliciesCard policies={policies || []} />
        <ActivityFeed activities={customer?.activities || []} />
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default CustomerDashboard;
