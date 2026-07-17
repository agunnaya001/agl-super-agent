'use client';

import { Transaction } from '@/lib/types';
import { formatDate, formatTxHash, formatNumber } from '@/lib/utils/formatting';
import { NETWORK_CONFIG } from '@/lib/config';
import { X, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const explorerUrl = `${NETWORK_CONFIG.blockExplorer}/tx/${transaction.hash}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-foreground bg-secondary';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Main Info */}
        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="text-muted-foreground">Status</span>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
          </div>

          {/* Type & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transaction Type</p>
              <p className="text-lg font-semibold text-foreground">
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(transaction.value, 4)} AGL
              </p>
            </div>
          </div>

          {/* Hash */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg">
              <code className="text-xs font-mono text-foreground flex-1 break-all">
                {transaction.hash}
              </code>
              <button
                onClick={() => handleCopy(transaction.hash, 'hash')}
                className="p-1 hover:bg-secondary rounded transition"
                title="Copy hash"
              >
                <Copy size={16} className="text-muted-foreground" />
              </button>
            </div>
            {copied === 'hash' && (
              <p className="text-xs text-success mt-1">Copied to clipboard!</p>
            )}
          </div>

          {/* From */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">From</p>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg">
              <code className="text-xs font-mono text-foreground flex-1 break-all">
                {transaction.from}
              </code>
              <button
                onClick={() => handleCopy(transaction.from, 'from')}
                className="p-1 hover:bg-secondary rounded transition"
                title="Copy address"
              >
                <Copy size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* To */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">To</p>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg">
              <code className="text-xs font-mono text-foreground flex-1 break-all">
                {transaction.to}
              </code>
              <button
                onClick={() => handleCopy(transaction.to, 'to')}
                className="p-1 hover:bg-secondary rounded transition"
                title="Copy address"
              >
                <Copy size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Timestamp */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
              <p className="text-sm text-foreground">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Block Explorer</p>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View on BaseScan
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          {transaction.blockNumber && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Block Number</p>
              <p className="text-sm text-foreground font-mono">{transaction.blockNumber}</p>
            </div>
          )}

          {transaction.gasUsed && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Used</p>
              <p className="text-sm text-foreground">{transaction.gasUsed}</p>
            </div>
          )}

          {transaction.gasPrice && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gas Price</p>
              <p className="text-sm text-foreground font-mono">{transaction.gasPrice}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-border flex gap-2">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            Open in Explorer
            <ExternalLink size={16} />
          </a>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
