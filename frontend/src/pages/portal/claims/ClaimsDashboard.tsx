import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Activity,
  ArrowRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getClaims } from '../../../mocks/claims';
import { Claim } from '../../../types/claim';
import { cn } from '../../../utils/cn';

const ClaimsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: claims, isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: getClaims,
  });

  const filteredClaims = claims?.filter(c =>
    c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const stats = [
    { label: 'Active Claims', value: claims?.filter(c => !['PAID', 'REJECTED', 'CLOSED'].includes(c.status)).length || 0, icon: Activity, color: 'text-brand-600' },
    { label: 'Awaiting Documents', value: claims?.filter(c => c.status === 'AWAITING_CUSTOMER').length || 0, icon: FileText, color: 'text-warning-600' },
    { label: 'Under Review', value: claims?.filter(c => c.status === 'UNDER_REVIEW').length || 0, icon: Clock, color: 'text-info-600' },
    { label: 'Settled', value: claims?.filter(c => c.status === 'PAID').length || 0, icon: CheckCircle2, color: 'text-success-600' },
  ];

  const columns: Column<Claim>[] = [
    {
      header: 'Claim Number',
      accessor: (c) => (
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900">{c.claimNumber}</span>
          <span className="text-xs text-neutral-500">{c.type}</span>
        </div>
      ),
    },
    {
      header: 'Incident Details',
      accessor: (c) => (
        <div className="max-w-xs truncate">
          <p className="text-sm font-medium">{c.description}</p>
          <p className="text-xs text-neutral-400">{new Date(c.incidentDate).toLocaleDateString()}</p>
        </div>
      ),
    },
    {
      header: 'Policy',
      accessor: 'policyNumber',
    },
    {
      header: 'Status',
      accessor: (c) => {
        const variants: Record<string, any> = {
          PAID: 'success',
          AWAITING_CUSTOMER: 'warning',
          UNDER_REVIEW: 'info',
          REJECTED: 'danger',
          SUBMITTED: 'neutral'
        };
        return <Badge variant={variants[c.status]}>{c.status.replace('_', ' ')}</Badge>;
      },
    },
    {
      header: '',
      accessor: (c) => (
        <Button variant="ghost" size="sm" isIconOnly onClick={() => navigate(`/portal/claims/${c.id}`)}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Claims Management"
        description="Track the status of your claims, submit evidence, and manage settlements."
        actions={
          <Button onClick={() => navigate('/portal/claims/new')}>
            <Plus className="h-4 w-4 mr-2" /> File New Claim
          </Button>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <Card.Content className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg bg-neutral-50", stat.color.replace('text-', 'text-'))}>
                   <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className={cn("text-3xl font-black mt-1", stat.color)}>{stat.value}</h4>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main List */}
      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search claims..."
            />
          </div>
          <Button variant="outline" size="sm" className="text-neutral-500">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable
            columns={columns}
            data={filteredClaims}
            isLoading={isLoading}
            onRowClick={(c) => navigate(`/portal/claims/${c.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default ClaimsDashboard;
