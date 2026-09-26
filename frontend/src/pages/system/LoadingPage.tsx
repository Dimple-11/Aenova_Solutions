import React from 'react';
import { Logo } from '../../components/ui/Logo';
import { Loader2 } from 'lucide-react';

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#170E09] text-[#2E1F17] dark:text-[#F8F4EB] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-sm mx-auto animate-fade-in">
        <Logo size="lg" />
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
          <Loader2 className="w-5 h-5 animate-spin text-[#D4B483]" />
          Loading AEVONA Platform...
        </div>
      </div>
    </div>
  );
};
