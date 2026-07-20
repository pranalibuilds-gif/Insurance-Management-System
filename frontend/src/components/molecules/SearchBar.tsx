import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  onClear,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value || '');
    }
  };

  return (
    <div className={className}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        prefixIcon={<Search className="h-4 w-4" />}
        suffixIcon={
          value ? (
            <button
              onClick={onClear}
              className="rounded-full p-1 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          ) : undefined
        }
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
