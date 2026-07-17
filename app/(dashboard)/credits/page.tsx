'use client';

import RootLayout from '@/components/layout/root-layout';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { formatNumber } from '@/lib/utils/formatting';
import { Zap, Flame } from 'lucide-react';

export default function CreditsPage() {
  const { isConnected, aglCreditsBalance } = useWallet();
  const { openModal, addNotification } = useUIStore();

  if (!isConnected) {
    return (
      <RootLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Connect wallet to view credits</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">AGL Credits</h2>

        {/* Credits Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 border border-primary/30">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your Credits Balance</p>
                <p className="text-4xl font-bold">{formatNumber(aglCreditsBalance || '0')}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Zap size={32} className="text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Use credits to access premium features and AI agents
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="font-bold mb-4">How to Earn Credits</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Hold AGL tokens in your wallet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Burn tokens to receive credits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Use credits for platform features</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h3 className="text-xl font-bold mb-6">Credit Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => openModal('burn-credits')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              <Flame size={20} />
              Burn Tokens for Credits
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
              <Zap size={20} />
              Use Credits
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
