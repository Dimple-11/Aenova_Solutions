import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showSubtitle = true,
  size = 'md',
  to = '/'
}) => {
  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-8 text-xl',
    lg: 'h-10 text-2xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const Content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer">
      {/* Brand Icon SVG Emblem */}
      <div className={`${iconSizes[size]} rounded-lg bg-gradient-to-br from-[#D4B483] via-[#A6815B] to-[#6B4E3A] flex items-center justify-center text-white font-serif font-bold shadow-md shadow-[#D4B483]/20 group-hover:shadow-gold-glow transition-all duration-300 transform group-hover:scale-105`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 19h20L12 2z" />
          <path d="M12 8l-4 7h8l-4-7z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif font-bold tracking-widest text-[#2E1F17] dark:text-[#F8F4EB] uppercase ${sizeClasses[size]}`}>
          AEVONA
        </span>
        {showSubtitle && (
          <span className="text-[9px] tracking-[0.25em] font-sans font-semibold text-[#A6815B] dark:text-[#D4B483] uppercase -mt-1">
            SOLUTION
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{Content}</Link>;
  }

  return Content;
};
