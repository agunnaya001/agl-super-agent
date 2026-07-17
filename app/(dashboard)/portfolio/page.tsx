'use client';

import RootLayout from '@/components/layout/root-layout';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import BalanceCard from '@/components/dashboard/balance-card';
import { formatNumber } from '@/lib/utils/formatting';
import { BarChart3, TrendingUp, Wallet } from 'lucide-react';

export default function PortfolioPage() {
  const { isConnected, aglBalance, aglCreditsBalance } = useWallet();
  const { openModal } = useUIStore();

  if (!isConnected) {
    return (
      <RootLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Connect wallet to view portfolio</p>
        </div>
      </RootLayout>
    );
  }

  const aglValue = parseFloat(aglBalance || '0');
  const creditsValue = parseFloat(aglCreditsBalance || '0');

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Portfolio</h2>
        </div>

        {/* Balance Overview */}
        <div className="mb-8">
          <BalanceCard />
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Wallet size={24} className="text-primary" />
              <p className="text-sm text-muted-foreground">Total Assets</p>
            </div>
            <p className="text-2xl font-bold">{(aglValue + creditsValue).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-2">AGL + Credits</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={24} className="text-accent" />
              <p className="text-sm text-muted-foreground">AGL Distribution</p>
            </div>
            <p className="text-2xl font-bold">
              {aglValue > 0 ? ((aglValue / (aglValue + creditsValue)) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-muted-foreground mt-2">Of total value</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={24} className="text-primary" />
              <p className="text-sm text-muted-foreground">Credits Distribution</p>
            </div>
            <p className="text-2xl font-bold">
              {creditsValue > 0 ? ((creditsValue / (aglValue + creditsValue)) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-muted-foreground mt-2">Of total value</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => openModal('transfer')}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Transfer Tokens
            </button>
            <button
              onClick={() => openModal('burn-credits')}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Burn Tokens
            </button>
            <button
              onClick={() => openModal('settings')}
              className="px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              View Settings
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
