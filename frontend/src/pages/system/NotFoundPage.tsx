import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#170E09] text-[#2E1F17] dark:text-[#F8F4EB] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <Logo size="lg" />

        <div className="w-20 h-20 rounded-full bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-6xl font-serif font-bold text-[#A6815B] dark:text-[#D4B483]">404</span>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] mt-2">
            Looks like this page took a wrong turn.
          </h1>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-2">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="gold" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="md">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
