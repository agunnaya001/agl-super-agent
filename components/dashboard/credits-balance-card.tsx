'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { Gift, ExternalLink } from 'lucide-react';
import { formatNumber } from '@/lib/utils/formatting';
import { TOKEN_CONFIG, NETWORK_CONFIG } from '@/lib/config';

interface CreditsBalanceCardProps {
  onBurnClick?: () => void;
}

export default function CreditsBalanceCard({ onBurnClick }: CreditsBalanceCardProps) {
  const { aglCreditsBalance, address, isConnected } = useWallet();

  const creditsBalance = aglCreditsBalance ? parseFloat(aglCreditsBalance) : 0;

  const explorerUrl = `${NETWORK_CONFIG.blockExplorer}/token/${TOKEN_CONFIG.aglCredits.address}`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Gift size={24} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{TOKEN_CONFIG.aglCredits.name}</h3>
            <p className="text-sm text-muted-foreground">{TOKEN_CONFIG.aglCredits.symbol}</p>
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
          <p className="text-sm text-muted-foreground mb-1">Credits Balance</p>
          {isConnected ? (
            <>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(creditsBalance, 2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Earned from token conversions
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
              {TOKEN_CONFIG.aglCredits.address}
            </code>
          </div>
        )}

        {onBurnClick && (
          <button
            onClick={onBurnClick}
            className="w-full mt-4 px-4 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg font-medium hover:bg-amber-500/20 transition border border-amber-500/20"
          >
            Convert from AGL
          </button>
        )}
      </div>
    </div>
  );
}
