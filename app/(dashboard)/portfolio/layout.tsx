import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Analytics - Track Assets & Performance | AGL Super Agent',
  description: 'Analyze your portfolio with detailed charts, historical data, and asset breakdowns. Track your AGL token holdings and credits on Base Mainnet.',
  keywords: ['portfolio analytics', 'asset tracking', 'crypto portfolio', 'portfolio analysis', 'Base Mainnet', 'DeFi analytics'],
  openGraph: {
    title: 'Portfolio Analytics Dashboard',
    description: 'Track and analyze your blockchain asset portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
