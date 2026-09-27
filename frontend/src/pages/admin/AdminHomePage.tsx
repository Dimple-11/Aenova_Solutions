import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminTokenStorage, api } from '../../lib/api';

type AdminIdentity = { id: string; username: string; name: string; status: string };

export const AdminHomePage: React.FC = () => {
  const [admin, setAdmin] = useState<AdminIdentity | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = adminTokenStorage.getAccessToken();
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    api.auth.adminMe(token)
      .then(setAdmin)
      .catch(() => {
        adminTokenStorage.clear();
        navigate('/admin/login', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const signOut = () => {
    adminTokenStorage.clear();
    navigate('/admin/login', { replace: true });
  };

  if (loading) return <div className="min-h-screen grid place-items-center">Loading admin portal…</div>;
  if (!admin) return null;

  return (
    <main className="min-h-screen bg-[#F8F4EB] p-6 text-[#2E1F17] dark:bg-[#170E09] dark:text-[#F8F4EB]">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between border-b border-[#D4B483]/40 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A6848]">Aevona Solutions</p>
            <h1 className="mt-1 text-2xl font-serif font-bold">Admin portal</h1>
          </div>
          <button onClick={signOut} className="rounded-lg border border-[#D4B483]/50 px-4 py-2 text-sm font-semibold">Sign out</button>
        </header>
        <section className="mt-8 rounded-2xl border border-[#D4B483]/40 bg-white/70 p-6 dark:bg-[#241812]">
          <h2 className="text-lg font-bold">Signed in as {admin.name}</h2>
          <p className="mt-2 text-sm text-[#6B4E3A] dark:text-[#D4B483]/80">{admin.username}</p>
          <p className="mt-4 text-xs">Admin account status: {admin.status}</p>
        </section>
      </div>
    </main>
  );
};