/**
 * Formatting Utilities
 * Functions for formatting addresses, numbers, and currency values
 */

/**
 * Format Ethereum address to shortened version (0x1234...5678)
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  if (address.length < 10) return address

  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Format large numbers with commas and decimal places
 */
export function formatNumber(
  num: number | string | bigint,
  decimals: number = 2
): string {
  if (!num) return '0'

  const number =
    typeof num === 'bigint'
      ? Number(num)
      : typeof num === 'string'
        ? parseFloat(num)
        : num

  if (isNaN(number)) return '0'

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(number)
}

/**
 * Format currency value
 */
export function formatCurrency(
  amount: number | string,
  currency: string = 'USD'
): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(number)) return `$0.00`

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(number)
}

/**
 * Convert wei to ether or other decimal token amounts
 */
export function formatEther(
  wei: string | bigint,
  decimals: number = 18
): string {
  if (!wei) return '0'

  let weiStr = typeof wei === 'bigint' ? wei.toString() : wei

  // Remove negative sign if present
  const isNegative = weiStr.startsWith('-')
  weiStr = weiStr.replace('-', '')

  // Pad with zeros if necessary
  if (weiStr.length < decimals) {
    weiStr = weiStr.padStart(decimals, '0')
  }

  // Split into integer and fractional parts
  const integerPart = weiStr.slice(0, -decimals) || '0'
  const fractionalPart = weiStr.slice(-decimals)

  // Remove trailing zeros from fractional part
  let result = (integerPart + '.' + fractionalPart).replace(/\.?0+$/, '')
  if (result.endsWith('.')) {
    result = result.slice(0, -1)
  }

  return isNegative ? '-' + result : result
}

/**
 * Convert ether or token amount to wei
 */
export function parseEther(
  ether: string | number,
  decimals: number = 18
): string {
  const etherStr = String(ether)

  // Check if it contains a decimal point
  if (etherStr.includes('.')) {
    const [integerPart, fractionalPart] = etherStr.split('.')

    // Pad fractional part to the correct number of decimals
    const paddedFractional = (fractionalPart + '0'.repeat(decimals)).slice(
      0,
      decimals
    )

    return (integerPart + paddedFractional).replace(/^0+/, '') || '0'
  }

  return (etherStr + '0'.repeat(decimals)).replace(/^0+/, '') || '0'
}

/**
 * Format transaction hash to shortened version
 */
export function formatTxHash(hash: string, chars: number = 6): string {
  if (!hash) return ''
  if (hash.length < 12) return hash

  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : timestamp

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`

  return formatDate(timestamp)
}

/**
 * Format percentage with symbol
 */
export function formatPercent(
  value: number,
  decimals: number = 2,
  includeSign: boolean = false
): string {
  const formatted = (value * 100).toFixed(decimals)
  const sign = includeSign && value > 0 ? '+' : ''

  return `${sign}${formatted}%`
}

/**
 * Format large numbers with abbreviations (1M, 1B, etc.)
 */
export function formatCompact(num: number): string {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'

  return (num / 1000000000).toFixed(1) + 'B'
}

/**
 * Get human readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
