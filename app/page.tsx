'use client';

import Link from 'next/link';
import RootLayout from '@/components/layout/root-layout';
import BalanceCard from '@/components/dashboard/balance-card';
import { useWallet } from '@/lib/hooks/useWallet';
import { ArrowRight, Coins, Zap, MessageCircle, BarChart3 } from 'lucide-react';

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AGL Super Agent</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Next-generation blockchain-as-a-service platform. Manage your AGL tokens, earn credits,
            and interact with intelligent AI agents.
          </p>
        </div>

        {isConnected && (
          <>
            {/* Balance Cards */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Your Portfolio</h2>
              <BalanceCard />
            </div>
          </>
        )}

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Coins size={24} />}
              title="AGL Tokens"
              description="Manage and trade AGL tokens on Base"
              href="/dashboard/token"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Credits System"
              description="Burn tokens to earn credits and access features"
              href="/dashboard/credits"
            />
            <FeatureCard
              icon={<MessageCircle size={24} />}
              title="AI Chat"
              description="Interact with blockchain-aware AI agents"
              href="/dashboard/chat"
            />
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Analytics"
              description="Track transactions and portfolio performance"
              href="/dashboard/history"
            />
          </div>
        </div>

        {/* CTA Section */}
        {!isConnected && (
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Get Started Today</h3>
            <p className="text-white/80 mb-6">
              Connect your wallet and start managing your AGL portfolio
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-medium hover:opacity-90 transition"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </RootLayout>
  );
}

function FeatureCard({
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
      <div className="bg-card rounded-lg p-6 border border-border hover:border-primary transition cursor-pointer h-full">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
