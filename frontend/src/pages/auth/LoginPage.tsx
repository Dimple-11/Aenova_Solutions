import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(
    searchParams.get('error') === 'oauth_not_configured'
      ? 'Social sign-in is not configured yet. Please sign in with your email and password.'
      : ''
  );

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(identifier, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    navigate(`/auth/callback?provider=${provider.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Welcome back
        </h2>
        <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
          Access your Aevona enterprise dashboard & services.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1.5">
            Work Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A6815B]" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#241812] border border-[#D4B483]/50 dark:border-[#463226] rounded-xl text-sm text-[#2E1F17] dark:text-[#F8F4EB] focus:outline-none focus:ring-2 focus:ring-[#D4B483]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
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
              className="absolute right-3 top-3 text-[#A6815B] hover:text-[#2E1F17] dark:hover:text-[#F8F4EB]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#6B4E3A] dark:accent-[#D4B483] rounded border-[#D4B483]"
            />
            <span className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/90 font-medium">Remember this browser</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="gold"
          fullWidth
          size="lg"
          disabled={loading}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-[#D4B483]/30 dark:border-[#463226] w-full" />
        <span className="absolute bg-[#F8F4EB] dark:bg-[#170E09] px-3 text-xs text-[#8A6848] dark:text-[#D4B483]/60 uppercase tracking-wider font-semibold">
          Or continue with
        </span>
      </div>

     {/* OAuth Social Buttons */}
     <div className="grid grid-cols-2 gap-3">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            setError('Google did not return a sign-in credential.');
            return;
          }
          setLoading(true);
          setError('');
          void googleLogin(credentialResponse.credential)
            .then(() => navigate('/dashboard'))
            .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Google sign-in failed.'))
            .finally(() => setLoading(false));
        }}
        onError={() => setError('Google sign-in failed. Please try again.')}
      />

  {/* Microsoft button yahan rahega */}

        <button
          type="button"
          onClick={() => handleOAuthLogin('Microsoft')}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/40 dark:border-[#463226] text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] hover:bg-[#EFE7D5]/50 dark:hover:bg-[#31231B] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z"/>
            <path fill="#81bc06" d="M12 1h10v10H12z"/>
            <path fill="#05a6f0" d="M1 12h10v10H1z"/>
            <path fill="#ffba08" d="M12 12h10v10H12z"/>
          </svg>
          Microsoft
        </button>
      </div>

      {/* Footer Link */}
      <p className="text-center text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 pt-2">
        Don't have an enterprise account?{' '}
        <Link to="/signup" className="font-bold text-[#6B4E3A] dark:text-[#D4B483] hover:underline">
          Create Account
        </Link>
      </p>
      <p className="text-center text-xs text-[#6B4E3A] dark:text-[#D4B483]/80">
        Aevona staff? <Link to="/admin/login" className="font-bold underline">Admin sign-in</Link>
      </p>
    </div>
  );
};
