import { useEffect, useState, useCallback } from 'react';
import * as AGLTokenService from '@/lib/blockchain/services/agl-token';
import * as AGLCreditsService from '@/lib/blockchain/services/agl-credits';

export function useAGLBalance(address: string | null, refreshInterval?: number) {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const bal = await AGLTokenService.getBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error('[useAGLBalance] Fetch failed:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetch();

    if (refreshInterval) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetch, refreshInterval]);

  return { balance, loading, error, refetch: fetch };
}

export function useAGLCreditsBalance(address: string | null, refreshInterval?: number) {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const bal = await AGLCreditsService.getBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error('[useAGLCreditsBalance] Fetch failed:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch credits'));
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetch();

    if (refreshInterval) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetch, refreshInterval]);

  return { balance, loading, error, refetch: fetch };
}

export function usePortfolio(address: string | null, refreshInterval = 30000) {
  const { balance: aglBalance, loading: aglLoading } = useAGLBalance(address, refreshInterval);
  const { balance: creditsBalance, loading: creditsLoading } = useAGLCreditsBalance(
    address,
    refreshInterval
  );

  return {
    aglBalance,
    creditsBalance,
    isLoading: aglLoading || creditsLoading,
  };
}
