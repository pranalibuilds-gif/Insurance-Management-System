import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { ProductCard } from '../../../components/organisms/ProductCard';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { getProducts } from '../../../mocks/products';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../components/atoms/Button';
import { ProductCategory } from '../../../types/product';
import { cn } from '../../../utils/cn';

const categories: { label: string; value: ProductCategory | 'ALL' }[] = [
  { label: 'All Plans', value: 'ALL' },
  { label: 'Health', value: 'HEALTH' },
  { label: 'Vehicle', value: 'VEHICLE' },
  { label: 'Life', value: 'LIFE' },
  { label: 'Home', value: 'HOME' },
  { label: 'Travel', value: 'TRAVEL' },
];

const ProductList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const filteredProducts = products?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Insurance Plans"
        description="Explore our range of comprehensive insurance products tailored for your needs."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search by plan name..."
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex p-1 bg-neutral-100 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap',
                  selectedCategory === cat.value
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" isIconOnly className="shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton variant="cards" count={6} />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No products found"
          description="We couldn't find any insurance plans matching your search or filters."
          action={
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}>
              Clear All Filters
            </Button>
          }
        />
      )}
    </div>
  );
};

export default ProductList;
