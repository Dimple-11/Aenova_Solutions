
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showSubtitle = true,
  size = 'md',
  to = '/',
}) => {
  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-8 text-xl',
    lg: 'h-10 text-2xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const Content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer">

      {/* AEVONA Logo Image */}
      <img
        src={logo}
        alt="AEVONA Solution"
        className={`${iconSizes[size]} object-contain group-hover:scale-105 transition-transform duration-300`}
      />

      {/* Brand Name */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-widest text-[#2E1F17] dark:text-[#F8F4EB] uppercase ${sizeClasses[size]}`}
        >
          AEVONA
        </span>

        {/* Subtitle */}
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
