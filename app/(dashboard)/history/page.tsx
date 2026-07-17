'use client';

import RootLayout from '@/components/layout/root-layout';
import { useWallet } from '@/lib/hooks/useWallet';
import { useTransaction } from '@/lib/hooks/useTransaction';
import { formatAddress, formatDate } from '@/lib/utils/formatting';
import { History, ExternalLink } from 'lucide-react';

export default function HistoryPage() {
  const { isConnected } = useWallet();
  const { transactions } = useTransaction();

  if (!isConnected) {
    return (
      <RootLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">Connect wallet to view transaction history</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <History size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Transaction History</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-card rounded-lg p-12 border border-border text-center">
            <History size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Hash</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((tx) => (
                  <tr key={tx.hash} className="hover:bg-secondary/50 transition">
                    <td className="px-6 py-4 text-sm font-medium capitalize">{tx.type}</td>
                    <td className="px-6 py-4 text-sm font-mono text-primary">
                      {formatAddress(tx.hash)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === 'confirmed'
                            ? 'bg-green-900/30 text-green-200'
                            : tx.status === 'failed'
                              ? 'bg-red-900/30 text-red-200'
                              : 'bg-yellow-900/30 text-yellow-200'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(new Date(tx.timestamp))}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href={`https://basescan.org/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RootLayout>
  );
}
