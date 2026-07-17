import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WalletState } from '@/lib/types';

interface WalletStore {
  // State
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  isCorrectNetwork: boolean;
  balance: string | null;
  aglBalance: string | null;
  aglCreditsBalance: string | null;

  // Actions
  setAddress: (address: string | null) => void;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setChainId: (chainId: number | null) => void;
  setCorrectNetwork: (correct: boolean) => void;
  setBalance: (balance: string | null) => void;
  setAGLBalance: (balance: string | null) => void;
  setAGLCreditsBalance: (balance: string | null) => void;
  
  // Combined actions
  setWalletState: (state: Partial<WalletStore>) => void;
  reset: () => void;
}

const initialState = {
  address: null,
  isConnected: false,
  isConnecting: false,
  chainId: null,
  isCorrectNetwork: false,
  balance: null,
  aglBalance: null,
  aglCreditsBalance: null,
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      ...initialState,

      setAddress: (address) => set({ address }),
      setConnected: (isConnected) => set({ isConnected }),
      setConnecting: (isConnecting) => set({ isConnecting }),
      setChainId: (chainId) => set({ chainId }),
      setCorrectNetwork: (isCorrectNetwork) => set({ isCorrectNetwork }),
      setBalance: (balance) => set({ balance }),
      setAGLBalance: (aglBalance) => set({ aglBalance }),
      setAGLCreditsBalance: (aglCreditsBalance) => set({ aglCreditsBalance }),

      setWalletState: (state) => set(state),
      reset: () => set(initialState),
    }),
    {
      name: 'wallet-store',
      storage: typeof window !== 'undefined' 
        ? {
            getItem: (name) => {
              const item = localStorage.getItem(name);
              return item ? JSON.parse(item) : null;
            },
            setItem: (name, value) => {
              localStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => {
              localStorage.removeItem(name);
            },
          }
        : undefined,
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId,
      }),
    }
  )
);
