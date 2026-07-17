import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioSnapshot {
  timestamp: number;
  totalValue: number; // in USD
  aglBalance: number;
  creditsBalance: number;
}

interface PortfolioStore {
  // Historical data
  snapshots: PortfolioSnapshot[];
  addSnapshot: (snapshot: PortfolioSnapshot) => void;
  clearSnapshots: () => void;
  getSnapshotsByTimeframe: (days: number) => PortfolioSnapshot[];

  // Date range filter
  selectedTimeframe: 7 | 30 | 90;
  setTimeframe: (timeframe: 7 | 30 | 90) => void;

  // Portfolio data
  currentValue: number;
  previousValue: number;
  setCurrentValue: (value: number) => void;
  setPreviousValue: (value: number) => void;

  // Selectors
  getValueChange: () => number;
  getValueChangePercent: () => number;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      snapshots: [],
      addSnapshot: (snapshot) =>
        set((state) => ({
          snapshots: [...state.snapshots, snapshot].slice(-1000), // Keep last 1000 snapshots
        })),
      clearSnapshots: () => set({ snapshots: [] }),
      getSnapshotsByTimeframe: (days) => {
        const snapshots = get().snapshots;
        const cutoffTime = Math.floor(Date.now() / 1000) - days * 24 * 60 * 60;
        return snapshots.filter((s) => s.timestamp >= cutoffTime);
      },

      selectedTimeframe: 7,
      setTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),

      currentValue: 0,
      previousValue: 0,
      setCurrentValue: (value) => set({ currentValue: value }),
      setPreviousValue: (value) => set({ previousValue: value }),

      getValueChange: () => {
        const state = get();
        return state.currentValue - state.previousValue;
      },
      getValueChangePercent: () => {
        const state = get();
        if (state.previousValue === 0) return 0;
        return (state.getValueChange() / state.previousValue) * 100;
      },
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({
        snapshots: state.snapshots,
        selectedTimeframe: state.selectedTimeframe,
        currentValue: state.currentValue,
        previousValue: state.previousValue,
      }),
    }
  )
);
