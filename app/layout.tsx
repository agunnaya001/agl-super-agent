import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AGL Super Agent - Blockchain-as-a-Service Platform',
  description: 'Next-generation blockchain-as-a-service platform for managing AGL tokens, earning credits, and interacting with AI agents on Base Mainnet.',
  keywords: ['blockchain', 'web3', 'AGL tokens', 'credits system', 'Base Mainnet', 'smart contracts', 'AI agents', 'DeFi'],
  authors: [{ name: 'AGL Super Agent' }],
  creator: 'AGL Super Agent Team',
  publisher: 'Vercel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agl-super-agent.vercel.app',
    siteName: 'AGL Super Agent',
    title: 'AGL Super Agent - Blockchain-as-a-Service Platform',
    description: 'Manage AGL tokens, earn credits, and interact with blockchain-aware AI agents on Base Mainnet.',
    images: [
      {
        url: 'https://agl-super-agent.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGL Super Agent Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGL Super Agent - Blockchain-as-a-Service',
    description: 'Next-generation BaaS platform for Web3 applications',
    images: ['https://agl-super-agent.vercel.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://agl-super-agent.vercel.app',
  },
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0052ff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e27' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
