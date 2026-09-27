import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminTokenStorage, api } from '../../lib/api';

export const AdminLoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleGoogleSuccess = async (credential?: string) => {
    if (!credential) {
      setError('Google did not return a sign-in credential.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      logout();
      const tokens = await api.auth.adminGoogleLogin(credential);
      adminTokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4B483]/20 text-[#6B4E3A]">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-serif font-bold">Admin sign-in</h2>
        <p className="mt-2 text-sm text-[#6B4E3A] dark:text-[#D4B483]/80">
          Use an approved Google account to access the admin portal.
        </p>
      </div>
      {error && <div role="alert" className="rounded-xl border border-rose-300 bg-rose-100 p-3 text-sm text-rose-800">{error}</div>}
      <div className="flex justify-center" aria-busy={loading}>
        <GoogleLogin
          onSuccess={(response) => void handleGoogleSuccess(response.credential)}
          onError={() => setError('Google sign-in failed. Please try again.')}
        />
      </div>
      {loading && <p className="text-center text-xs">Signing in…</p>}
      <p className="text-center text-sm"><Link className="underline" to="/login">Return to client sign-in</Link></p>
    </div>
  );
};