import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'gold' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className
}) => {
  const variants = {
    default: 'bg-[#EFE7D5] text-[#6B4E3A] dark:bg-[#31231B] dark:text-[#E2D3B7]',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/40',
    warning: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 dark:border dark:border-amber-800/40',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 dark:border dark:border-sky-800/40',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 dark:border dark:border-rose-800/40',
    gold: 'bg-[#D4B483]/20 text-[#8A6848] border border-[#D4B483]/40 dark:bg-[#D4B483]/15 dark:text-[#D4B483]',
    outline: 'border border-[#A6815B]/30 text-[#6B4E3A] dark:text-[#D4B483] dark:border-[#A6815B]/40',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px] font-semibold',
    md: 'px-3 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let variant: BadgeProps['variant'] = 'default';

  switch (status.toLowerCase()) {
    case 'completed':
    case 'active':
    case 'paid':
    case 'resolved':
      variant = 'success';
      break;
    case 'in progress':
    case 'under review':
    case 'review':
      variant = 'gold';
      break;
    case 'planning':
    case 'to do':
    case 'requested':
    case 'open':
    case 'pending':
      variant = 'info';
      break;
    case 'urgent':
    case 'overdue':
    case 'high':
    case 'archived':
    case 'closed':
      variant = 'danger';
      break;
    case 'medium':
      variant = 'warning';
      break;
    default:
      variant = 'default';
  }

  return <Badge variant={variant}>{status}</Badge>;
};
