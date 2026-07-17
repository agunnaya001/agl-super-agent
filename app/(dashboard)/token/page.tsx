'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import TokenBalanceCard from '@/components/dashboard/token-balance-card';
import TransferForm from '@/components/dashboard/transfer-form';
import { useUIStore } from '@/lib/store/ui-store';
import { X } from 'lucide-react';

export default function TokenPage() {
  const { isConnected } = useWallet();
  const [showTransferModal, setShowTransferModal] = useState(false);

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">AGL Token Management</h1>
          <p className="text-lg text-muted-foreground">
            View your AGL token balance and send tokens to other addresses.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="lg:col-span-2">
            <TokenBalanceCard onTransferClick={() => setShowTransferModal(true)} />
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">About AGL Token</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
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
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
              <button
                onClick={() => setShowTransferModal(true)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition text-sm"
              >
                Send Tokens
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Modal */}
        {showTransferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Send Tokens</h2>
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="p-1 hover:bg-secondary rounded transition"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              <TransferForm
                onSuccess={() => setShowTransferModal(false)}
                onCancel={() => setShowTransferModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
