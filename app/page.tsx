import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Coins, Zap, MessageCircle, BarChart3, Lock, Rocket, Gauge } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGL Super Agent - Blockchain-as-a-Service Platform | Base Mainnet',
  description: 'Manage AGL tokens, earn credits, and interact with blockchain-aware AI agents on Base Mainnet. Next-generation BaaS platform for Web3 applications.',
  openGraph: {
    title: 'AGL Super Agent - Blockchain-as-a-Service Platform',
    description: 'Next-generation BaaS platform for managing AGL tokens and AI agents on Base Mainnet',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 relative">
              <Image
                src="/agl-token-logo.png"
                alt="AGL Token Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AGL Super Agent</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
            <Link
              href="/token"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-primary">🚀 Powered by Base Mainnet</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-foreground leading-tight">
              Next-Generation Blockchain-as-a-Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Manage AGL tokens, earn credits, track your portfolio, and interact with blockchain-aware AI agents
              all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/token"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-lg"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-lg font-semibold hover:bg-secondary transition text-lg text-foreground"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Base</div>
              <p className="text-muted-foreground">Mainnet Network</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <p className="text-muted-foreground">Live Smart Contracts</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">7+</div>
              <p className="text-muted-foreground">Powerful Features</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 border-t border-border">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-foreground">Powerful Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your blockchain assets and interact with Web3 applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Coins size={32} />}
              title="Token Management"
              description="Send, receive, and manage your AGL tokens directly on Base Mainnet with real-time balance updates"
              href="/token"
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Credits System"
              description="Convert AGL tokens to credits and unlock exclusive platform features and capabilities"
              href="/credits"
            />
            <FeatureCard
              icon={<BarChart3 size={32} />}
              title="Portfolio Analytics"
              description="Track your portfolio performance with detailed charts, historical data, and asset breakdowns"
              href="/portfolio"
            />
            <FeatureCard
              icon={<MessageCircle size={32} />}
              title="Transaction History"
              description="View complete transaction history with detailed information and blockchain explorer links"
              href="/history"
            />
            <FeatureCard
              icon={<Lock size={32} />}
              title="Secure Transactions"
              description="All transactions are secured with MetaMask wallet integration and gas estimation"
              href="/token"
            />
            <FeatureCard
              icon={<Gauge size={32} />}
              title="Gas Optimization"
              description="Efficient transaction processing with optimized gas estimates and real-time network status"
              href="/token"
            />
            <FeatureCard
              icon={<Rocket size={32} />}
              title="Fast Deployment"
              description="Instant wallet connection and smart contract interactions powered by Base Mainnet"
              href="/token"
            />
            <FeatureCard
              icon={<MessageCircle size={32} />}
              title="AI-Powered Chat"
              description="Interact with blockchain-aware AI agents for transaction assistance and platform guidance"
              href="/chat"
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 border-t border-border">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-foreground">How It Works</h3>
            <p className="text-lg text-muted-foreground">Three simple steps to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Connect Wallet</h4>
              <p className="text-muted-foreground">
                Connect your MetaMask wallet and ensure you&apos;re on Base Mainnet to begin
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Manage Assets</h4>
              <p className="text-muted-foreground">
                View your balances, send tokens, and manage your AGL token portfolio instantly
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Earn & Track</h4>
              <p className="text-muted-foreground">
                Earn credits through conversions and track your portfolio performance with analytics
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users managing their blockchain assets on Base Mainnet
            </p>
            <Link
              href="/token"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-lg"
            >
              Launch Dashboard
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AGL</span>
                </div>
                <span className="font-semibold text-foreground">AGL Super Agent</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Blockchain-as-a-Service platform on Base Mainnet
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/token" className="hover:text-foreground transition">Token Management</Link></li>
                <li><Link href="/credits" className="hover:text-foreground transition">Credits System</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground transition">Analytics</Link></li>
                <li><Link href="/history" className="hover:text-foreground transition">History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Network</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://base.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Base Mainnet</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contract Addresses</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AGL Super Agent. All rights reserved.</p>
          </div>
        </footer>
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
