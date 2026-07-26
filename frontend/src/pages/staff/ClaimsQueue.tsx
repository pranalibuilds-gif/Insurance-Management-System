import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Search,
  Clock,
  ArrowRight,
  AlertCircle,
  Activity
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { SearchBar } from '../../components/molecules/SearchBar';
import { DataTable, Column } from '../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getClaims } from '../../mocks/claims';
import { Claim } from '../../types/claim';
import { cn } from '../../utils/cn';

const ClaimsQueue: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: claims, isLoading } = useQuery({
    queryKey: ['staff-claims-queue'],
    queryFn: getClaims,
  });

  const filteredClaims = claims?.filter(c =>
    c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<Claim>[] = [
    {
      header: 'Priority',
      accessor: (c) => {
        const variants: Record<string, any> = {
          URGENT: 'danger',
          HIGH: 'warning',
          MEDIUM: 'brand',
          LOW: 'neutral'
        };
        return <Badge variant={variants[c.priority]} size="sm">{c.priority}</Badge>;
      },
    },
    {
      header: 'Claim & Customer',
      accessor: (c) => (
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900">{c.claimNumber}</span>
          <span className="text-xs text-neutral-500">{c.customerName}</span>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: 'type',
    },
    {
      header: 'Status',
      accessor: (c) => {
        const variants: Record<string, any> = {
          PAID: 'success',
          AWAITING_CUSTOMER: 'warning',
          UNDER_INVESTIGATION: 'info',
          REJECTED: 'danger',
          SUBMITTED: 'neutral',
          AWAITING_MANAGER: 'brand'
        };
        return <Badge variant={variants[c.status]}>{c.status.replace('_', ' ')}</Badge>;
      },
    },
    {
      header: 'SLA Status',
      accessor: (c) => {
        const isOverdue = new Date(c.slaDeadline) < new Date();
        return (
          <div className="flex items-center gap-2">
            {isOverdue ? (
              <Badge variant="danger" size="sm" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Overdue
              </Badge>
            ) : (
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {new Date(c.slaDeadline).toLocaleDateString()}
              </span>
            )}
          </div>
        );
      }
    },
    {
      header: '',
      accessor: (c) => (
        <Button variant="ghost" size="sm" isIconOnly onClick={(e) => { e.stopPropagation(); navigate(`/staff/claims/${c.id}`); }}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Claims Queue"
        description="Monitor and process insurance claims across all departments."
      />

      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by claim # or customer name..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-neutral-500">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="text-neutral-500">
               Assign Selected
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable<Claim>
            columns={columns}
            data={filteredClaims}
            isLoading={isLoading}
            onRowClick={(c) => navigate(`/staff/claims/${c.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default ClaimsQueue;
