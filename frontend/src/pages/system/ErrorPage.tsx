import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { RefreshCw, Home } from 'lucide-react';

export const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#170E09] text-[#2E1F17] dark:text-[#F8F4EB] flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <Logo size="lg" />
        <h1 className="text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          System Error Encountered
        </h1>
        <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80">
          An unexpected technical error occurred while processing your request. Our engineering team has been notified.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="gold" size="md" onClick={() => window.location.reload()} icon={<RefreshCw className="w-4 h-4" />}>
            Reload Page
          </Button>
          <Link to="/">
            <Button variant="outline" size="md" icon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
