import React from 'react';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface WelcomeCardProps {
  kycStatus: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ kycStatus }) => {
  const { user } = useAuth();

  return (
    <Card className="bg-brand-600 border-none">
      <Card.Content className="p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Good morning, {user?.name}!</h2>
            <p className="text-brand-100 max-w-md">
              Welcome back to your insurance workspace. Here's a quick look at your active coverage and pending actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[160px]">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="h-4 w-4 text-brand-200" />
                <span className="text-xs font-medium text-brand-100 uppercase tracking-wider">KYC Status</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <span className="text-sm font-bold truncate">{kycStatus}</span>
                <Badge variant={kycStatus === 'VERIFIED' ? 'success' : 'warning'} size="sm" className="bg-white/20 border-none text-white">
                  {kycStatus === 'VERIFIED' ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[160px]">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-brand-200" />
                <span className="text-xs font-medium text-brand-100 uppercase tracking-wider">Security</span>
              </div>
              <div className="mt-2">
                <span className="text-sm font-bold">Account Protected</span>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
