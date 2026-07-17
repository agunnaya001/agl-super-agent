'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { formatNumber } from '@/lib/utils/formatting';
import { Loader2, TrendingUp } from 'lucide-react';

export default function BalanceCard() {
  const { isConnected, aglBalance, aglCreditsBalance } = useWallet();

  if (!isConnected) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Connect wallet to see balances</p>
        </div>
      </div>
    );
  }

  const isLoading = aglBalance === null || aglCreditsBalance === null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* AGL Token */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">AGL Token Balance</p>
            <h3 className="text-3xl font-bold text-foreground">
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : formatNumber(aglBalance || '0')}
            </h3>
          </div>
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">∑</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-green-600">
          <TrendingUp size={16} />
          <span>Token</span>
        </div>
      </div>

      {/* AGL Credits */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">AGL Credits Balance</p>
            <h3 className="text-3xl font-bold text-foreground">
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : formatNumber(aglCreditsBalance || '0')}
            </h3>
          </div>
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-blue-600">
          <TrendingUp size={16} />
          <span>Credits</span>
        </div>
      </div>
    </div>
  );
}
