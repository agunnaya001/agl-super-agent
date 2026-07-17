'use client';

import { useMemo } from 'react';
import { usePortfolioStore } from '@/lib/store/portfolio-store';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';

export default function PortfolioChart() {
  const { snapshots, selectedTimeframe, getSnapshotsByTimeframe } = usePortfolioStore();

  // Get filtered snapshots
  const chartData = useMemo(() => {
    const filtered = getSnapshotsByTimeframe(selectedTimeframe);
    return filtered.map((s) => ({
      timestamp: s.timestamp,
      date: new Date(s.timestamp * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      value: s.totalValue,
    }));
  }, [snapshots, selectedTimeframe, getSnapshotsByTimeframe]);

  if (chartData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No historical data yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Portfolio data will appear here as you make transactions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold text-foreground mb-4">Portfolio Value Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
            formatter={(value: any) => formatCurrency(value)}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
