import { getAddress, isAddress } from 'ethers';
import { getAccount, connectWallet } from './provider';

/**
 * Validate and format address
 */
export function validateAddress(address: string): boolean {
  try {
    return isAddress(address);
  } catch {
    return false;
  }
}

/**
 * Get checksummed address
 */
export function getChecksummedAddress(address: string): string | null {
  try {
    return getAddress(address);
  } catch {
    return null;
  }
}

/**
 * Get short address (0x1234...5678)
 */
export function getShortAddress(address: string, chars = 4): string {
  const checksummed = getChecksummedAddress(address);
  if (!checksummed) return address;
  return `${checksummed.slice(0, chars + 2)}...${checksummed.slice(-chars)}`;
}

/**
 * Connect wallet and return connected account
 */
export async function connectUserWallet(): Promise<string | null> {
  try {
    const accounts = await connectWallet();
    return accounts[0] || null;
  } catch (error) {
    console.error('[Wallet] Failed to connect:', error);
    return null;
  }
}

/**
 * Get current connected account
 */
export async function getCurrentAccount(): Promise<string | null> {
  try {
    return await getAccount();
  } catch (error) {
    console.error('[Wallet] Failed to get current account:', error);
    return null;
  }
}

/**
 * Check if addresses are equal (case-insensitive)
 */
export function isAddressEqual(addr1: string, addr2: string): boolean {
  try {
    return getAddress(addr1) === getAddress(addr2);
  } catch {
    return false;
  }
}

/**
 * Wallet connection state type
 */
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isCorrectNetwork: boolean;
  chainId: number | null;
}

/**
 * Get wallet connection state
 */
export async function getWalletState(): Promise<WalletState> {
  try {
    const address = await getCurrentAccount();
    return {
      isConnected: !!address,
      address: address ? getAddress(address) : null,
      isCorrectNetwork: false, // This should be checked separately
      chainId: null, // This should be fetched from network info
    };
  } catch (error) {
    console.error('[Wallet] Failed to get wallet state:', error);
    return {
      isConnected: false,
      address: null,
      isCorrectNetwork: false,
      chainId: null,
    };
  }
}

/**
 * Check if address is valid ENS domain
 */
export function looksLikeENS(name: string): boolean {
  return name.endsWith('.eth');
}

/**
 * Check if wallet is connected
 */
export async function isWalletConnected(): Promise<boolean> {
  const account = await getCurrentAccount();
  return !!account;
}

/**
 * Listen for account changes
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): void {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    (window as any).ethereum.on('accountsChanged', callback);
  }
}

/**
 * Listen for chain changes
 */
export function onChainChanged(callback: (chainId: string) => void): void {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    (window as any).ethereum.on('chainChanged', callback);
  }
}

/**
 * Remove account change listener
 */
export function offAccountsChanged(callback: (accounts: string[]) => void): void {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    (window as any).ethereum.removeListener('accountsChanged', callback);
  }
}

/**
 * Remove chain change listener
 */
export function offChainChanged(callback: (chainId: string) => void): void {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    (window as any).ethereum.removeListener('chainChanged', callback);
  }
}
