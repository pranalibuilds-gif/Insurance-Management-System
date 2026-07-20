import React from 'react';
import { Card } from '../../components/atoms/Card';
import {
  FilePlus,
  Search,
  CreditCard,
  UserCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { label: 'File a Claim', icon: FilePlus, color: 'text-rose-600', bg: 'bg-rose-50', href: '/portal/claims/new' },
  { label: 'Browse Products', icon: Search, color: 'text-brand-600', bg: 'bg-brand-50', href: '/portal/products' },
  { label: 'Make Payment', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50', href: '/portal/billing' },
  { label: 'Manage Profile', icon: UserCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/portal/profile' },
];

export const QuickActionsCard: React.FC = () => {
  return (
    <Card>
      <Card.Header>
        <h3 className="font-bold text-neutral-900">Quick Actions</h3>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-neutral-100 hover:border-brand-200 hover:shadow-sm transition-all group"
            >
              <div className={`h-12 w-12 rounded-xl ${action.bg} ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-neutral-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};
