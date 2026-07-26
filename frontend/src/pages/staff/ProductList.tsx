import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  ClipboardList,
  ArrowRight,
  Copy,
  Archive,
  MoreVertical
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { SearchBar } from '../../components/molecules/SearchBar';
import { DataTable, Column } from '../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getProducts } from '../../mocks/products';
import { InsuranceProduct } from '../../types/product';
import { cn } from '../../utils/cn';

const ProductListStaff: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['staff-products-catalog'],
    queryFn: getProducts,
  });

  const filteredProducts = products?.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const columns: Column<InsuranceProduct>[] = [
    {
      header: 'Product Name',
      accessor: (p) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900">{p.name}</span>
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">v{p.version}.0</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Status',
      accessor: (p) => {
        const variants: Record<string, any> = {
          ACTIVE: 'success',
          DRAFT: 'brand',
          UNDER_REVIEW: 'warning',
          DEPRECATED: 'neutral',
          ARCHIVED: 'danger'
        };
        return <Badge variant={variants[p.status]}>{p.status.replace('_', ' ')}</Badge>;
      },
    },
    {
      header: 'Coverage Range',
      accessor: (p) => (
        <div className="text-sm font-medium">
          ${(p.minCoverage / 1000).toFixed(0)}k - ${(p.maxCoverage / 1000000).toFixed(1)}M
        </div>
      ),
    },
    {
      header: 'Last Updated',
      accessor: (p) => new Date(p.updatedAt).toLocaleDateString(),
    },
    {
      header: '',
      accessor: (p) => (
        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
           <Button variant="ghost" size="sm" isIconOnly title="Clone Product">
             <Copy className="h-4 w-4" />
           </Button>
           <Button variant="ghost" size="sm" isIconOnly onClick={() => navigate(`/staff/products/${p.id}`)}>
             <ArrowRight className="h-4 w-4" />
           </Button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Insurance Product Catalog"
        description="Design, version, and manage insurance offerings available to customers."
        actions={
          <Button onClick={() => navigate('/staff/products/new')}>
            <Plus className="h-4 w-4 mr-2" /> Create New Product
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
              placeholder="Search products by name or category..."
            />
          </div>
          <Button variant="outline" size="sm" className="text-neutral-500">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </Card.Header>
        <Card.Content className="p-0">
          <DataTable<InsuranceProduct>
            columns={columns}
            data={filteredProducts}
            isLoading={isLoading}
            onRowClick={(p) => navigate(`/staff/products/${p.id}`)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProductListStaff;
