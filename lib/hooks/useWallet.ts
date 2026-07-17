import { useEffect, useState, useCallback } from 'react';
import { useWalletStore } from '@/lib/store/wallet-store';
import { useUIStore } from '@/lib/store/ui-store';
import {
  connectUserWallet,
  getCurrentAccount,
  onAccountsChanged,
  onChainChanged,
  isWalletConnected,
} from '@/lib/blockchain/wallet';
import { getNetworkInfo, isCorrectNetwork } from '@/lib/blockchain/provider';
import * as AGLTokenService from '@/lib/blockchain/services/agl-token';
import * as AGLCreditsService from '@/lib/blockchain/services/agl-credits';

export function useWallet() {
  const {
    address,
    isConnected,
    isConnecting,
    chainId,
    isCorrectNetwork: isNetworkCorrect,
    balance,
    aglBalance,
    aglCreditsBalance,
    setAddress,
    setConnected,
    setConnecting,
    setChainId,
    setCorrectNetwork,
    setBalance,
    setAGLBalance,
    setAGLCreditsBalance,
    reset,
  } = useWalletStore();

  const { addNotification } = useUIStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setConnecting(true);
      const account = await connectUserWallet();
      if (account) {
        setAddress(account);
        setConnected(true);
        addNotification({
          type: 'success',
          message: 'Wallet connected successfully',
        });
        await updateBalances(account);
      }
    } catch (error) {
      console.error('[useWallet] Connection failed:', error);
      addNotification({
        type: 'error',
        message: 'Failed to connect wallet',
      });
    } finally {
      setConnecting(false);
    }
  }, [setConnecting, setAddress, setConnected, addNotification]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    reset();
    addNotification({
      type: 'info',
      message: 'Wallet disconnected',
    });
  }, [reset, addNotification]);

  // Update balances
  const updateBalances = useCallback(
    async (account: string) => {
      try {
        const [aglBal, creditsBal] = await Promise.all([
          AGLTokenService.getBalance(account),
          AGLCreditsService.getBalance(account),
        ]);
        setAGLBalance(aglBal);
        setAGLCreditsBalance(creditsBal);
      } catch (error) {
        console.error('[useWallet] Failed to update balances:', error);
      }
    },
    [setAGLBalance, setAGLCreditsBalance]
  );

  // Initialize wallet on mount
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const connected = await isWalletConnected();
        if (connected) {
          const account = await getCurrentAccount();
          if (account) {
            setAddress(account);
            setConnected(true);

            // Get network info
            const networkInfo = await getNetworkInfo();
            if (networkInfo) {
              setChainId(networkInfo.chainId);
            }

            // Check if correct network
            const correct = await isCorrectNetwork();
            setCorrectNetwork(correct);

            await updateBalances(account);
          }
        }
      } catch (error) {
        console.error('[useWallet] Initialization failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeWallet();
  }, [setAddress, setConnected, setChainId, setCorrectNetwork, updateBalances]);

  // Listen for account changes
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setAddress(accounts[0]);
        updateBalances(accounts[0]);
      }
    });

    return unsubscribe;
  }, [isInitialized, setAddress, disconnect, updateBalances]);

  // Listen for chain changes
  useEffect(() => {
    if (!isInitialized) return;

    const unsubscribe = onChainChanged((chainId) => {
      const newChainId = parseInt(chainId, 16);
      setChainId(newChainId);
      setCorrectNetwork(false); // Will be rechecked
    });

    return unsubscribe;
  }, [isInitialized, setChainId, setCorrectNetwork]);

  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    isCorrectNetwork: isNetworkCorrect,
    balance,
    aglBalance,
    aglCreditsBalance,
    connect,
    disconnect,
    updateBalances: () => {
      if (address) updateBalances(address);
    },
    isInitialized,
  };
}
