'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { Loader2, AlertCircle } from 'lucide-react';
import { NETWORK_CONFIG } from '@/lib/config';

export default function ConnectModal() {
  const { isConnected, isConnecting, connect, isCorrectNetwork, isInitialized } = useWallet();
  const { activeModal, closeModal, addNotification } = useUIStore();

  if (isConnected && isCorrectNetwork) return null;
  if (activeModal !== 'connect-wallet' && !(!isConnected || !isCorrectNetwork)) return null;

  const handleConnect = async () => {
    try {
      await connect();
      closeModal();
      addNotification({
        type: 'success',
        message: 'Wallet connected successfully!',
      });
    } catch (error) {
      console.error('Connection failed:', error);
      addNotification({
        type: 'error',
        message: 'Failed to connect wallet. Make sure you have MetaMask or another Web3 wallet installed.',
      });
    }
  };

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <Loader2 size={20} className="animate-spin text-primary" />
            <span className="text-foreground">Initializing wallet...</span>
          </div>
        </div>
      </div>
    );
  }

  const showNetworkWarning = isConnected && !isCorrectNetwork;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {showNetworkWarning ? 'Wrong Network' : 'Connect Wallet'}
        </h2>
        
        {showNetworkWarning ? (
          <>
            <div className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">
                You&apos;re on the wrong network. Please switch to <strong>Base Mainnet</strong> (Chain ID: {NETWORK_CONFIG.chainId}).
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Got it
            </button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              Connect your Web3 wallet to start using AGL Super Agent. You&apos;ll need to be on <strong>Base Mainnet</strong>.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConnecting && <Loader2 size={20} className="animate-spin" />}
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </button>

              <button
                onClick={closeModal}
                className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              Don&apos;t have a wallet? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Install MetaMask</a> or another Web3 wallet to continue.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
