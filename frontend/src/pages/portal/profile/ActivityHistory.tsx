import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../../components/atoms/Card';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getCustomerProfile } from '../../../mocks/customers';
import { Clock } from 'lucide-react';

const ActivityHistory: React.FC = () => {
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={5} />;

  return (
    <Card className="animate-entrance">
      <Card.Header>
        <h4 className="font-bold text-neutral-900 text-lg">Activity Timeline</h4>
      </Card.Header>
      <Card.Content className="p-8">
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-neutral-100">
          {customer?.activities.map((activity) => (
            <div key={activity.id} className="relative flex items-start gap-8 group">
              <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-neutral-100 shadow-sm group-hover:border-brand-100 transition-colors z-10">
                <Clock className="h-4 w-4 text-neutral-400 group-hover:text-brand-500 transition-colors" />
              </div>
              <div className="ml-12 pt-1.5">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <span className="font-bold text-neutral-900">{activity.type}</span>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                    {new Date(activity.timestamp).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-neutral-500">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ActivityHistory;
