import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { SearchBar } from '../../components/molecules/SearchBar';
import { DataTable, Column } from '../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getCustomerProfile } from '../../mocks/customers'; // Reusing for single, but list mocks often exist
import { Customer } from '../../types/customer';

// In a real app, this would be getAllCustomers
const mockCustomerList: Customer[] = [
  {
    id: 'CUST-88291',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-0000',
    dob: '1990-01-01',
    kycStatus: 'VERIFIED',
    status: 'ACTIVE',
    address: { addressLine1: '', city: 'New York', state: 'NY', postalCode: '', country: 'USA' },
    nominees: [],
    activities: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'CUST-88292',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    phone: '+1 (555) 111-2222',
    dob: '1985-05-15',
    kycStatus: 'PENDING',
    status: 'REGISTERED',
    address: { addressLine1: '', city: 'Los Angeles', state: 'CA', postalCode: '', country: 'USA' },
    nominees: [],
    activities: [],
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
  }
];

const CustomerListStaff: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Simulation: using mockCustomerList directly as getCustomers mock
  const { data: customers, isLoading } = useQuery({
    queryKey: ['staff-customers-list'],
    queryFn: async () => {
        await new Promise(r => setTimeout(r, 800));
        return mockCustomerList;
    },
  });

  const filteredCustomers = customers?.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<Customer>[] = [
    {
      header: 'Customer',
      accessor: (c) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600">
             {c.firstName[0]}{c.lastName[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900">{c.firstName} {c.lastName}</span>
            <span className="text-xs text-neutral-500">{c.id}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Email & Phone',
      accessor: (c) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-700">{c.email}</span>
          <span className="text-xs text-neutral-400">{c.phone}</span>
        </div>
      ),
    },
    {
      header: 'KYC Status',
      accessor: (c) => {
        const variants: Record<string, any> = { VERIFIED: 'success', PENDING: 'warning', REJECTED: 'danger', NOT_SUBMITTED: 'neutral' };
        return <Badge variant={variants[c.kycStatus]} size="sm">{c.kycStatus}</Badge>;
      },
    },
    {
      header: 'Created At',
      accessor: (c) => new Date(c.createdAt).toLocaleDateString(),
    },
    {
      header: '',
      accessor: (c) => (
        <Button variant="ghost" size="sm" isIconOnly onClick={(e) => { e.stopPropagation(); navigate(`/staff/customers/${c.id}`); }}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Customer Directory"
        description="Search and manage your global customer base."
        actions={
          <Button>
            <UserPlus className="h-4 w-4 mr-2" /> Register New Customer
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
              placeholder="Search by name, ID or email..."
            />
          </div>
          <Button variant="outline" size="sm" className="text-neutral-500">
            <Filter className="h-4 w-4 mr-2" /> More Filters
          </Button>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable<Customer>
            columns={columns}
            data={filteredCustomers}
            isLoading={isLoading}
            onRowClick={(c) => navigate(`/staff/customers/${c.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default CustomerListStaff;
