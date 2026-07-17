'use client';

import { useState } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import TransactionList from '@/components/dashboard/transaction-list';
import TransactionDetailModal from '@/components/dashboard/transaction-detail-modal';
import { Transaction } from '@/lib/types';

export default function HistoryPage() {
  const { isConnected, isCorrectNetwork } = useWallet();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  if (!isConnected || !isCorrectNetwork) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Transaction History</h1>
          <p className="text-lg text-muted-foreground">
            Please connect your wallet and ensure you&apos;re on Base Mainnet to view your transaction history.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
          <p className="text-lg text-muted-foreground">
            View and manage all your transactions on Base Mainnet.
          </p>
        </div>

        {/* Transaction List */}
        <TransactionList onSelectTransaction={setSelectedTransaction} />

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-3">About Your Transactions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Pending</p>
              <p className="text-foreground">Transactions waiting for confirmation on the blockchain.</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Completed</p>
              <p className="text-foreground">Successfully confirmed transactions on the blockchain.</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Failed</p>
              <p className="text-foreground">Transactions that were reverted or rejected by the network.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </main>
  );
}
