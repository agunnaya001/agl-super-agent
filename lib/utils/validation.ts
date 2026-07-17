/**
 * Validation Utilities
 * Functions for validating addresses, amounts, and other blockchain data
 */

import { VALIDATION } from '@/lib/config'

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  return VALIDATION.addressRegex.test(address)
}

/**
 * Validate transaction hash format
 */
export function isValidTxHash(hash: string): boolean {
  if (!hash || typeof hash !== 'string') return false
  return VALIDATION.txHashRegex.test(hash)
}

/**
 * Validate amount (positive number)
 */
export function isValidAmount(amount: string | number): boolean {
  if (amount === '' || amount === null || amount === undefined) return false

  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(num)) return false
  if (num <= 0) return false

  return true
}

/**
 * Validate amount is within reasonable transaction range
 */
export function isValidTransactionAmount(amount: string): boolean {
  if (!isValidAmount(amount)) return false

  const num = parseFloat(amount)
  const min = parseFloat(VALIDATION.minTransactionAmount)
  const max = parseFloat(VALIDATION.maxTransactionAmount)

  return num >= min && num <= max
}

/**
 * Validate Ethereum signature
 */
export function isValidSignature(signature: string): boolean {
  if (!signature || typeof signature !== 'string') return false
  const sigRegex = /^0x[a-fA-F0-9]{130}$/
  return sigRegex.test(signature)
}

/**
 * Validate integer
 */
export function isValidInteger(value: string | number): boolean {
  const num = typeof value === 'string' ? parseInt(value, 10) : value
  return Number.isInteger(num) && num >= 0
}

/**
 * Validate decimal number with specific precision
 */
export function isValidDecimal(
  value: string,
  maxDecimals: number = 18
): boolean {
  if (typeof value !== 'string') return false

  const regex = new RegExp(`^\\d+(\\.\\d{1,${maxDecimals}})?$`)
  return regex.test(value)
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate JSON string
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false
  return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color)
}

/**
 * Validate that address is not zero address
 */
export function isNotZeroAddress(address: string): boolean {
  if (!isValidAddress(address)) return false
  return address !== '0x0000000000000000000000000000000000000000'
}

/**
 * Validate arrays are not empty
 */
export function isNotEmpty<T>(arr: T[] | undefined | null): arr is T[] {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * Validate object is not empty
 */
export function isObjectNotEmpty(
  obj: Record<string, unknown> | undefined | null
): boolean {
  return obj !== undefined && obj !== null && Object.keys(obj).length > 0
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate and sanitize blockchain address
 */
export function validateAndSanitizeAddress(address: string): string | null {
  if (!isValidAddress(address)) return null
  return address.toLowerCase()
}

/**
 * Check if amount exceeds maximum value
 */
export function exceedsMax(amount: string, max: string): boolean {
  try {
    return parseFloat(amount) > parseFloat(max)
  } catch {
    return true
  }
}

/**
 * Check if amount is less than minimum value
 */
export function belowMin(amount: string, min: string): boolean {
  try {
    return parseFloat(amount) < parseFloat(min)
  } catch {
    return true
  }
}

/**
 * Get validation error message
 */
export function getValidationError(errorType: string): string {
  const errors: Record<string, string> = {
    invalidAddress: 'Invalid Ethereum address',
    invalidAmount: 'Invalid amount',
    invalidTxHash: 'Invalid transaction hash',
    invalidSignature: 'Invalid signature',
    zeroAddress: 'Cannot use zero address',
    insufficientFunds: 'Insufficient funds',
    exceedsMaxAmount: 'Amount exceeds maximum',
    belowMinAmount: 'Amount is below minimum',
    invalidEmail: 'Invalid email address',
    invalidUrl: 'Invalid URL',
    invalidJSON: 'Invalid JSON format',
    required: 'This field is required',
    unknown: 'Validation failed',
  }

  return errors[errorType] || errors.unknown
}
