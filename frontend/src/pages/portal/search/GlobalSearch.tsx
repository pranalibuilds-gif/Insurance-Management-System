import React, { useState } from 'react';
import { Search, Shield, FileText, CreditCard, ChevronRight } from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Input } from '../../../components/atoms/Input';
import { Badge } from '../../../components/atoms/Badge';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { useNavigate } from 'react-router-dom';

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const mockResults = [
    { id: 'pol_1', title: 'Health Secure Gold', type: 'POLICY', ref: 'IMP-HEA-2026-001', href: '/portal/policies/pol_1' },
    { id: 'clm_1', title: 'Hospitalization Claim', type: 'CLAIM', ref: 'CLM-2026-0001', href: '/portal/claims/clm_1' },
    { id: 'rect_1', title: 'Premium Receipt', type: 'BILLING', ref: 'REC-2026-001', href: '/portal/billing' },
  ];

  const filtered = query.length > 2
    ? mockResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.ref.toLowerCase().includes(query.toLowerCase()))
    : [];

  const icons = {
    POLICY: Shield,
    CLAIM: FileText,
    BILLING: CreditCard,
  };

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Global Search"
        description="Search across your policies, claims, and documents."
      />

      <div className="max-w-2xl mx-auto">
        <Input
          prefixIcon={<Search className="h-5 w-5" />}
          placeholder="Search by name, reference ID, or type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 text-lg rounded-2xl shadow-soft"
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {query.length > 2 ? (
          filtered.length > 0 ? (
            filtered.map(result => {
              const Icon = icons[result.type as keyof typeof icons];
              return (
                <Card
                  key={result.id}
                  className="hover:border-brand-300 cursor-pointer transition-all group"
                  onClick={() => navigate(result.href)}
                >
                  <Card.Content className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{result.title}</p>
                        <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">{result.ref}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="neutral" size="sm">{result.type}</Badge>
                      <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-500 transition-colors" />
                    </div>
                  </Card.Content>
                </Card>
              );
            })
          ) : (
            <EmptyState icon={Search} title="No results found" description="Try searching for a different keyword or reference number." />
          )
        ) : query.length > 0 ? (
          <p className="text-center text-sm text-neutral-400">Please enter at least 3 characters to search.</p>
        ) : (
          <div className="text-center py-12 space-y-2">
             <Search className="h-12 w-12 text-neutral-100 mx-auto" />
             <p className="text-neutral-400 text-sm">Start typing to see results...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
