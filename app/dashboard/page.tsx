'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut } from 'lucide-react';
import { authApi } from '@/lib/api';

interface UserData {
  login: string | null;
  name: string | null;
  companyName: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = authApi.getUser();
    if (!userData.login) {
      router.push('/auth');
    } else {
      setUser(userData as UserData);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    authApi.logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">SleepingGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-slate-400">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.companyName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome, {user?.name}!</h1>
          <p className="text-slate-400 mb-8">
            Company: <span className="text-cyan-400 font-semibold">{user?.companyName}</span>
          </p>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-2">Dashboard</h2>
              <p className="text-slate-400">
                Your secure dashboard is ready. More features coming soon.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
