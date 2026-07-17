/**
 * Error Handling Utilities
 * Centralized error handling and logging for the application
 */

import { LOG_CONFIG } from '@/lib/config'

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details)
    this.name = 'ValidationError'
  }
}

export class BlockchainError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('BLOCKCHAIN_ERROR', message, 500, details)
    this.name = 'BlockchainError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(
      'NOT_FOUND',
      `${resource} not found`,
      404,
      { resource }
    )
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super('FORBIDDEN', message, 403)
    this.name = 'ForbiddenError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409)
    this.name = 'ConflictError'
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super('RATE_LIMIT', message, 429)
    this.name = 'RateLimitError'
  }
}

/**
 * Log error based on configuration
 */
export function logError(error: Error | AppError, context?: string): void {
  if (LOG_CONFIG.level === 'silent') return

  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    context,
    name: error.name,
    message: error.message,
    ...(error instanceof AppError && {
      code: error.code,
      status: error.status,
      details: error.details,
    }),
    ...(LOG_CONFIG.debug && { stack: error.stack }),
  }

  if (typeof window === 'undefined') {
    // Server-side logging
    console.error('[ERROR]', errorInfo)
  } else {
    // Client-side logging
    console.error('[CLIENT ERROR]', errorInfo)
  }
}

/**
 * Parse blockchain error messages
 */
export function parseBlockchainError(error: unknown): {
  message: string
  code: string
  details?: unknown
} {
  if (error instanceof Error) {
    const message = error.message

    if (message.includes('insufficient funds')) {
      return {
        message: 'Insufficient funds for transaction',
        code: 'INSUFFICIENT_FUNDS',
        details: message,
      }
    }

    if (message.includes('user rejected')) {
      return {
        message: 'Transaction rejected by user',
        code: 'USER_REJECTED',
        details: message,
      }
    }

    if (message.includes('nonce')) {
      return {
        message: 'Transaction nonce error. Please try again.',
        code: 'NONCE_ERROR',
        details: message,
      }
    }

    if (message.includes('gas')) {
      return {
        message: 'Gas estimation failed. Check your transaction.',
        code: 'GAS_ERROR',
        details: message,
      }
    }

    if (message.includes('reverted')) {
      return {
        message: 'Transaction reverted. Contract operation failed.',
        code: 'REVERT_ERROR',
        details: message,
      }
    }

    if (message.includes('network')) {
      return {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
        details: message,
      }
    }

    return {
      message: message || 'Unknown blockchain error',
      code: 'BLOCKCHAIN_ERROR',
      details: message,
    }
  }

  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    details: error,
  }
}

/**
 * Parse API error response
 */
export function parseApiError(error: unknown): {
  message: string
  code: string
  status: number
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      status: error.status,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'ERROR',
      status: 500,
    }
  }

  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN',
    status: 500,
  }
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (!(error instanceof AppError)) return true

  const retryableCodes = [
    'NETWORK_ERROR',
    'TIMEOUT',
    'RATE_LIMIT',
    'NONCE_ERROR',
  ]

  return retryableCodes.includes(error.code)
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof BlockchainError) {
    const parsed = parseBlockchainError(error)
    return parsed.message
  }

  if (error instanceof NotFoundError) {
    return error.message
  }

  if (error instanceof UnauthorizedError) {
    return error.message
  }

  if (error instanceof ForbiddenError) {
    return error.message
  }

  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    // Don't expose internal error messages
    return 'Something went wrong. Please try again.'
  }

  return 'An unexpected error occurred'
}

/**
 * Create error response
 */
export function createErrorResponse(error: unknown, status: number = 500) {
  const parsed = parseApiError(error)

  return {
    success: false,
    error: {
      code: parsed.code,
      message: parsed.message,
      status: parsed.status,
    },
  }
}

/**
 * Retry async function with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (i < maxRetries - 1) {
        const delay = delayMs * Math.pow(2, i) // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError || new Error('Max retries exceeded')
}
