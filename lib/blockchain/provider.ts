import { JsonRpcProvider, BrowserProvider, Signer } from 'ethers';
import { AppConfig } from '@/lib/config';

let provider: JsonRpcProvider | null = null;
let browserProvider: BrowserProvider | null = null;

/**
 * Get the JSON-RPC provider for Base Mainnet
 */
export function getProvider(): JsonRpcProvider {
  if (!provider) {
    provider = new JsonRpcProvider(AppConfig.rpcUrl, {
      name: AppConfig.networkName,
      chainId: AppConfig.chainId,
    });
  }
  return provider;
}

/**
 * Get the browser provider (ethers.js Web3Provider wrapper)
 * For client-side wallet interactions (MetaMask, etc.)
 */
export function getBrowserProvider(): BrowserProvider | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window.ethereum) {
    console.warn('[Blockchain] No Web3 provider detected');
    return null;
  }

  if (!browserProvider) {
    browserProvider = new BrowserProvider(window.ethereum);
  }

  return browserProvider;
}

/**
 * Get signer from connected wallet
 */
export async function getSigner(): Promise<Signer | null> {
  const provider = getBrowserProvider();
  if (!provider) return null;

  try {
    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error('[Blockchain] Failed to get signer:', error);
    return null;
  }
}

/**
 * Get account address from connected wallet
 */
export async function getAccount(): Promise<string | null> {
  const provider = getBrowserProvider();
  if (!provider) return null;

  try {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error('[Blockchain] Failed to get account:', error);
    return null;
  }
}

/**
 * Check if Web3 provider is available
 */
export function hasWeb3Provider(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.ethereum);
}

/**
 * Connect to wallet
 */
export async function connectWallet(): Promise<string[]> {
  if (!window.ethereum) {
    throw new Error('No Web3 provider found. Please install MetaMask or another wallet.');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as string[];

    return accounts;
  } catch (error) {
    console.error('[Blockchain] Failed to connect wallet:', error);
    throw error;
  }
}

/**
 * Watch for account changes
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): () => void {
  if (!window.ethereum) {
    return () => {};
  }

  const handler = (accounts: string[]) => {
    callback(accounts);
  };

  window.ethereum.on('accountsChanged', handler);

  return () => {
    window.ethereum?.removeListener('accountsChanged', handler);
  };
}

/**
 * Watch for chain changes
 */
export function onChainChanged(callback: (chainId: string) => void): () => void {
  if (!window.ethereum) {
    return () => {};
  }

  const handler = (chainId: string) => {
    callback(chainId);
  };

  window.ethereum.on('chainIdChanged', handler);

  return () => {
    window.ethereum?.removeListener('chainIdChanged', handler);
  };
}

/**
 * Get connected network info
 */
export async function getNetworkInfo() {
  const provider = getBrowserProvider();
  if (!provider) return null;

  try {
    const network = await provider.getNetwork();
    return {
      chainId: network.chainId,
      name: network.name,
    };
  } catch (error) {
    console.error('[Blockchain] Failed to get network info:', error);
    return null;
  }
}

/**
 * Check if connected to correct network (Base Mainnet)
 */
export async function isCorrectNetwork(): Promise<boolean> {
  const networkInfo = await getNetworkInfo();
  return networkInfo?.chainId === AppConfig.chainId;
}

/**
 * Get gas price
 */
export async function getGasPrice() {
  const provider = getProvider();
  try {
    const feeData = await provider.getFeeData();
    return {
      gasPrice: feeData.gasPrice?.toString(),
      maxFeePerGas: feeData.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
    };
  } catch (error) {
    console.error('[Blockchain] Failed to get gas price:', error);
    return null;
  }
}

/**
 * Estimate gas for a transaction
 */
export async function estimateGas(params: {
  to: string;
  data?: string;
  value?: string;
}) {
  const provider = getProvider();
  try {
    const gasEstimate = await provider.estimateGas({
      to: params.to,
      data: params.data,
      value: params.value,
    });
    return gasEstimate.toString();
  } catch (error) {
    console.error('[Blockchain] Failed to estimate gas:', error);
    return null;
  }
}

/**
 * Get balance of address
 */
export async function getBalance(address: string) {
  const provider = getProvider();
  try {
    const balance = await provider.getBalance(address);
    return balance.toString();
  } catch (error) {
    console.error('[Blockchain] Failed to get balance:', error);
    return null;
  }
}

/**
 * Get transaction receipt
 */
export async function getTransactionReceipt(txHash: string) {
  const provider = getProvider();
  try {
    const receipt = await provider.getTransactionReceipt(txHash);
    return receipt;
  } catch (error) {
    console.error('[Blockchain] Failed to get transaction receipt:', error);
    return null;
  }
}

/**
 * Wait for transaction to be mined
 */
export async function waitForTransaction(txHash: string, confirmations = 1) {
  const provider = getProvider();
  try {
    const receipt = await provider.waitForTransaction(txHash, confirmations);
    return receipt;
  } catch (error) {
    console.error('[Blockchain] Failed to wait for transaction:', error);
    return null;
  }
}
