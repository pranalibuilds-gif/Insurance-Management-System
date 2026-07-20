import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { Modal } from '../../../components/organisms/Modal';
import { FormField } from '../../../components/molecules/FormField';
import { Input } from '../../../components/atoms/Input';
import { getCustomerProfile } from '../../../mocks/customers';
import { Nominee } from '../../../types/customer';
import { Plus, Trash2, UserPlus, Users } from 'lucide-react';
import { cn } from '../../../utils/cn';

const NomineeManagement: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  const totalAllocation = customer?.nominees.reduce((acc, n) => acc + n.sharePercentage, 0) || 0;
  const isFullyAllocated = totalAllocation === 100;

  const columns: Column<Nominee>[] = [
    {
      header: 'Full Name',
      accessor: (n) => (
        <div className="flex flex-col">
          <span className="font-bold">{n.fullName}</span>
          <span className="text-xs text-neutral-500">{n.relationship}</span>
        </div>
      ),
    },
    {
      header: 'Age',
      accessor: (n) => {
        const age = new Date().getFullYear() - new Date(n.dob).getFullYear();
        return (
          <div className="flex items-center gap-2">
            <span>{age} years</span>
            {age < 18 && <Badge variant="warning" size="sm">Minor</Badge>}
          </div>
        );
      }
    },
    {
      header: 'Share',
      accessor: (n) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500"
              style={{ width: `${n.sharePercentage}%` }}
            />
          </div>
          <span className="font-mono font-bold">{n.sharePercentage}%</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (n) => <Badge variant={n.status === 'ACTIVE' ? 'success' : 'neutral'}>{n.status}</Badge>,
    },
    {
      header: '',
      accessor: () => (
        <Button variant="ghost" size="sm" isIconOnly className="text-neutral-400 hover:text-danger-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    }
  ];

  if (isLoading) return <LoadingSkeleton variant="table" />;

  return (
    <div className="space-y-6 animate-entrance">
      {/* Allocation Progress */}
      <Card>
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="font-bold text-neutral-900">Total Nominee Allocation</h4>
              <p className="text-sm text-neutral-500">Your total share allocation must equal exactly 100%.</p>
            </div>
            <div className="text-right">
              <span className={cn(
                "text-3xl font-black",
                isFullyAllocated ? "text-success-600" : "text-amber-500"
              )}>
                {totalAllocation}%
              </span>
            </div>
          </div>
          <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden flex">
            {customer?.nominees.map((n, i) => (
              <div
                key={n.id}
                className={cn(
                  "h-full transition-all duration-slow border-r border-white/20 last:border-none",
                  i % 2 === 0 ? "bg-brand-500" : "bg-brand-400"
                )}
                style={{ width: `${n.sharePercentage}%` }}
                title={`${n.fullName}: ${n.sharePercentage}%`}
              />
            ))}
          </div>
          {!isFullyAllocated && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-3 text-amber-800 text-sm">
              <Users className="h-5 w-5 shrink-0" />
              <span>You have {100 - totalAllocation}% unallocated. Policy issuance requires 100% allocation.</span>
            </div>
          )}
        </Card.Content>
      </Card>

      <div className="flex justify-between items-center">
        <h4 className="font-bold text-neutral-900 text-lg px-2">Managed Nominees</h4>
        <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Nominee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={customer?.nominees || []}
        emptyTitle="No Nominees Added"
        emptyDescription="Please add at least one nominee for your insurance policies."
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Nominee"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button>Add Nominee</Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Full Name" isRequired>
            <Input placeholder="Enter legal name" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Relationship" isRequired>
              <Input placeholder="e.g. Spouse" />
            </FormField>
            <FormField label="Date of Birth" isRequired>
              <Input type="date" />
            </FormField>
          </div>
          <FormField label="Share Percentage (%)" isRequired helperText="Must be between 1 and 100">
            <Input type="number" min={1} max={100} />
          </FormField>
          <FormField label="Contact Number">
            <Input placeholder="+1 (555) 000-0000" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
};

export default NomineeManagement;
