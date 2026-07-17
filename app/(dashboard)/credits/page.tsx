'use client';

import { useState } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import CreditsBalanceCard from '@/components/dashboard/credits-balance-card';
import BurnForm from '@/components/dashboard/burn-form';
import { X } from 'lucide-react';

export default function CreditsPage() {
  const { isConnected, isCorrectNetwork } = useWallet();
  const [showBurnModal, setShowBurnModal] = useState(false);

  if (!isConnected || !isCorrectNetwork) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">AGL Credits</h1>
          <p className="text-lg text-muted-foreground">
            Please connect your wallet and ensure you&apos;re on Base Mainnet to manage your credits.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">AGL Credits System</h1>
          <p className="text-lg text-muted-foreground">
            Convert your AGL tokens to credits to unlock platform features and capabilities.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Cards */}
          <div className="lg:col-span-2 space-y-6">
            <CreditsBalanceCard onBurnClick={() => setShowBurnModal(true)} />

            {/* Info Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select Amount</p>
                    <p>Choose how many AGL tokens you want to convert.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Approve Transaction</p>
                    <p>Sign the transaction in your wallet to proceed.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Receive Credits</p>
                    <p>Your credits will be minted and ready to use.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">About Credits</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Token Type</p>
                  <p className="text-foreground font-mono">ERC-20</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Network</p>
                  <p className="text-foreground">Base Mainnet</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Decimals</p>
                  <p className="text-foreground">18</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Conversion</p>
                  <p className="text-foreground">Dynamic rate</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Note</h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Credits are earned by converting AGL tokens. The conversion rate is determined by the smart contract.
              </p>
            </div>

            <button
              onClick={() => setShowBurnModal(true)}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition text-sm"
            >
              Convert Now
            </button>
          </div>
        </div>

        {/* Burn Modal */}
        {showBurnModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Convert to Credits</h2>
                <button
                  onClick={() => setShowBurnModal(false)}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              <BurnForm
                onSuccess={() => setShowBurnModal(false)}
                onCancel={() => setShowBurnModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
