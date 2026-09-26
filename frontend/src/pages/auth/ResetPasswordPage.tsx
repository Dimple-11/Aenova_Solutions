import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'None', score: 0, color: 'bg-gray-300' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', score, color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { label: 'Moderate', score, color: 'bg-amber-500' };
    return { label: 'Strong', score, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Reset Password
        </h2>
        <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
          Create a new secure password for your Aevona enterprise account.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] text-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Password Updated!</h3>
            <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
              Your password has been successfully reset. You can now log in.
            </p>
          </div>
          <Button variant="gold" fullWidth onClick={() => navigate('/login')}>
            Sign In Now
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A6815B]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#241812] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#A6815B]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-[#6B4E3A] dark:text-[#D4B483]">Password Strength:</span>
                <span className="text-[#2E1F17] dark:text-[#F8F4EB]">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-[#EFE7D5] dark:bg-[#31231B] rounded-full overflow-hidden flex gap-1">
                <div className={`h-full transition-all duration-300 ${strength.score >= 1 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 2 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 3 ? strength.color : ''} flex-1`} />
                <div className={`h-full transition-all duration-300 ${strength.score >= 4 ? strength.color : ''} flex-1`} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A6815B]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#241812] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
              />
            </div>
          </div>

          <Button type="submit" variant="gold" fullWidth size="lg" disabled={loading}>
            {loading ? 'Updating Password...' : 'Reset Password'}
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link to="/login" className="text-xs text-[#6B4E3A] dark:text-[#D4B483] font-semibold hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};
