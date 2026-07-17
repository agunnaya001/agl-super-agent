'use client';

import { useMemo, useState } from 'react';
import { useTransactionStore } from '@/lib/store/transaction-store';
import { Transaction } from '@/lib/types';
import { formatTxHash, formatDate, formatNumber } from '@/lib/utils/formatting';
import { getShortAddress } from '@/lib/blockchain/wallet';
import { Send, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface TransactionListProps {
  onSelectTransaction?: (tx: Transaction) => void;
}

export default function TransactionList({ onSelectTransaction }: TransactionListProps) {
  const { transactions, filter, setFilter, sortBy, setSortBy } = useTransactionStore();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (filter !== 'all') {
      filtered = filtered.filter((tx) => tx.status === filter);
    }

    // Sort
    const sorted = [...filtered];
    if (sortBy === 'date') {
      sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'type') {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortBy === 'status') {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    }

    return sorted;
  }, [transactions, filter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-warning" />;
      case 'completed':
        return <CheckCircle size={16} className="text-success" />;
      case 'failed':
        return <AlertCircle size={16} className="text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'completed':
        return 'bg-success/10 text-success';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-secondary text-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <Send size={16} />;
      case 'burn':
        return <Zap size={16} />;
      default:
        return <Send size={16} />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No transactions yet. Start by connecting your wallet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'completed', 'failed'].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f as any);
                setPage(1);
              }}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as any);
            setPage(1);
          }}
          className="px-3 py-1 rounded text-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="date">Sort by Date</option>
          <option value="type">Sort by Type</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">From / To</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Amount</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((tx) => (
                <tr
                  key={tx.hash}
                  className="border-b border-border hover:bg-secondary/30 transition cursor-pointer"
                  onClick={() => onSelectTransaction?.(tx)}
                >
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      {getTypeIcon(tx.type)}
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {getShortAddress(tx.from, 3)} → {getShortAddress(tx.to, 3)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-foreground">
                    {formatNumber(tx.value, 4)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getStatusIcon(tx.status)}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(tx.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction?.(tx);
                      }}
                      className="text-primary hover:underline text-xs"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border border-border text-foreground disabled:opacity-50 hover:bg-secondary transition"
          >
            Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  page === i + 1
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:bg-secondary'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border border-border text-foreground disabled:opacity-50 hover:bg-secondary transition"
          >
            Next
          </button>
        </div>
      )}

      <p className="text-sm text-muted-foreground text-center">
        Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
      </p>
    </div>
  );
}
