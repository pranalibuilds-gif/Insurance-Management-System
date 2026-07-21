import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Plus,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  History,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { Modal } from '../../../components/organisms/Modal';
import { FileDropzone } from '../../../components/molecules/FileDropzone';
import { FormField } from '../../../components/molecules/FormField';
import { Input } from '../../../components/atoms/Input';
import { Select } from '../../../components/atoms/Select';
import { getDocuments } from '../../../mocks/documents';
import { DocumentMetadata, DocumentCategory } from '../../../types/document';
import { cn } from '../../../utils/cn';

const categories: { label: string; value: DocumentCategory }[] = [
  { label: 'Identity', value: 'IDENTITY' },
  { label: 'Address', value: 'ADDRESS' },
  { label: 'Policy', value: 'POLICY' },
  { label: 'Claim', value: 'CLAIM' },
  { label: 'Medical', value: 'MEDICAL' },
  { label: 'Vehicle', value: 'VEHICLE' },
  { label: 'Financial', value: 'FINANCIAL' },
  { label: 'Other', value: 'OTHER' },
];

const DocumentCenter: React.FC = () => {
  const [isUploadModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  const filteredDocuments = documents?.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<DocumentMetadata>[] = [
    {
      header: 'Document Name',
      accessor: (doc) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900">{doc.title}</span>
            <span className="text-xs text-neutral-500">{doc.versions[0].fileName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (doc) => (
        <Badge variant="neutral" size="sm" className="font-medium">
          {doc.category.charAt(0) + doc.category.slice(1).toLowerCase()}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: (doc) => {
        const variants = {
          VERIFIED: 'success',
          PENDING: 'warning',
          REJECTED: 'danger',
          UNDER_REVIEW: 'info',
        };
        return <Badge variant={variants[doc.status] as any}>{doc.status.replace('_', ' ')}</Badge>;
      },
    },
    {
      header: 'Uploaded',
      accessor: (doc) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
          <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">{doc.uploadedBy}</span>
        </div>
      ),
    },
    {
      header: '',
      accessor: () => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" isIconOnly title="Preview">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" isIconOnly title="Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  const stats = [
    { label: 'Total', value: documents?.length || 0, color: 'text-neutral-900' },
    { label: 'Verified', value: documents?.filter(d => d.status === 'VERIFIED').length || 0, color: 'text-success-600' },
    { label: 'Pending', value: documents?.filter(d => d.status === 'PENDING').length || 0, color: 'text-warning-600' },
    { label: 'Rejected', value: documents?.filter(d => d.status === 'REJECTED').length || 0, color: 'text-danger-600' },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Document Center"
        description="Access and manage all your identity proofs, policy documents, and claim evidence in one place."
        actions={
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Upload Document
          </Button>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <Card.Content className="p-6 text-center">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className={cn("text-3xl font-black", stat.color)}>{stat.value}</h4>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Repository */}
      <Card>
        <Card.Header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by document name..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-neutral-500">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable
            columns={columns}
            data={filteredDocuments}
            isLoading={isLoading}
          />
        </Card.Content>
      </Card>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Upload New Document"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button>Start Upload</Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Document Title" isRequired>
              <Input placeholder="e.g. Health ID Card" />
            </FormField>
            <FormField label="Category" isRequired>
              <Select options={categories} placeholder="Select category" />
            </FormField>
          </div>

          <FormField label="File Upload" isRequired helperText="Maximum file size 5MB. Supported formats: PDF, JPG, PNG">
            <FileDropzone onFileSelect={(file) => console.log('File selected:', file)} />
          </FormField>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentCenter;
