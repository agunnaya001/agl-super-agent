import { getProvider, waitForTransaction, getTransactionReceipt } from '../provider';
import { TransactionStatus, TransactionType } from '@/lib/types';

export interface TransactionData {
  hash: string;
  from?: string;
  to: string;
  value?: string;
  data?: string;
  gasPrice?: string;
  gasLimit?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  blockNumber?: number;
  timestamp?: number;
  description?: string;
}

/**
 * Track transaction
 */
export async function trackTransaction(txHash: string, description?: string) {
  const provider = getProvider();

  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) throw new Error('Transaction not found');

    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value?.toString(),
      data: tx.data,
      gasPrice: tx.gasPrice?.toString(),
      gasLimit: tx.gasLimit?.toString(),
      blockNumber: tx.blockNumber,
      description,
      status: tx.blockNumber ? TransactionStatus.CONFIRMED : TransactionStatus.PENDING,
    };
  } catch (error) {
    console.error('[Transaction] Failed to track transaction:', error);
    throw error;
  }
}

/**
 * Wait for transaction to be confirmed
 */
export async function waitForConfirmation(txHash: string, confirmations = 1) {
  try {
    const receipt = await waitForTransaction(txHash, confirmations);
    return {
      hash: receipt?.hash,
      blockNumber: receipt?.blockNumber,
      status: receipt?.status === 1 ? TransactionStatus.CONFIRMED : TransactionStatus.FAILED,
      gasUsed: receipt?.gasUsed?.toString(),
      cumulativeGasUsed: receipt?.cumulativeGasUsed?.toString(),
      confirmations: receipt?.confirmations,
    };
  } catch (error) {
    console.error('[Transaction] Failed to wait for confirmation:', error);
    throw error;
  }
}

/**
 * Get transaction receipt
 */
export async function getReceipt(txHash: string) {
  try {
    const receipt = await getTransactionReceipt(txHash);
    if (!receipt) return null;

    return {
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
      from: receipt.from,
      to: receipt.to,
      gasUsed: receipt.gasUsed?.toString(),
      cumulativeGasUsed: receipt.cumulativeGasUsed?.toString(),
      contractAddress: receipt.contractAddress,
      status: receipt.status === 1 ? 'success' : 'failed',
      type: receipt.type,
      transactionHash: receipt.transactionHash,
      transactionIndex: receipt.transactionIndex,
      logs: receipt.logs,
    };
  } catch (error) {
    console.error('[Transaction] Failed to get receipt:', error);
    return null;
  }
}

/**
 * Parse transaction from hash
 */
export async function parseTransaction(txHash: string) {
  const provider = getProvider();

  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) return null;

    const receipt = await getReceipt(txHash);

    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value?.toString(),
      data: tx.data,
      gasPrice: tx.gasPrice?.toString(),
      gasLimit: tx.gasLimit?.toString(),
      maxFeePerGas: tx.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString(),
      nonce: tx.nonce,
      blockNumber: tx.blockNumber,
      transactionIndex: tx.index,
      receipt,
      isConfirmed: !!tx.blockNumber,
      isPending: !tx.blockNumber,
    };
  } catch (error) {
    console.error('[Transaction] Failed to parse transaction:', error);
    return null;
  }
}

/**
 * Calculate transaction cost
 */
export async function calculateTransactionCost(txHash: string) {
  try {
    const receipt = await getReceipt(txHash);
    if (!receipt) return null;

    const provider = getProvider();
    const tx = await provider.getTransaction(txHash);
    if (!tx) return null;

    const gasUsed = receipt.gasUsed ? BigInt(receipt.gasUsed) : BigInt(0);
    const gasPrice = tx.gasPrice || BigInt(0);
    const totalCost = gasUsed * gasPrice;

    return {
      gasUsed: receipt.gasUsed,
      gasPrice: tx.gasPrice?.toString(),
      totalCost: totalCost.toString(),
    };
  } catch (error) {
    console.error('[Transaction] Failed to calculate transaction cost:', error);
    return null;
  }
}

/**
 * Estimate transaction cost
 */
export async function estimateTransactionCost(gasLimit: string, gasPrice: string) {
  try {
    const gas = BigInt(gasLimit);
    const price = BigInt(gasPrice);
    const cost = gas * price;
    return cost.toString();
  } catch (error) {
    console.error('[Transaction] Failed to estimate transaction cost:', error);
    return null;
  }
}

/**
 * Check if transaction is successful
 */
export async function isTransactionSuccessful(txHash: string): Promise<boolean> {
  try {
    const receipt = await getReceipt(txHash);
    return receipt?.status === 'success';
  } catch (error) {
    console.error('[Transaction] Failed to check transaction status:', error);
    return false;
  }
}

/**
 * Check if transaction is failed
 */
export async function isTransactionFailed(txHash: string): Promise<boolean> {
  try {
    const receipt = await getReceipt(txHash);
    return receipt?.status === 'failed';
  } catch (error) {
    console.error('[Transaction] Failed to check transaction status:', error);
    return false;
  }
}
