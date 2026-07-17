'use client';

import RootLayout from '@/components/layout/root-layout';
import BalanceCard from '@/components/dashboard/balance-card';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';

export default function DashboardHome() {
  const { isConnected } = useWallet();
  const { openModal } = useUIStore();

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to access the dashboard
            </p>
            <button
              onClick={() => openModal('connect-wallet')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
            <BalanceCard />
          </>
        )}
      </div>
    </RootLayout>
  );
}
