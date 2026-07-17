'use client';

import RootLayout from '@/components/layout/root-layout';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { formatNumber } from '@/lib/utils/formatting';
import { Coins, Send } from 'lucide-react';

export default function TokenPage() {
  const { isConnected, address, aglBalance } = useWallet();
  const { openModal, addNotification } = useUIStore();

  if (!isConnected) {
    return (
      <RootLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Connect wallet to view tokens</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">AGL Token</h2>

        {/* Token Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Coins size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <p className="text-3xl font-bold">{formatNumber(aglBalance || '0')}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
            <p className="font-mono text-sm break-all text-primary">{address}</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Network</p>
            <p className="font-bold">Base Mainnet</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h3 className="text-xl font-bold mb-6">Token Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => openModal('transfer')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              <Send size={20} />
              Transfer Tokens
            </button>
            <button
              onClick={() =>
                addNotification({
                  type: 'info',
                  message: 'Coming soon',
                })
              }
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              <Coins size={20} />
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
