import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, RefreshCw, ArrowRight, Edit3 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const VerifyEmailPage: React.FC = () => {
  const { currentUser, verifyEmail } = useAuth();
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResent(true);
    }, 1000);
  };

  const handleContinue = async () => {
    await verifyEmail();
    navigate('/onboarding');
  };

  return (
    <div className="space-y-6 text-center">
      {/* Email Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center mx-auto shadow-md">
        <Mail className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Verify your Email Address
        </h2>
        <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]/80 mt-2 max-w-sm mx-auto">
          We sent a verification link to{' '}
          <span className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            {currentUser?.email || 'alex@company.com'}
          </span>
          . Please check your inbox and click the link to activate your account.
        </p>
      </div>

      {resent && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" /> A new verification link was sent to your email!
        </div>
      )}

      {/* Primary Action to simulated onboarding */}
      <div className="space-y-3 pt-2">
        <Button
          variant="gold"
          fullWidth
          size="lg"
          onClick={handleContinue}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Verify & Continue to Onboarding
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold pt-2">
          <button
            onClick={handleResend}
            disabled={loading}
            className="flex items-center gap-1.5 text-[#6B4E3A] dark:text-[#D4B483] hover:underline"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Resend Email
          </button>

          <span className="text-[#D4B483]/40">•</span>

          <Link to="/signup" className="flex items-center gap-1.5 text-[#6B4E3A] dark:text-[#D4B483] hover:underline">
            <Edit3 className="w-3.5 h-3.5" /> Change Email
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-[#D4B483]/30 dark:border-[#463226]">
        <Link to="/login" className="text-xs text-[#6B4E3A]/70 dark:text-[#D4B483]/70 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};
