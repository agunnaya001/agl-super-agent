'use client';

import Link from 'next/link';
import { useWallet } from '@/lib/hooks/useWallet';
import TokenBalanceCard from '@/components/dashboard/token-balance-card';
import CreditsBalanceCard from '@/components/dashboard/credits-balance-card';
import { BarChart3, Coins, Gift, History } from 'lucide-react';

export default function DashboardHome() {
  const { isConnected } = useWallet();

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            {isConnected
              ? 'Welcome back! Manage your assets and track your portfolio.'
              : 'Connect your wallet to access all dashboard features.'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TokenBalanceCard />
          <CreditsBalanceCard />
        </div>

        {/* Navigation Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={<Coins size={32} />}
              title="Token Management"
              description="Send and manage AGL tokens"
              href="/token"
            />
            <DashboardCard
              icon={<Gift size={32} />}
              title="Credits"
              description="Convert tokens to credits"
              href="/credits"
            />
            <DashboardCard
              icon={<BarChart3 size={32} />}
              title="Portfolio"
              description="View analytics and charts"
              href="/portfolio"
            />
            <DashboardCard
              icon={<History size={32} />}
              title="History"
              description="Transaction history"
              href="/history"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Getting Started</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>✓ Connect your MetaMask wallet to get started</li>
            <li>✓ Make sure you&apos;re on Base Mainnet (Chain ID: 8453)</li>
            <li>✓ All transactions are secured and tracked on the blockchain</li>
            <li>✓ View your complete transaction history anytime</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition cursor-pointer">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
