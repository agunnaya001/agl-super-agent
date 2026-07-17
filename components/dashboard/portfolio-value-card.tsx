'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { usePortfolioStore } from '@/lib/store/portfolio-store';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils/formatting';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioValueCard() {
  const { aglBalance, aglCreditsBalance } = useWallet();
  const { currentValue, getValueChange, getValueChangePercent } = usePortfolioStore();

  // Calculate portfolio value
  const aglValue = aglBalance ? parseFloat(aglBalance) * 0.5 : 0; // $0.50 per AGL
  const creditsValue = aglCreditsBalance ? parseFloat(aglCreditsBalance) * 0.25 : 0; // $0.25 per credit
  const totalValue = aglValue + creditsValue;

  const changeAmount = getValueChange();
  const changePercent = getValueChangePercent();
  const isPositive = changeAmount >= 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Portfolio Value</h3>

      <div className="space-y-4">
        {/* Total Value */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          <p className="text-4xl font-bold text-foreground">
            {formatCurrency(totalValue)}
          </p>
        </div>

        {/* Change */}
        <div className="flex items-center gap-4 pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp size={20} className="text-success" />
            ) : (
              <TrendingDown size={20} className="text-destructive" />
            )}
            <div>
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p
                className={`text-lg font-semibold ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}
              >
                {formatCurrency(Math.abs(changeAmount))}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Percentage</p>
            <p
              className={`text-lg font-semibold ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              {formatPercent(changePercent / 100, 2, true)}
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">AGL Tokens</span>
            <span className="text-foreground font-medium">{formatCurrency(aglValue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Credits</span>
            <span className="text-foreground font-medium">{formatCurrency(creditsValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
