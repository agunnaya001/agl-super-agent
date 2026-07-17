import { Contract, parseEther, formatEther } from 'ethers';
import { getProvider, getSigner } from '../provider';
import { AGL_TOKEN_ABI } from '../abis/agl-token';
import { CONTRACT_ADDRESSES } from '@/lib/config';

/**
 * Get AGL Token contract instance (read-only)
 */
export function getAGLTokenContract() {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESSES.aglToken, AGL_TOKEN_ABI, provider);
}

/**
 * Get AGL Token contract with signer (for transactions)
 */
export async function getAGLTokenContractWithSigner() {
  const provider = getProvider();
  const signer = await getSigner();
  if (!signer) throw new Error('No signer available');
  return new Contract(AppConfig.contracts.aglToken, AGL_TOKEN_ABI, signer);
}

/**
 * Get token metadata
 */
export async function getTokenMetadata() {
  const contract = getAGLTokenContract();
  try {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
    ]);

    return {
      name,
      symbol,
      decimals,
      totalSupply: formatEther(totalSupply),
    };
  } catch (error) {
    console.error('[AGLToken] Failed to get token metadata:', error);
    throw error;
  }
}

/**
 * Get balance of address
 */
export async function getBalance(address: string): Promise<string> {
  const contract = getAGLTokenContract();
  try {
    const balance = await contract.balanceOf(address);
    return formatEther(balance);
  } catch (error) {
    console.error('[AGLToken] Failed to get balance:', error);
    throw error;
  }
}

/**
 * Get total supply
 */
export async function getTotalSupply(): Promise<string> {
  const contract = getAGLTokenContract();
  try {
    const totalSupply = await contract.totalSupply();
    return formatEther(totalSupply);
  } catch (error) {
    console.error('[AGLToken] Failed to get total supply:', error);
    throw error;
  }
}

/**
 * Get allowance for spender
 */
export async function getAllowance(owner: string, spender: string): Promise<string> {
  const contract = getAGLTokenContract();
  try {
    const allowance = await contract.allowance(owner, spender);
    return formatEther(allowance);
  } catch (error) {
    console.error('[AGLToken] Failed to get allowance:', error);
    throw error;
  }
}

/**
 * Transfer tokens
 */
export async function transfer(to: string, amount: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.transfer(to, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] Transfer failed:', error);
    throw error;
  }
}

/**
 * Approve tokens for spending
 */
export async function approve(spender: string, amount: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.approve(spender, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] Approve failed:', error);
    throw error;
  }
}

/**
 * Transfer from one address to another
 */
export async function transferFrom(from: string, to: string, amount: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.transferFrom(from, to, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] TransferFrom failed:', error);
    throw error;
  }
}

/**
 * Approve unlimited amount
 */
export async function approveUnlimited(spender: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const tx = await contract.approve(spender, MAX_UINT256);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] Approve unlimited failed:', error);
    throw error;
  }
}

/**
 * Increase allowance
 */
export async function increaseAllowance(spender: string, amount: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.increaseAllowance(spender, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] Increase allowance failed:', error);
    throw error;
  }
}

/**
 * Decrease allowance
 */
export async function decreaseAllowance(spender: string, amount: string) {
  const contract = await getAGLTokenContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.decreaseAllowance(spender, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLToken] Decrease allowance failed:', error);
    throw error;
  }
}
