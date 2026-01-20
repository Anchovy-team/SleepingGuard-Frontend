import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SleepingGuard - Hardware Security for Enterprise',
  description: 'Hardware-enforced credential protection. Your passwords remain secure even when your infrastructure is breached.',
  keywords: 'password manager, hardware security, enterprise security, zero trust, cybersecurity, breach protection',
  authors: [{ name: 'SleepingGuard' }],
  openGraph: {
    title: 'SleepingGuard - Hardware Security for Enterprise',
    description: 'Hardware-enforced credential protection that survives system compromise.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}