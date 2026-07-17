import { Contract, parseEther, formatEther } from 'ethers';
import { getProvider, getSigner } from '../provider';
import { AGL_CREDITS_ABI } from '../abis/agl-credits';
import { AppConfig } from '@/lib/config';

/**
 * Get AGLCredits contract instance (read-only)
 */
export function getAGLCreditsContract() {
  const provider = getProvider();
  return new Contract(AppConfig.contracts.aglCredits, AGL_CREDITS_ABI, provider);
}

/**
 * Get AGLCredits contract with signer (for transactions)
 */
export async function getAGLCreditsContractWithSigner() {
  const provider = getProvider();
  const signer = await getSigner();
  if (!signer) throw new Error('No signer available');
  return new Contract(AppConfig.contracts.aglCredits, AGL_CREDITS_ABI, signer);
}

/**
 * Get credits metadata
 */
export async function getCreditsMetadata() {
  const contract = getAGLCreditsContract();
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
    console.error('[AGLCredits] Failed to get metadata:', error);
    throw error;
  }
}

/**
 * Get balance of credits for address
 */
export async function getBalance(address: string): Promise<string> {
  const contract = getAGLCreditsContract();
  try {
    const balance = await contract.balanceOf(address);
    return formatEther(balance);
  } catch (error) {
    console.error('[AGLCredits] Failed to get balance:', error);
    throw error;
  }
}

/**
 * Get total supply of credits
 */
export async function getTotalSupply(): Promise<string> {
  const contract = getAGLCreditsContract();
  try {
    const totalSupply = await contract.totalSupply();
    return formatEther(totalSupply);
  } catch (error) {
    console.error('[AGLCredits] Failed to get total supply:', error);
    throw error;
  }
}

/**
 * Get credits per token ratio
 */
export async function getCreditsPerToken(): Promise<number> {
  const contract = getAGLCreditsContract();
  try {
    const ratio = await contract.getCreditsPerToken();
    return Number(formatEther(ratio));
  } catch (error) {
    console.error('[AGLCredits] Failed to get credits per token:', error);
    return 0;
  }
}

/**
 * Check if address is approved minter
 */
export async function isApprovedMinter(address: string): Promise<boolean> {
  const contract = getAGLCreditsContract();
  try {
    return await contract.isApprovedMinter(address);
  } catch (error) {
    console.error('[AGLCredits] Failed to check approved minter:', error);
    return false;
  }
}

/**
 * Burn credits (only owner)
 */
export async function burn(amount: string) {
  const contract = await getAGLCreditsContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.burn(parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLCredits] Burn failed:', error);
    throw error;
  }
}

/**
 * Burn credits from address (with approval)
 */
export async function burnFrom(account: string, amount: string) {
  const contract = await getAGLCreditsContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.burnFrom(account, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLCredits] BurnFrom failed:', error);
    throw error;
  }
}

/**
 * Mint credits for address (approved minters only)
 */
export async function mintCredits(to: string, amount: string) {
  const contract = await getAGLCreditsContractWithSigner();
  try {
    const parsedAmount = parseEther(amount);
    const tx = await contract.mintCredits(to, parsedAmount);
    return tx.hash;
  } catch (error) {
    console.error('[AGLCredits] MintCredits failed:', error);
    throw error;
  }
}

/**
 * Calculate credits from token amount
 */
export async function calculateCreditsFromTokens(tokenAmount: string): Promise<string> {
  try {
    const creditsPerToken = await getCreditsPerToken();
    const credits = parseFloat(tokenAmount) * creditsPerToken;
    return credits.toString();
  } catch (error) {
    console.error('[AGLCredits] Failed to calculate credits:', error);
    throw error;
  }
}

/**
 * Calculate tokens needed for credits
 */
export async function calculateTokensForCredits(creditsAmount: string): Promise<string> {
  try {
    const creditsPerToken = await getCreditsPerToken();
    if (creditsPerToken === 0) throw new Error('Credits per token is 0');
    const tokens = parseFloat(creditsAmount) / creditsPerToken;
    return tokens.toString();
  } catch (error) {
    console.error('[AGLCredits] Failed to calculate tokens:', error);
    throw error;
  }
}
