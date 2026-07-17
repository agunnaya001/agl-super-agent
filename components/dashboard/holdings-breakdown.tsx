'use client';

import { useMemo } from 'react';
import { useWallet } from '@/lib/hooks/useWallet';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatting';

const COLORS = ['#0052ff', '#fbbf24'];

export default function HoldingsBreakdown() {
  const { aglBalance, aglCreditsBalance } = useWallet();

  const data = useMemo(() => {
    const aglValue = aglBalance ? parseFloat(aglBalance) * 0.5 : 0;
    const creditsValue = aglCreditsBalance ? parseFloat(aglCreditsBalance) * 0.25 : 0;
    const total = aglValue + creditsValue;

    if (total === 0) {
      return [];
    }

    return [
      {
        name: 'AGL Tokens',
        value: parseFloat((aglValue / total) * 100).toFixed(1),
        amount: aglValue,
      },
      {
        name: 'Credits',
        value: parseFloat((creditsValue / total) * 100).toFixed(1),
        amount: creditsValue,
      },
    ];
  }, [aglBalance, aglCreditsBalance]);

  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No holdings data</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your holdings will appear here once you have tokens
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold text-foreground mb-4">Holdings Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} (${value}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="text-sm">
              <p className="text-muted-foreground">{item.name}</p>
              <p className="text-foreground font-medium">{item.value}%</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(item.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
