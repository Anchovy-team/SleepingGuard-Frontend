'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

type Mode = 'login' | 'register';

function getModeFromLocation(): Mode | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const m = params.get('mode');
  return m === 'register' ? 'register' : m === 'login' ? 'login' : null;
}

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [mode, setMode] = useState<Mode>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Read mode from URL on client (no useSearchParams -> no Suspense build error on Netlify)
  useEffect(() => {
    const m = getModeFromLocation();
    if (m) setMode(m);
  }, []);

  const setModeAndUrl = (m: Mode) => {
    setMode(m);
    router.replace(`${pathname}?mode=${m}`);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const canSubmit = useMemo(() => {
    if (!email.includes('@')) return false;
    if (!password) return false;
    if (mode === 'register') {
      if (!fullName.trim()) return false;
      if (!companyName.trim()) return false;
    }
    return true;
  }, [email, password, fullName, companyName, mode]);

  const submit = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const payload =
        mode === 'login'
          ? { login: email, password }
          : { login: email, password, name: fullName, companyName };

      const resp =
        mode === 'login'
          ? await authApi.login(payload)
          : await authApi.register(payload);

      authApi.setAuth(resp);

      setSuccessMsg(mode === 'login' ? 'Authentication succeeded' : 'Account created');
      router.push('/dashboard');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-slate-400">
            {mode === 'login'
              ? 'Sign in to access your dashboard'
              : 'Register to access SleepingGuard'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="security@yourcompany.com"
              type="email"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && submit()}
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Full Name</label>
                <input
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-600"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Company Name</label>
                <input
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3 text-white outline-none focus:border-cyan-600"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company"
                  type="text"
                />
              </div>
            </>
          )}

          {errorMsg && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-200">
              {successMsg}
            </div>
          )}

          <button
            onClick={submit}
            disabled={!canSubmit || loading}
            className="mt-2 w-full rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>

          <div className="pt-2 text-center text-sm text-slate-400">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  className="text-cyan-400 hover:text-cyan-300"
                  onClick={() => setModeAndUrl('register')}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  className="text-cyan-400 hover:text-cyan-300"
                  onClick={() => setModeAndUrl('login')}
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="text-center text-sm">
            <a className="text-slate-500 hover:text-slate-300" href="/">
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
