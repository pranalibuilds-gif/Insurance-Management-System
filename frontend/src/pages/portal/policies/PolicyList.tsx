import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { Badge } from '../../../components/atoms/Badge';
import { Button } from '../../../components/atoms/Button';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { Card } from '../../../components/atoms/Card';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getCustomerPolicies } from '../../../mocks/policies';
import { Policy } from '../../../types/policy';
import { Shield, ArrowRight, Filter, Search } from 'lucide-react';
import { cn } from '../../../utils/cn';

const PolicyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: policies, isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: () => getCustomerPolicies('cust_1'),
  });

  const filteredPolicies = policies?.filter((p: Policy) =>
    p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<Policy>[] = [
    {
      header: 'Policy Details',
      accessor: (p) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900">{p.policyNumber}</span>
            <span className="text-xs text-neutral-500">{p.productName} • {p.category}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Coverage',
      accessor: (p) => <span className="font-semibold">${p.coverageAmount.toLocaleString()}</span>,
    },
    {
      header: 'Status',
      accessor: (p) => {
        const variants: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'brand'> = {
          ACTIVE: 'success',
          LAPSED: 'warning',
          CANCELLED: 'danger',
          EXPIRED: 'neutral',
          DRAFT: 'brand',
        };
        return <Badge variant={variants[p.status]}>{p.status}</Badge>;
      },
    },
    {
      header: 'Premium',
      accessor: (p) => {
        const variants: Record<string, 'success' | 'warning' | 'danger'> = {
          PAID: 'success',
          DUE: 'warning',
          OVERDUE: 'danger',
        };
        return (
          <div className="flex flex-col">
            <Badge variant={variants[p.premiumStatus]} size="sm" className="w-fit">{p.premiumStatus}</Badge>
            {p.nextPremiumDate && (
              <span className="text-[10px] text-neutral-400 mt-1 uppercase font-bold tracking-wider">Next: {new Date(p.nextPremiumDate).toLocaleDateString()}</span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Term',
      accessor: (p) => (
        <div className="text-xs text-neutral-500">
          {new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: '',
      accessor: (p) => (
        <Button variant="ghost" size="sm" isIconOnly onClick={() => navigate(`/portal/policies/${p.id}`)}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="My Policies"
        description="Manage your active insurance contracts and track upcoming renewals."
        actions={
          <Button onClick={() => navigate('/portal/products')}>
            Purchase New Policy
          </Button>
        }
      />

      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by policy # or plan name..."
            />
          </div>
          <Button variant="outline" size="sm" className="text-neutral-500">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable
            columns={columns}
            data={filteredPolicies}
            isLoading={isLoading}
            onRowClick={(p) => navigate(`/portal/policies/${p.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default PolicyList;
