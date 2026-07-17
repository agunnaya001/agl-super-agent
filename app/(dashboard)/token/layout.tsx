import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGL Token Management - Send & Manage Tokens | AGL Super Agent',
  description: 'Manage and send AGL tokens on Base Mainnet. View real-time balances, transfer tokens, and track your transactions with gas estimates.',
  keywords: ['AGL Token', 'token management', 'send tokens', 'crypto wallet', 'Base Mainnet', 'ERC-20'],
  openGraph: {
    title: 'AGL Token Management',
    description: 'Send and manage your AGL tokens on Base Mainnet',
  },
};

export default function TokenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
