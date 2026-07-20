import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getCustomerProfile } from '../../../mocks/customers';
import { Calendar, Shield, CreditCard, FileCheck } from 'lucide-react';

const ProfileOverview: React.FC = () => {
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={4} />;

  if (!customer) return null;

  const stats = [
    { label: 'Customer ID', value: customer.id, icon: Shield },
    { label: 'Customer Since', value: new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), icon: Calendar },
    { label: 'Linked Account', value: customer.email, icon: CreditCard },
    { label: 'Active Policies', value: '2', icon: FileCheck }, // Mocked for now
  ];

  return (
    <div className="space-y-6 animate-entrance">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h4 className="font-bold text-neutral-900 text-lg">Identity Status</h4>
          </Card.Header>
          <Card.Content className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">KYC Verification</span>
              <Badge variant={customer.kycStatus === 'VERIFIED' ? 'success' : 'warning'}>
                {customer.kycStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Profile Status</span>
              <Badge variant={customer.status === 'ACTIVE' ? 'success' : 'neutral'}>
                {customer.status}
              </Badge>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h4 className="font-bold text-neutral-900 text-lg">Quick Summary</h4>
          </Card.Header>
          <Card.Content className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-neutral-50/50 border border-neutral-100/50">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-sm font-bold text-neutral-900 truncate">{stat.value}</p>
              </div>
            ))}
          </Card.Content>
        </Card>
      </div>

      <Card className="bg-brand-900 text-white border-none shadow-brand-900/20">
        <Card.Content className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold border border-white/20">
              {customer.firstName[0]}{customer.lastName[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{customer.firstName} {customer.lastName}</h3>
              <p className="text-brand-200 mt-1">Premium Customer • Verified Identity</p>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-white/10 text-white border-none">Tier 1 Benefits</Badge>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileOverview;
