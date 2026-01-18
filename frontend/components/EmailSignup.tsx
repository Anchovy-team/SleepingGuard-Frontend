'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      // Placeholder - would integrate with backend
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/10 border border-cyan-600/20 mb-8">
          <span className="text-sm text-cyan-400 font-medium">Early Access Program</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Secure Your Infrastructure
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Join the preorder list for priority access. Limited hardware units available for Q2 2026 deployment.
        </p>

        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="security@yourcompany.com"
              className="flex-1 px-6 py-4 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-green-600 disabled:hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-900/50 hover:shadow-cyan-800/50 whitespace-nowrap"
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Confirmed
                </span>
              ) : (
                'Notify Me'
              )}
            </button>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            Enterprise deployment consultation available upon request
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            <span>SOC 2 Type II Compliant</span>
            <span>•</span>
            <span>FIPS 140-2 Level 3</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}