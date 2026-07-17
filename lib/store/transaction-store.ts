import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction } from '@/lib/types';

interface TransactionStore {
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (hash: string, updates: Partial<Transaction>) => void;
  removeTransaction: (hash: string) => void;
  clearTransactions: () => void;

  // Filters
  filter: 'all' | 'pending' | 'completed' | 'failed';
  setFilter: (filter: 'all' | 'pending' | 'completed' | 'failed') => void;

  // Sorting
  sortBy: 'date' | 'type' | 'status';
  setSortBy: (sortBy: 'date' | 'type' | 'status') => void;

  // Selectors
  getPendingTransactions: () => Transaction[];
  getCompletedTransactions: () => Transaction[];
  getFailedTransactions: () => Transaction[];
  getTransactionByHash: (hash: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      // Transactions
      transactions: [],
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
        })),
      updateTransaction: (hash, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.hash === hash ? { ...tx, ...updates } : tx
          ),
        })),
      removeTransaction: (hash) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.hash !== hash),
        })),
      clearTransactions: () => set({ transactions: [] }),

      // Filters
      filter: 'all',
      setFilter: (filter) => set({ filter }),

      // Sorting
      sortBy: 'date',
      setSortBy: (sortBy) => set({ sortBy }),

      // Selectors
      getPendingTransactions: () => {
        const transactions = get().transactions;
        return transactions.filter((tx) => tx.status === 'pending');
      },
      getCompletedTransactions: () => {
        const transactions = get().transactions;
        return transactions.filter((tx) => tx.status === 'completed');
      },
      getFailedTransactions: () => {
        const transactions = get().transactions;
        return transactions.filter((tx) => tx.status === 'failed');
      },
      getTransactionByHash: (hash) => {
        const transactions = get().transactions;
        return transactions.find((tx) => tx.hash === hash);
      },
    }),
    {
      name: 'transaction-store',
      partialize: (state) => ({
        transactions: state.transactions,
        filter: state.filter,
        sortBy: state.sortBy,
      }),
    }
  )
);
