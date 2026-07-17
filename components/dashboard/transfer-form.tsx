'use client';

import { useState, useCallback, useEffect } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { useTransactionStore } from '@/lib/store/transaction-store';
import { validateAddress } from '@/lib/blockchain/wallet';
import { transfer, getBalance } from '@/lib/blockchain/services/agl-token';
import { parseEther, formatEther } from '@/lib/utils/formatting';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import { VALIDATION } from '@/lib/config';

interface TransferFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type FormStep = 'input' | 'confirm' | 'processing' | 'success';

export default function TransferForm({ onSuccess, onCancel }: TransferFormProps) {
  const { address, aglBalance } = useWallet();
  const { addNotification } = useUIStore();
  const { addTransaction } = useTransactionStore();

  const [step, setStep] = useState<FormStep>('input');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [txHash, setTxHash] = useState('');

  // Validation
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!recipient.trim()) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!validateAddress(recipient)) {
      newErrors.recipient = 'Invalid Ethereum address';
    }

    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      } else if (aglBalance) {
        const balance = parseFloat(aglBalance);
        if (numAmount > balance) {
          newErrors.amount = `Insufficient balance. You have ${balance} AGL`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [recipient, amount, aglBalance]);

  // Handle submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setStep('confirm');
    },
    [validateForm]
  );

  // Handle confirm
  const handleConfirm = useCallback(async () => {
    if (!address) {
      addNotification({
        type: 'error',
        message: 'Wallet not connected',
      });
      return;
    }

    setIsLoading(true);
    setStep('processing');

    try {
      const txHash = await transfer(recipient, amount);
      setTxHash(txHash);

      addTransaction({
        hash: txHash,
        from: address,
        to: recipient,
        value: amount,
        type: 'transfer',
        status: 'pending',
        timestamp: Math.floor(Date.now() / 1000),
      });

      addNotification({
        type: 'success',
        message: `Transfer initiated! Tx: ${txHash.slice(0, 10)}...`,
      });

      setStep('success');

      // Auto close after 3 seconds
      setTimeout(() => {
        onSuccess?.();
      }, 3000);
    } catch (error: any) {
      console.error('[TransferForm] Transfer failed:', error);
      addNotification({
        type: 'error',
        message: error.message || 'Transfer failed',
      });
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  }, [address, recipient, amount, addNotification, addTransaction, onSuccess]);

  const balance = aglBalance ? parseFloat(aglBalance) : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'input' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                if (errors.recipient) {
                  setErrors({ ...errors, recipient: '' });
                }
              }}
              placeholder="0x..."
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.recipient ? 'border-destructive' : 'border-border'
              } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition`}
            />
            {errors.recipient && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.recipient}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Amount (AGL)
              </label>
              <button
                type="button"
                onClick={() => setAmount(balance.toString())}
                className="text-xs text-primary hover:underline"
              >
                Max: {balance.toFixed(4)}
              </button>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) {
                  setErrors({ ...errors, amount: '' });
                }
              }}
              placeholder="0.00"
              step="0.0001"
              min="0"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.amount ? 'border-destructive' : 'border-border'
              } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition`}
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.amount}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Review Transfer
            </button>
          </div>
        </form>
      )}

      {step === 'confirm' && (
        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">From</span>
              <code className="text-sm font-mono">{address?.slice(0, 10)}...</code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">To</span>
              <code className="text-sm font-mono">{recipient.slice(0, 10)}...</code>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-foreground font-medium">Amount</span>
              <span className="text-foreground font-medium">{amount} AGL</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep('input')}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Processing...' : 'Confirm Transfer'}
            </button>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Loader2 size={40} className="animate-spin text-primary" />
          </div>
          <div>
            <p className="text-foreground font-medium">Processing Transfer</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please wait and confirm the transaction in your wallet...
            </p>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-lg bg-success/10">
              <Check size={40} className="text-success" />
            </div>
          </div>
          <div>
            <p className="text-foreground font-medium">Transfer Initiated!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your transfer is being processed on the blockchain.
            </p>
            {txHash && (
              <code className="text-xs bg-secondary/50 px-2 py-1 rounded mt-3 block break-all">
                {txHash}
              </code>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
