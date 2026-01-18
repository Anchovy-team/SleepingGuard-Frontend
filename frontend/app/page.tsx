import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import EmailSignup from '@/components/EmailSignup';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <ProductShowcase />
        <EmailSignup />
      </main>
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 SleepingGuard. Hardware security for the breach-aware enterprise.</p>
        </div>
      </footer>
    </div>
  );
}