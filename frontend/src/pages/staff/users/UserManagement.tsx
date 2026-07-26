import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserCog, Plus, Search, Filter, ShieldCheck, ShieldAlert, Key, Trash2, MoreVertical } from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getUsers } from '../../../mocks/admin';
import { UserAccount } from '../../../types/admin';

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: users, isLoading } = useQuery({
    queryKey: ['staff-users'],
    queryFn: getUsers,
  });

  const filteredUsers = users?.filter(u =>
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<UserAccount>[] = [
    {
      header: 'User & Identity',
      accessor: (u) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600">
             {u.fullName[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900">{u.fullName}</span>
            <span className="text-xs text-neutral-500">{u.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: (u) => <Badge variant="neutral" size="sm">{u.role}</Badge>,
    },
    {
      header: 'Status',
      accessor: (u) => {
        const variants: Record<string, any> = { ACTIVE: 'success', LOCKED: 'danger', DISABLED: 'neutral' };
        return <Badge variant={variants[u.status]}>{u.status}</Badge>;
      },
    },
    {
      header: 'Last Login',
      accessor: (u) => <span className="text-xs text-neutral-500">{new Date(u.lastLogin).toLocaleString()}</span>,
    },
    {
      header: '',
      accessor: () => (
        <div className="flex justify-end gap-2">
           <Button variant="ghost" size="sm" isIconOnly title="Reset Password"><Key className="h-4 w-4" /></Button>
           <Button variant="ghost" size="sm" isIconOnly title="Edit Permissions"><ShieldCheck className="h-4 w-4" /></Button>
           <Button variant="ghost" size="sm" isIconOnly className="text-danger-600"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Users & Access Management"
        description="Manage employee accounts, roles, and platform permissions."
        actions={
          <Button onClick={() => {}}>
            <Plus className="h-4 w-4 mr-2" /> Invite New User
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card><Card.Content className="p-6 text-center space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Accounts</p>
            <h4 className="text-3xl font-black text-success-600">{users?.filter(u => u.status === 'ACTIVE').length || 0}</h4>
         </Card.Content></Card>
         <Card><Card.Content className="p-6 text-center space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Locked Accounts</p>
            <h4 className="text-3xl font-black text-danger-600">{users?.filter(u => u.status === 'LOCKED').length || 0}</h4>
         </Card.Content></Card>
         <Card><Card.Content className="p-6 text-center space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Employees</p>
            <h4 className="text-3xl font-black text-neutral-900">{users?.length || 0}</h4>
         </Card.Content></Card>
      </div>

      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery('')} />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Role Filter</Button>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable columns={columns} data={filteredUsers} isLoading={isLoading} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default UserManagement;
