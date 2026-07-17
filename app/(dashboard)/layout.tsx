'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import Sidebar from '@/components/layout/sidebar';
import Navbar from '@/components/layout/navbar';
import ConnectModal from '@/components/wallet/connect-modal';
import Notifications from '@/components/common/notifications';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isCorrectNetwork, isInitialized } = useWallet();
  const { openModal } = useUIStore();

  useEffect(() => {
    // Open connect modal if wallet is not connected after initialization
    if (isInitialized && !isConnected) {
      openModal('connect-wallet');
    }
  }, [isInitialized, isConnected, openModal]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <ConnectModal />
      </>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <>
        <Navbar />
        <ConnectModal />
      </>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      <ConnectModal />
      <Notifications />
    </>
  );
}
