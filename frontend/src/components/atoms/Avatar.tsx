import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-neutral-100 items-center justify-center font-semibold text-neutral-600 border border-neutral-200',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
