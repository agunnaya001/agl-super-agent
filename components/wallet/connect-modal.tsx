'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { useUIStore } from '@/lib/store/ui-store';
import { Loader2 } from 'lucide-react';

export default function ConnectModal() {
  const { isConnected, isConnecting, connect } = useWallet();
  const { activeModal, closeModal, addNotification } = useUIStore();

  if (!isConnected && activeModal !== 'connect-wallet') return null;

  const handleConnect = async () => {
    try {
      await connect();
      closeModal();
    } catch (error) {
      console.error('Connection failed:', error);
      addNotification({
        type: 'error',
        message: 'Failed to connect wallet. Make sure you have a Web3 wallet installed.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        <p className="text-muted-foreground mb-6">
          Connect your Web3 wallet to interact with AGL Super Agent. Make sure you&apos;re on Base
          Mainnet.
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
          Don&apos;t have a wallet? Install MetaMask or another Web3 wallet to continue.
        </p>
      </div>
    </div>
  );
}
