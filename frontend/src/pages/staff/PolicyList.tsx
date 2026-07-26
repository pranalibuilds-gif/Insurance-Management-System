import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Search,
  Shield,
  ArrowRight,
  DownloadCloud,
  LayoutGrid
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { SearchBar } from '../../components/molecules/SearchBar';
import { DataTable, Column } from '../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getAllPolicies } from '../../mocks/policies';
import { Policy } from '../../types/policy';

const PolicyListStaff: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: policies, isLoading } = useQuery({
    queryKey: ['staff-all-policies'],
    queryFn: getAllPolicies,
  });

  const filteredPolicies = policies?.filter(p =>
    p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<Policy>[] = [
    {
      header: 'Policy Number',
      accessor: (p) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-500">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-bold text-neutral-900">{p.policyNumber}</span>
        </div>
      ),
    },
    {
      header: 'Customer',
      accessor: 'customerName',
    },
    {
      header: 'Product',
      accessor: 'productName',
    },
    {
      header: 'Status',
      accessor: (p) => {
        const variants: Record<string, any> = {
          ACTIVE: 'success',
          LAPSED: 'warning',
          CANCELLED: 'danger',
          EXPIRED: 'neutral',
        };
        return <Badge variant={variants[p.status]}>{p.status}</Badge>;
      },
    },
    {
      header: 'Premium Status',
      accessor: (p) => {
        const variants: Record<string, any> = {
          PAID: 'success',
          DUE: 'warning',
          OVERDUE: 'danger',
        };
        return <Badge variant={variants[p.premiumStatus]} size="sm">{p.premiumStatus}</Badge>;
      }
    },
    {
      header: '',
      accessor: (p) => (
        <Button variant="ghost" size="sm" isIconOnly onClick={(e) => { e.stopPropagation(); navigate(`/staff/policies/${p.id}`); }}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Global Policies"
        description="View and manage all insurance contracts issued by the platform."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <DownloadCloud className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>
        }
      />

      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by policy # or customer..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-neutral-500">
              <Filter className="h-4 w-4 mr-2" /> All Filters
            </Button>
            <Button variant="outline" size="sm" isIconOnly className="text-neutral-500">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable<Policy>
            columns={columns}
            data={filteredPolicies}
            isLoading={isLoading}
            onRowClick={(p) => navigate(`/staff/policies/${p.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default PolicyListStaff;
