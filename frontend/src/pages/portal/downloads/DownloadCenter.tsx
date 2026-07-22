import React from 'react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { Download, FileText, Receipt, Shield, Activity } from 'lucide-react';

interface DownloadItem {
  id: string;
  name: string;
  type: 'POLICY' | 'RECEIPT' | 'CLAIM' | 'TAX';
  date: string;
  size: string;
}

const mockDownloads: DownloadItem[] = [
  { id: '1', name: 'Health Secure Gold - Policy Document', type: 'POLICY', date: '2026-01-01', size: '2.4 MB' },
  { id: '2', name: 'Premium Receipt - March 2026', type: 'RECEIPT', date: '2026-03-14', size: '450 KB' },
  { id: '3', name: 'Claim Summary - CLM-0001', type: 'CLAIM', date: '2026-03-20', size: '1.1 MB' },
  { id: '4', name: 'Section 80C Tax Certificate 2025-26', type: 'TAX', date: '2026-04-01', size: '890 KB' },
];

const DownloadCenter: React.FC = () => {
  const columns: Column<DownloadItem>[] = [
    {
      header: 'File Name',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500">
             {item.type === 'POLICY' && <Shield className="h-5 w-5" />}
             {item.type === 'RECEIPT' && <Receipt className="h-5 w-5" />}
             {item.type === 'CLAIM' && <Activity className="h-5 w-5" />}
             {item.type === 'TAX' && <FileText className="h-5 w-5" />}
          </div>
          <span className="font-bold text-neutral-900">{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: (item) => <Badge variant="neutral">{item.type}</Badge>,
    },
    {
      header: 'Date',
      accessor: (item) => new Date(item.date).toLocaleDateString(),
    },
    {
      header: 'Size',
      accessor: (item) => <span className="text-xs text-neutral-400 font-medium">{item.size}</span>,
    },
    {
      header: '',
      accessor: () => (
        <Button variant="ghost" size="sm" isIconOnly>
          <Download className="h-4 w-4" />
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Download Center"
        description="Access and download all your generated policy documents, receipts, and reports."
      />

      <Card>
        <Card.Content className="p-0">
          <DataTable columns={columns} data={mockDownloads} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default DownloadCenter;
