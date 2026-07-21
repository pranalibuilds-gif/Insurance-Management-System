import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Clock, Star } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { InsuranceProduct } from '../../types/product';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: InsuranceProduct;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const statusVariants = {
    AVAILABLE: 'neutral',
    NEW: 'info',
    RECOMMENDED: 'brand',
    INACTIVE: 'neutral',
  } as const;

  return (
    <Card
      className={cn(
        'flex flex-col h-full hover:border-brand-200 transition-all duration-normal group',
        product.isRecommended && 'ring-2 ring-brand-500 ring-offset-2',
        className
      )}
    >
      <Card.Content className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-brand-50 rounded-2xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-normal">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={statusVariants[product.status]}>{product.status}</Badge>
            {product.isRecommended && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-brand-600 uppercase tracking-widest">
                <Star className="h-3 w-3 fill-current" /> Expert Choice
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-neutral-50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Coverage up to</p>
            <p className="text-sm font-bold text-neutral-900">
              ${(product.maxCoverage / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Starting from</p>
            <p className="text-sm font-bold text-brand-600">
              ${product.basePremium}/mo
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-3">
          <Link to={`/portal/products/${product.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/portal/products/${product.id}/purchase`} className="w-full">
            <Button className="w-full">
              Buy Now <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card.Content>

      <div className="px-6 py-3 bg-neutral-50/50 border-t border-neutral-50 flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <Clock className="h-3 w-3" />
        <span>Waiting Period: {product.waitingPeriodDays > 0 ? `${product.waitingPeriodDays} days` : 'None'}</span>
      </div>
    </Card>
  );
};
