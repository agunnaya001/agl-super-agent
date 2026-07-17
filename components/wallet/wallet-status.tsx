'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { getShortAddress } from '@/lib/blockchain/wallet';
import { Check, AlertCircle } from 'lucide-react';

interface WalletStatusProps {
  showBalance?: boolean;
  compact?: boolean;
}

export default function WalletStatus({ showBalance = true, compact = false }: WalletStatusProps) {
  const { address, isConnected, isCorrectNetwork, aglBalance, chainId } = useWallet();

  if (!isConnected || !address) {
    return null;
  }

  const networkStatusIcon = isCorrectNetwork ? (
    <Check size={16} className="text-success" />
  ) : (
    <AlertCircle size={16} className="text-warning" />
  );

  const networkName = isCorrectNetwork ? 'Base Mainnet' : 'Wrong Network';

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="font-mono">{getShortAddress(address)}</span>
        {!isCorrectNetwork && (
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-warning/10 text-warning text-xs">
            <AlertCircle size={12} />
            Wrong Network
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {getShortAddress(address)}
          </span>
          {networkStatusIcon}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{networkName}</span>
          {chainId && <span className="text-foreground opacity-60">Chain {chainId}</span>}
        </div>
      </div>

      {showBalance && aglBalance && (
        <div className="flex flex-col gap-1 text-right ml-4 pl-4 border-l border-border">
          <div className="text-sm font-medium text-foreground">
            {parseFloat(aglBalance).toFixed(2)} AGL
          </div>
          <div className="text-xs text-muted-foreground">Token Balance</div>
        </div>
      )}
    </div>
  );
}
