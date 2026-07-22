import React from 'react';
import { Card } from '../../components/atoms/Card';
import { History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomerActivity } from '../../types/customer';

interface ActivityFeedProps {
  activities: CustomerActivity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between">
        <h3 className="font-bold text-neutral-900">Recent Activity</h3>
        <Link to="/portal/profile/activity" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </Card.Header>
      <Card.Content className="p-0">
        <div className="divide-y divide-neutral-50">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="p-4 flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0">
                <History className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">{activity.type}</p>
                <p className="text-xs text-neutral-500 line-clamp-1">{activity.description}</p>
                <p className="text-[10px] text-neutral-400 mt-1 uppercase font-bold tracking-wider">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="p-8 text-center text-neutral-400 italic">No recent activity.</div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};
