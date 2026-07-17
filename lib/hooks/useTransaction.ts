import { useCallback } from 'react';
import { useTransactionStore } from '@/lib/store/transaction-store';
import { useUIStore } from '@/lib/store/ui-store';
import { Transaction, TransactionStatus, TransactionType } from '@/lib/types';
import * as TransactionService from '@/lib/blockchain/services/transaction';

export function useTransaction() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    clearTransactions,
    getPendingTransactions,
    getCompletedTransactions,
    getFailedTransactions,
    getTransactionByHash,
  } = useTransactionStore();

  const { addNotification, setLoading, setLoadingMessage } = useUIStore();

  // Track a new transaction
  const track = useCallback(
    async (
      hash: string,
      type: TransactionType,
      description?: string
    ) => {
      try {
        const tx: Transaction = {
          hash,
          type,
          status: TransactionStatus.PENDING,
          description,
          timestamp: Date.now(),
        };

        addTransaction(tx);
        addNotification({
          type: 'info',
          message: `Transaction initiated: ${description || hash.slice(0, 10)}...`,
        });

        // Wait for confirmation
        setLoading(true);
        setLoadingMessage('Waiting for transaction confirmation...');

        const receipt = await TransactionService.waitForConfirmation(hash);

        if (receipt?.status === TransactionStatus.CONFIRMED) {
          updateTransaction(hash, {
            status: TransactionStatus.CONFIRMED,
            blockNumber: receipt.blockNumber,
          });

          addNotification({
            type: 'success',
            message: `Transaction confirmed: ${description || hash.slice(0, 10)}...`,
          });
        } else {
          updateTransaction(hash, {
            status: TransactionStatus.FAILED,
          });

          addNotification({
            type: 'error',
            message: `Transaction failed: ${description || hash.slice(0, 10)}...`,
          });
        }

        setLoading(false);
        setLoadingMessage(null);

        return receipt;
      } catch (error) {
        console.error('[useTransaction] Track failed:', error);
        updateTransaction(hash, { status: TransactionStatus.FAILED });
        setLoading(false);
        setLoadingMessage(null);
        addNotification({
          type: 'error',
          message: 'Transaction tracking failed',
        });
        throw error;
      }
    },
    [addTransaction, updateTransaction, addNotification, setLoading, setLoadingMessage]
  );

  // Get transaction details
  const getDetails = useCallback(
    async (hash: string) => {
      try {
        return await TransactionService.parseTransaction(hash);
      } catch (error) {
        console.error('[useTransaction] Get details failed:', error);
        return null;
      }
    },
    []
  );

  // Check if transaction is successful
  const isSuccessful = useCallback(
    async (hash: string) => {
      try {
        return await TransactionService.isTransactionSuccessful(hash);
      } catch (error) {
        console.error('[useTransaction] Check successful failed:', error);
        return false;
      }
    },
    []
  );

  // Calculate transaction cost
  const calculateCost = useCallback(
    async (hash: string) => {
      try {
        return await TransactionService.calculateTransactionCost(hash);
      } catch (error) {
        console.error('[useTransaction] Calculate cost failed:', error);
        return null;
      }
    },
    []
  );

  return {
    transactions,
    pendingTransactions: getPendingTransactions(),
    completedTransactions: getCompletedTransactions(),
    failedTransactions: getFailedTransactions(),
    track,
    getDetails,
    isSuccessful,
    calculateCost,
    updateTransaction,
    removeTransaction,
    clearTransactions,
    getTransactionByHash,
  };
}
