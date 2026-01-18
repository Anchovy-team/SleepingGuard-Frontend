'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isLogin
        ? await authApi.login({ email, password })
        : await authApi.register({ email, password });

      authApi.setAuth(response.token, response.email);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">SleepingGuard</span>
        </div>
        <p className="text-slate-400">
          {isLogin ? 'Welcome back' : 'Secure your infrastructure'}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="security@company.com"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-900/50 hover:shadow-cyan-800/50 disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Toggle Auth Mode */}
      <div className="text-center">
        <p className="text-slate-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <a
          href="/"
          className="text-slate-400 hover:text-slate-300 text-sm transition-colors"
        >
          ← Back to home
        </a>
      </div>
    </div>
  );
}
