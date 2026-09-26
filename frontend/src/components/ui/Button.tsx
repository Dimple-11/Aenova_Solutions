import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#6B4E3A] hover:bg-[#473224] text-white shadow-md shadow-[#6B4E3A]/20 focus:ring-[#6B4E3A] dark:bg-[#D4B483] dark:text-[#1A110B] dark:hover:bg-[#E2D3B7]',
    secondary: 'bg-[#EFE7D5] hover:bg-[#E2D3B7] text-[#2E1F17] focus:ring-[#D4B483] dark:bg-[#31231B] dark:hover:bg-[#423025] dark:text-[#F8F4EB]',
    outline: 'border border-[#D4B483] text-[#6B4E3A] hover:bg-[#D4B483]/10 focus:ring-[#D4B483] dark:border-[#A6815B] dark:text-[#D4B483] dark:hover:bg-[#A6815B]/15',
    ghost: 'text-[#6B4E3A] hover:bg-[#EFE7D5]/60 focus:ring-[#D4B483] dark:text-[#F8F4EB] dark:hover:bg-[#31231B]',
    gold: 'bg-gradient-to-r from-[#D4B483] via-[#A6815B] to-[#8A6848] text-white hover:opacity-95 shadow-md shadow-[#D4B483]/25 focus:ring-[#D4B483]',
    danger: 'bg-red-700 hover:bg-red-800 text-white focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
