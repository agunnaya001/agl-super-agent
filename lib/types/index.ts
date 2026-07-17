/**
 * Global TypeScript Type Definitions
 * Shared types used throughout the application
 */

import { TransactionStatus, TransactionType, UIState, ModalType } from '@/lib/utils/constants'

// Wallet Types
export interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balance: string
  provider: unknown
}

export interface WalletInfo {
  address: string
  ens?: string
  balance: string
  chainId: number
}

// Token Types
export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoUrl?: string
}

export interface TokenBalance {
  token: Token
  balance: string
  usdValue?: string
  percentage?: number
}

export interface Portfolio {
  address: string
  totalValue: string
  tokens: TokenBalance[]
  lastUpdated: number
}

// Transaction Types
export interface Transaction {
  id: string
  hash: string
  from: string
  to: string
  value: string
  type: TransactionType
  status: TransactionStatus
  timestamp: number
  blockNumber?: number
  gasUsed?: string
  gasPrice?: string
  tokenSymbol?: string
}

export interface TransactionParams {
  to: string
  value: string
  gasLimit?: string
  gasPrice?: string
  data?: string
  nonce?: number
}

export interface TransactionReceipt {
  transactionHash: string
  blockNumber: number
  blockHash: string
  gasUsed: string
  cumulativeGasUsed: string
  status: 0 | 1
  from: string
  to: string
  contractAddress?: string
  logs: unknown[]
  logsBloom: string
}

// Contract Types
export interface ContractInfo {
  address: string
  symbol: string
  name: string
  decimals: number
  totalSupply: string
  owner?: string
}

export interface AGLTokenInfo extends ContractInfo {
  circulatingSupply: string
}

export interface AGLCreditsInfo extends ContractInfo {
  burnRate: string
  totalBurned: string
}

// UI State Types
export interface UIStateModel {
  state: UIState
  loading: boolean
  error: string | null
}

export interface Modal {
  type: ModalType
  isOpen: boolean
  data?: Record<string, unknown>
}

export interface ToastNotification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Chat Types
export interface Message {
  id: string
  sender: 'user' | 'assistant'
  content: string
  timestamp: number
  context?: {
    walletAddress?: string
    transactionHash?: string
  }
}

export interface ChatHistory {
  id: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  userAddress?: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    pages: number
  }
  error?: {
    code: string
    message: string
  }
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  currency: string
  gasSpeed: 'slow' | 'standard' | 'fast'
  notifications: {
    email: boolean
    push: boolean
    telegram: boolean
  }
}

// Network Types
export interface Network {
  chainId: number
  name: string
  rpcUrl: string
  blockExplorer: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

// Gas Types
export interface GasPrice {
  safeGasPrice: string
  standardGasPrice: string
  fastGasPrice: string
}

export interface GasEstimate {
  gasLimit: string
  gasPrice: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

// Error Types
export interface AppErrorType {
  code: string
  message: string
  status: number
  details?: unknown
}

// Generic Async Action Result
export interface AsyncResult<T, E = AppErrorType> {
  success: boolean
  data?: T
  error?: E
}

// Hook Types
export interface UseContractOptions {
  watch?: boolean
  pollingInterval?: number
}

export interface UseTransactionOptions {
  onSuccess?: (receipt: TransactionReceipt) => void
  onError?: (error: Error) => void
  onPending?: (hash: string) => void
}

// Form Types
export interface FormData {
  [key: string]: string | number | boolean | undefined
}

export interface FormErrors {
  [key: string]: string | undefined
}

export interface FormState {
  data: FormData
  errors: FormErrors
  isSubmitting: boolean
  isDirty: boolean
}

// Chart Data Types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: (string | number)[]
    borderColor?: string
    backgroundColor?: string
  }[]
}

// Settings Types
export interface AppSettings {
  user: {
    address: string
    ens?: string
  }
  preferences: UserPreferences
  security: {
    twoFactorEnabled: boolean
  }
}

// Environment Types
export interface EnvironmentConfig {
  rpcUrl: string
  chainId: number
  contracts: {
    aglToken: string
    aglCredits: string
  }
  api: {
    baseUrl: string
    timeout: number
  }
}

// Utility Types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Awaited<T> = T extends Promise<infer U> ? U : T
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
