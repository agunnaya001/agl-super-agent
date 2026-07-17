/**
 * Application Constants
 * Shared constants used throughout the application
 */

// Network Constants
export const NETWORKS = {
  BASE: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
} as const

// Token Decimals
export const TOKEN_DECIMALS = {
  AGL: 18,
  AGLC: 18,
  ETH: 18,
} as const

// Gas Limits
export const GAS_LIMITS = {
  BASIC_TRANSFER: 21000n,
  ERC20_TRANSFER: 65000n,
  ERC20_APPROVE: 45000n,
  BURN: 80000n,
  MINT: 100000n,
} as const

// Transaction Status
export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Transaction Types
export enum TransactionType {
  TRANSFER = 'transfer',
  APPROVE = 'approve',
  BURN = 'burn',
  MINT = 'mint',
  SWAP = 'swap',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

// UI States
export enum UIState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// Modal Types
export enum ModalType {
  WALLET_CONNECT = 'wallet-connect',
  TRANSACTION_CONFIRM = 'transaction-confirm',
  TRANSACTION_DETAILS = 'transaction-details',
  SETTINGS = 'settings',
  ALERT = 'alert',
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    CHECK: '/auth/check',
    LOGOUT: '/auth/logout',
  },
  WALLET: {
    BALANCE: '/wallet/balance',
    INFO: '/wallet/info',
  },
  CONTRACTS: {
    TRANSFER: '/contracts/transfer',
    BURN_AGL: '/contracts/burn-agl',
    BALANCE: '/contracts/balance',
  },
  CHAT: {
    MESSAGE: '/chat',
    HISTORY: '/chat/history',
  },
  TRANSACTIONS: {
    HISTORY: '/transactions/history',
    TRACK: '/transactions/track',
  },
} as const

// Cache Keys
export const CACHE_KEYS = {
  WALLET_BALANCE: 'wallet_balance',
  AGL_BALANCE: 'agl_balance',
  CREDITS_BALANCE: 'credits_balance',
  TRANSACTION_HISTORY: 'transaction_history',
  USER_PREFERENCES: 'user_preferences',
  CONTRACT_INFO: 'contract_info',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme-preference',
  WALLET_ADDRESS: 'wallet-address',
  CONNECTED_WALLET: 'connected-wallet',
  USER_PREFERENCES: 'user-preferences',
  TRANSACTION_HISTORY: 'transaction-history',
  CHAT_HISTORY: 'chat-history',
  FIRST_TIME_USER: 'first-time-user',
} as const

// Notification Types
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// Notification Messages
export const MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  WALLET_DISCONNECTED: 'Wallet disconnected',
  TRANSACTION_SENT: 'Transaction sent',
  TRANSACTION_CONFIRMED: 'Transaction confirmed',
  TRANSACTION_FAILED: 'Transaction failed',
  COPY_SUCCESS: 'Copied to clipboard',
  COPY_FAILED: 'Failed to copy',
  THEME_CHANGED: 'Theme changed',
  SETTINGS_SAVED: 'Settings saved',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  WALLET_NOT_CONNECTED: 'Please connect your wallet',
  INVALID_ADDRESS: 'Invalid Ethereum address',
  INVALID_AMOUNT: 'Invalid amount',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  TRANSACTION_FAILED: 'Transaction failed',
  GAS_ESTIMATION_FAILED: 'Gas estimation failed',
  USER_REJECTED: 'Transaction rejected by user',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const

// Wallet Names
export const WALLET_NAMES = {
  METAMASK: 'MetaMask',
  RAINBOW: 'Rainbow',
  COINBASE: 'Coinbase',
  WALLET_CONNECT: 'WalletConnect',
} as const

// Date/Time Constants
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const

// Default Timeouts
export const TIMEOUTS = {
  TRANSACTION_CHECK: 5000, // 5 seconds
  API_REQUEST: 30000, // 30 seconds
  MODAL_CLOSE: 300, // 300ms
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const

// Features
export const FEATURES = {
  AI_CHAT_ENABLED: true,
  TRANSACTION_HISTORY_ENABLED: true,
  PORTFOLIO_ANALYTICS_ENABLED: true,
  MULTI_WALLET_SUPPORT: true,
  DARK_MODE_ENABLED: true,
} as const

// Animation Durations
export const DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// Z-index Stacking
export const Z_INDEX = {
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  TOAST: 60,
  TOOLTIP: 70,
} as const

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// Regular Expressions
export const REGEX = {
  ETHEREUM_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  TX_HASH: /^0x[a-fA-F0-9]{64}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  DECIMAL: /^\d+(\.\d+)?$/,
  HEX_COLOR: /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/,
} as const

export default {
  NETWORKS,
  TOKEN_DECIMALS,
  GAS_LIMITS,
  TransactionStatus,
  TransactionType,
  UIState,
  ModalType,
  API_ENDPOINTS,
  CACHE_KEYS,
  STORAGE_KEYS,
  NotificationType,
  MESSAGES,
  ERROR_MESSAGES,
  WALLET_NAMES,
  TIME_CONSTANTS,
  TIMEOUTS,
  PAGINATION,
  FEATURES,
  DURATIONS,
  Z_INDEX,
  BREAKPOINTS,
  REGEX,
}
