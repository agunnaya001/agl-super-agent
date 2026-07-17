'use client';

import RootLayout from '@/components/layout/root-layout';
import ThemeToggle from '@/components/common/theme-toggle';
import { useUIStore } from '@/lib/store/ui-store';
import { useWallet } from '@/lib/hooks/useWallet';
import { Settings, Moon, Sun, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { getShortAddress } from '@/lib/blockchain/wallet';

export default function SettingsPage() {
  const { theme, setTheme } = useUIStore();
  const { address, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Settings size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Settings</h2>
        </div>

        {/* Theme Settings */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {(['light', 'dark', 'system'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`p-4 rounded-lg border-2 transition text-center capitalize ${
                    theme === themeOption
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {themeOption === 'light' && <Sun size={24} className="mx-auto mb-2" />}
                  {themeOption === 'dark' && <Moon size={24} className="mx-auto mb-2" />}
                  {themeOption === 'system' && <Settings size={24} className="mx-auto mb-2" />}
                  <p className="text-sm font-medium">{themeOption}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wallet Settings */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Wallet</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Connected Address</p>
                <p className="font-mono text-sm">{address && getShortAddress(address)}</p>
              </div>
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button
              onClick={disconnect}
              className="w-full px-4 py-3 bg-destructive text-white rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Disconnect Wallet
            </button>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Platform</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Network</p>
                <p className="text-sm text-muted-foreground">Base Mainnet</p>
              </div>
              <span className="px-3 py-1 bg-green-900/30 text-green-200 rounded-full text-sm font-semibold">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
