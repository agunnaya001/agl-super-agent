'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui-store';
import Navbar from './navbar';
import Sidebar from './sidebar';
import ConnectModal from '@/components/wallet/connect-modal';
import Notifications from '@/components/common/notifications';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <ConnectModal />
      <Notifications />
    </div>
  );
}
