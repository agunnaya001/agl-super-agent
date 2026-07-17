import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaction History - View & Track Transactions | AGL Super Agent',
  description: 'View your complete transaction history with detailed information and blockchain explorer links. Filter and sort transactions by type and status.',
  keywords: ['transaction history', 'crypto transactions', 'blockchain explorer', 'transaction tracking', 'Base Mainnet', 'transaction details'],
  openGraph: {
    title: 'Transaction History',
    description: 'View and track all your blockchain transactions',
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
