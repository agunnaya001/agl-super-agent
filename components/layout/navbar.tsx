'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { getShortAddress } from '@/lib/blockchain/wallet';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../common/theme-toggle';

export default function Navbar() {
  const { address, isConnected, connect, disconnect } = useWallet();
  const { sidebarOpen, toggleSidebar, openModal } = useUIStore();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 shadow-lg shadow-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 relative">
              <Image
                src="/agl-token-logo.png"
                alt="AGL Token Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AGL Super Agent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm text-foreground hover:text-primary transition">
              Dashboard
            </Link>
            <Link href="/token" className="text-sm text-foreground hover:text-primary transition">
              Token
            </Link>
            <Link href="/chat" className="text-sm text-foreground hover:text-primary transition">
              Chat
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block px-3 py-1.5 bg-secondary rounded text-sm font-mono">
                  {getShortAddress(address)}
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 rounded bg-destructive text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => openModal('connect-wallet')}
                className="px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:opacity-90 transition"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-secondary rounded transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
