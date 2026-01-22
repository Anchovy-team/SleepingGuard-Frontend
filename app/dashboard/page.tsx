'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof authApi.getUser> | null>(null);

  useEffect(() => {
    if (!authApi.isAuthed()) {
      router.push('/auth');
      return;
    }
    setUser(authApi.getUser());
  }, [router]);

  const logout = () => {
    authApi.logout();
    router.push('/auth');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2 text-slate-200 hover:bg-slate-900"
          >
            Log out
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-xl font-semibold">Your profile</h2>
          <div className="mt-4 space-y-2 text-slate-200">
            <div>
              <span className="text-slate-400">User ID: </span>
              {user?.userId ?? '—'}
            </div>
            <div>
              <span className="text-slate-400">Login: </span>
              {user?.login ?? '—'}
            </div>
            <div>
              <span className="text-slate-400">Name: </span>
              {user?.name ?? '—'}
            </div>
            <div>
              <span className="text-slate-400">Company: </span>
              {user?.companyName ?? '—'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}