'use client';

import { useEffect } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import { usePortfolioStore } from '@/lib/store/portfolio-store';
import PortfolioValueCard from '@/components/dashboard/portfolio-value-card';
import PortfolioChart from '@/components/dashboard/portfolio-chart';
import HoldingsBreakdown from '@/components/dashboard/holdings-breakdown';

export default function PortfolioPage() {
  const { isConnected, isCorrectNetwork, aglBalance, aglCreditsBalance } = useWallet();
  const { setTimeframe, selectedTimeframe, addSnapshot, setCurrentValue } = usePortfolioStore();

  // Add portfolio snapshot on balance change
  useEffect(() => {
    if (aglBalance && aglCreditsBalance) {
      const aglValue = parseFloat(aglBalance) * 0.5;
      const creditsValue = parseFloat(aglCreditsBalance) * 0.25;
      const totalValue = aglValue + creditsValue;

      setCurrentValue(totalValue);

      // Add snapshot every time balances update
      addSnapshot({
        timestamp: Math.floor(Date.now() / 1000),
        totalValue: totalValue,
        aglBalance: parseFloat(aglBalance),
        creditsBalance: parseFloat(aglCreditsBalance),
      });
    }
  }, [aglBalance, aglCreditsBalance, addSnapshot, setCurrentValue]);

  if (!isConnected || !isCorrectNetwork) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Portfolio Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Please connect your wallet and ensure you&apos;re on Base Mainnet to view your portfolio.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Track your portfolio performance and holdings.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days as any)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedTimeframe === days
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        {/* Value Card */}
        <PortfolioValueCard />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioChart />
          <HoldingsBreakdown />
        </div>

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Portfolio Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Total Assets</p>
              <p className="text-lg font-semibold text-foreground">
                {aglBalance ? (parseFloat(aglBalance) + (aglCreditsBalance ? parseFloat(aglCreditsBalance) : 0)).toFixed(2) : '0.00'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">AGL Balance</p>
              <p className="text-lg font-semibold text-foreground">
                {aglBalance ? parseFloat(aglBalance).toFixed(4) : '0.00'} AGL
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Credits Balance</p>
              <p className="text-lg font-semibold text-foreground">
                {aglCreditsBalance ? parseFloat(aglCreditsBalance).toFixed(2) : '0.00'} AGLC
              </p>
            </div>
          </div>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Value Tracking</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Monitor your portfolio value over time with historical snapshots and trend analysis.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Holdings Distribution</h4>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              View your asset allocation and understand your portfolio composition.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
