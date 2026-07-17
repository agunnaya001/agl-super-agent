import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGL Credits - Convert Tokens to Credits | AGL Super Agent',
  description: 'Convert your AGL tokens to credits and unlock exclusive platform features. Earn rewards by participating in the AGL ecosystem on Base Mainnet.',
  keywords: ['AGL Credits', 'token conversion', 'earn credits', 'Base Mainnet', 'crypto rewards', 'token burn'],
  openGraph: {
    title: 'AGL Credits System',
    description: 'Convert AGL tokens to credits and earn rewards',
  },
};

export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
