import { Lock, Shield, Server, Check, AlertTriangle } from 'lucide-react';

export default function ProductShowcase() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dual-Layer Defense System
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Software intelligence meets hardware security.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Password Manager */}
          <div className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-700/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-900/50">
                <Lock className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                SleepingGuard Password Manager
              </h3>

              <p className="text-slate-400 mb-6 leading-relaxed">
                Encrypted vault with cryptographic handshake to hardware device. All decryption operations occur in isolated hardware, never in system memory.
              </p>

              <ul className="space-y-3">
                {[
                  'Zero-knowledge architecture',
                  'Hardware-enforced encryption',
                  'Audit-ready compliance logs',
                  'Active Directory integration'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hardware Key */}
          <div className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-700/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-900/50">
                <Shield className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                SleepingGuard Key
              </h3>

              <p className="text-slate-400 mb-6 leading-relaxed">
                Tamper-resistant hardware security module. Credentials never leave the device. Physical authentication required for all cryptographic operations.
              </p>

              <ul className="space-y-3">
                {[
                  'Secure element chip architecture',
                  'Offline credential storage',
                  'Biometric verification option',
                  'USB-C and NFC connectivity'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Visual */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] rounded-2xl" />
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              How They Work Together
            </h3>

            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <Server className="w-10 h-10 text-cyan-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Encrypted Vault</h4>
                <p className="text-sm text-slate-400">Software stores encrypted credentials</p>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600" />
                  <div className="w-3 h-3 bg-cyan-600 rounded-full animate-pulse" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-600 to-cyan-500" />
                  <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <Shield className="w-10 h-10 text-cyan-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Hardware Key</h4>
                <p className="text-sm text-slate-400">Device performs decryption offline</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-slate-950/50 border border-slate-800 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-white font-semibold mb-2">Breach Containment Model</h5>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    If your workstation is compromised, attackers gain access to encrypted data only. Without the physical SleepingGuard Key present and authenticated, credentials remain mathematically unrecoverable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}