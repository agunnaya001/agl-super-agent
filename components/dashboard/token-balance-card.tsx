'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { Coins, ExternalLink } from 'lucide-react';
import { formatNumber } from '@/lib/utils/formatting';
import { TOKEN_CONFIG, NETWORK_CONFIG } from '@/lib/config';

interface TokenBalanceCardProps {
  onTransferClick?: () => void;
}

export default function TokenBalanceCard({ onTransferClick }: TokenBalanceCardProps) {
  const { aglBalance, address, isConnected } = useWallet();

  const tokenBalance = aglBalance ? parseFloat(aglBalance) : 0;
  const tokenValueUSD = tokenBalance * 0.5;

  const explorerUrl = `${NETWORK_CONFIG.blockExplorer}/token/${TOKEN_CONFIG.aglToken.address}`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Coins size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{TOKEN_CONFIG.aglToken.name}</h3>
            <p className="text-sm text-muted-foreground">{TOKEN_CONFIG.aglToken.symbol}</p>
          </div>
        </div>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-secondary rounded-lg transition"
          title="View on Block Explorer"
        >
          <ExternalLink size={18} className="text-muted-foreground hover:text-foreground" />
        </a>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Token Balance</p>
          {isConnected ? (
            <>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(tokenBalance, 4)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ≈ ${formatNumber(tokenValueUSD, 2)}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">Connect wallet to view balance</p>
          )}
        </div>

        {address && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
            <code className="text-xs bg-secondary/50 px-2 py-1 rounded break-all">
              {TOKEN_CONFIG.aglToken.address}
            </code>
          </div>
        )}

        {isConnected && onTransferClick && (
          <button
            onClick={onTransferClick}
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            Transfer Tokens
          </button>
        )}
      </div>
    </div>
  );
}
