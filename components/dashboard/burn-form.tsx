'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { useTransactionStore } from '@/lib/store/transaction-store';
import { approveUnlimited, transfer } from '@/lib/blockchain/services/agl-token';
import { calculateCreditsFromTokens } from '@/lib/blockchain/services/agl-credits';
import { formatNumber } from '@/lib/utils/formatting';
import { Loader2, AlertCircle, Check, Info } from 'lucide-react';
import { CONTRACT_ADDRESSES, TOKEN_CONFIG } from '@/lib/config';

interface BurnFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type FormStep = 'input' | 'confirm' | 'processing' | 'success';

export default function BurnForm({ onSuccess, onCancel }: BurnFormProps) {
  const { address, aglBalance, updateBalances } = useWallet();
  const { addNotification } = useUIStore();
  const { addTransaction } = useTransactionStore();

  const [step, setStep] = useState<FormStep>('input');
  const [aglAmount, setAglAmount] = useState('');
  const [estimatedCredits, setEstimatedCredits] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [txHash, setTxHash] = useState('');

  // Calculate estimated credits when amount changes
  const handleAmountChange = useCallback(
    async (value: string) => {
      setAglAmount(value);
      if (errors.amount) {
        setErrors({ ...errors, amount: '' });
      }

      if (value && parseFloat(value) > 0) {
        try {
          const credits = await calculateCreditsFromTokens(value);
          setEstimatedCredits(credits);
        } catch (error) {
          console.error('[BurnForm] Failed to calculate credits:', error);
          setEstimatedCredits('0');
        }
      } else {
        setEstimatedCredits('0');
      }
    },
    [errors]
  );

  // Validation
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!aglAmount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const numAmount = parseFloat(aglAmount);
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
  }, [aglAmount, aglBalance]);

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
      // First, approve the burn contract to spend AGL tokens
      addNotification({
        type: 'info',
        message: 'Approving token spend...',
      });

      const approveTxHash = await approveUnlimited(CONTRACT_ADDRESSES.aglCredits);

      // Then transfer AGL to burn contract
      addNotification({
        type: 'info',
        message: 'Converting AGL to credits...',
      });

      const burnTxHash = await transfer(CONTRACT_ADDRESSES.aglCredits, aglAmount);
      setTxHash(burnTxHash);

      addTransaction({
        hash: burnTxHash,
        from: address,
        to: CONTRACT_ADDRESSES.aglCredits,
        value: aglAmount,
        type: 'burn',
        status: 'pending',
        timestamp: Math.floor(Date.now() / 1000),
      });

      addNotification({
        type: 'success',
        message: `Burn initiated! Tx: ${burnTxHash.slice(0, 10)}...`,
      });

      setStep('success');

      // Update balances
      setTimeout(() => {
        updateBalances();
      }, 2000);

      // Auto close after 3 seconds
      setTimeout(() => {
        onSuccess?.();
      }, 3000);
    } catch (error: any) {
      console.error('[BurnForm] Burn failed:', error);
      addNotification({
        type: 'error',
        message: error.message || 'Burn failed',
      });
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  }, [address, aglAmount, addNotification, addTransaction, updateBalances, onSuccess]);

  const balance = aglBalance ? parseFloat(aglBalance) : 0;
  const creditsValue = parseFloat(estimatedCredits) || 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'input' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-info/10 border border-info/20 rounded-lg p-3 flex gap-2 text-sm">
            <Info size={16} className="text-info flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              Convert your AGL tokens to credits. This transaction will burn AGL and mint equivalent credits.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Amount to Convert (AGL)
              </label>
              <button
                type="button"
                onClick={() => handleAmountChange(balance.toString())}
                className="text-xs text-primary hover:underline"
              >
                Max: {balance.toFixed(4)}
              </button>
            </div>
            <input
              type="number"
              value={aglAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
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

          {estimatedCredits && parseFloat(estimatedCredits) > 0 && (
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-1">You&apos;ll Receive</p>
              <p className="text-lg font-semibold text-foreground">
                {formatNumber(creditsValue, 2)} Credits
              </p>
            </div>
          )}

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
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              disabled={!aglAmount || parseFloat(aglAmount) <= 0}
            >
              Review Conversion
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
              <code className="text-sm font-mono">{CONTRACT_ADDRESSES.aglCredits.slice(0, 10)}...</code>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="text-foreground font-medium">AGL Amount</span>
              <span className="text-foreground font-medium">{aglAmount} AGL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground font-medium">Credits to Receive</span>
              <span className="text-foreground font-medium">{formatNumber(creditsValue, 2)}</span>
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
              {isLoading ? 'Processing...' : 'Confirm Conversion'}
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
            <p className="text-foreground font-medium">Processing Conversion</p>
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
            <p className="text-foreground font-medium">Conversion Initiated!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your AGL tokens are being converted to credits.
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
