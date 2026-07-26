import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShieldAlert, DownloadCloud, Filter, Search, Globe, Terminal, History } from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getAuditLogs } from '../../../mocks/admin';
import { AuditLogEntry } from '../../../types/admin';
import { cn } from '../../../utils/cn';

const AuditCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['staff-audit-logs'],
    queryFn: getAuditLogs,
  });

  const columns: Column<AuditLogEntry>[] = [
    {
      header: 'Timestamp',
      accessor: (l) => (
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900">{new Date(l.timestamp).toLocaleDateString()}</span>
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{new Date(l.timestamp).toLocaleTimeString()}</span>
        </div>
      ),
    },
    {
      header: 'Actor',
      accessor: (l) => <span className="font-medium text-brand-600">{l.actor}</span>,
    },
    {
      header: 'Event',
      accessor: (l) => (
        <div className="flex items-center gap-2">
           <Badge variant="neutral" size="sm" className="font-bold">{l.action}</Badge>
           <span className="text-sm font-medium text-neutral-600">{l.entityType}: {l.entityId}</span>
        </div>
      ),
    },
    {
      header: 'Details',
      accessor: (l) => <p className="text-xs text-neutral-500 max-w-xs truncate">{l.details.message}</p>,
    },
    {
      header: 'IP Address',
      accessor: (l) => <span className="font-mono text-[10px] text-neutral-400 flex items-center gap-1"><Globe className="h-3 w-3" /> {l.ipAddress}</span>,
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Audit Center"
        description="Immutable chronological record of every business and security event on the platform."
        actions={
          <Button variant="outline" size="sm">
            <DownloadCloud className="h-4 w-4 mr-2" /> Export Logs
          </Button>
        }
      />

      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex-1 max-w-md">
             <SearchBar value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery('')} />
           </div>
           <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Category</Button>
              <Button variant="outline" size="sm"><Terminal className="h-4 w-4 mr-2" /> Entity Type</Button>
           </div>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable columns={columns} data={logs || []} isLoading={isLoading} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default AuditCenter;
