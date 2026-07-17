'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import ConnectModal from '@/components/wallet/connect-modal';
import { useEffect } from 'react';

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isCorrectNetwork, isInitialized } = useWallet();
  const { openModal } = useUIStore();

  useEffect(() => {
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

  if (!isConnected || !isCorrectNetwork) {
    return (
      <>
        <ConnectModal />
        {children}
      </>
    );
  }

  return (
    <>
      {children}
      <ConnectModal />
    </>
  );
}
