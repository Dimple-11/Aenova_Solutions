import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ShieldCheck } from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'OAuth';
  const navigate = useNavigate();

  useEffect(() => {
    // Social sign-in requires a configured OAuth provider on the backend; not wired up yet.
    const timer = setTimeout(() => {
      navigate('/login?error=oauth_not_configured');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="py-12 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mx-auto animate-pulse">
        <ShieldCheck className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Authenticating with {provider.charAt(0).toUpperCase() + provider.slice(1)}...
        </h2>
        <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]/80 mt-2">
          Verifying your single sign-on security tokens. You will be redirected shortly.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
        <Loader2 className="w-4 h-4 animate-spin text-[#D4B483]" />
        Establishing secure session...
      </div>
    </div>
  );
};
