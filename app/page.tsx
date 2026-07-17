import Link from 'next/link';
import { ArrowRight, Coins, Zap, MessageCircle, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AGL Super Agent</h1>
          <Link href="/dashboard" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            AGL Super Agent
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Next-generation blockchain-as-a-service platform. Manage your AGL tokens, earn credits,
            and interact with intelligent AI agents on Base Mainnet.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Coins size={32} />}
              title="AGL Tokens"
              description="Manage and trade AGL tokens on Base Mainnet"
              href="/dashboard/token"
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Credits System"
              description="Burn tokens to earn credits and unlock features"
              href="/dashboard/credits"
            />
            <FeatureCard
              icon={<MessageCircle size={32} />}
              title="AI Chat"
              description="Interact with blockchain-aware AI agents"
              href="/dashboard/chat"
            />
            <FeatureCard
              icon={<BarChart3 size={32} />}
              title="Analytics"
              description="Track transactions and portfolio performance"
              href="/dashboard/history"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-border">
          <StatCard label="Network" value="Base Mainnet" />
          <StatCard label="Live Contracts" value="2" />
          <StatCard label="Features" value="7+" />
        </div>
      </div>
    </main>
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
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h4 className="font-bold mb-2 text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
