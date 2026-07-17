/**
 * AGL Super Agent - Global Configuration
 * Centralized configuration for blockchain, API, and application settings
 */

// Network Configuration
export const NETWORK_CONFIG = {
  name: process.env.NEXT_PUBLIC_NETWORK_NAME || 'base',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '8453'),
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.base.org',
  blockExplorer: 'https://basescan.org',
} as const

// Smart Contract Addresses (Live on Base Mainnet)
export const CONTRACT_ADDRESSES = {
  aglToken: process.env.NEXT_PUBLIC_AGL_TOKEN_ADDRESS || '0xea1221b4d80a89bd8c75248fae7c176bd1854698',
  aglCredits: process.env.NEXT_PUBLIC_AGL_CREDITS_ADDRESS || '0x13866F31c60822Ff70684213b9727915Ddf2c183',
} as const

// Application Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'AGL Super Agent',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Blockchain-as-a-Service Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
} as const

// Theme Configuration
export const THEME_CONFIG = {
  primaryColor: process.env.NEXT_PUBLIC_THEME_COLOR || '#0052ff',
  darkModeDefault: process.env.NEXT_PUBLIC_THEME_DARK_MODE === 'true',
  colors: {
    primary: '#0052ff',
    secondary: '#0f0f23',
    accent: '#5b80ff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
} as const

// Wallet Configuration
export const WALLET_CONFIG = {
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  supportedWallets: ['MetaMask', 'Rainbow', 'Coinbase', 'WalletConnect'],
} as const

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retries: 3,
} as const

// Token Configuration
export const TOKEN_CONFIG = {
  aglToken: {
    name: 'AGL Token',
    symbol: 'AGL',
    decimals: 18,
    address: CONTRACT_ADDRESSES.aglToken,
  },
  aglCredits: {
    name: 'AGL Credits',
    symbol: 'AGLC',
    decimals: 18,
    address: CONTRACT_ADDRESSES.aglCredits,
  },
} as const

// Feature Flags
export const FEATURES = {
  enableAIChat: true,
  enableTransactionHistory: true,
  enablePortfolioAnalytics: true,
  enableDarkMode: true,
  enableMultiWallet: true,
} as const

// Logging Configuration
export const LOG_CONFIG = {
  level: process.env.LOG_LEVEL || 'info',
  debug: process.env.DEBUG === 'true',
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  enabled: true,
  ttl: 300, // 5 minutes in seconds
  redisUrl: process.env.REDIS_URL,
} as const

// Validation Constants
export const VALIDATION = {
  minTransactionAmount: '0.001',
  maxTransactionAmount: '1000000',
  addressRegex: /^0x[a-fA-F0-9]{40}$/,
  txHashRegex: /^0x[a-fA-F0-9]{64}$/,
} as const

// Rate Limiting
export const RATE_LIMIT = {
  enabled: true,
  requests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
} as const

// Export type for configuration
export type AppConfig = typeof APP_CONFIG
export type NetworkConfig = typeof NETWORK_CONFIG
export type ThemeConfig = typeof THEME_CONFIG
export type ContractAddresses = typeof CONTRACT_ADDRESSES
