import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='flex flex-1 flex-col md:flex-row'>
        <Sidebar />
        <main className='min-w-0 flex-1 bg-slate-50 px-4 py-8 sm:px-6 lg:px-10'>
          <div className='mx-auto w-full max-w-5xl'>{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
