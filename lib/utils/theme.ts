/**
 * Theme Utilities
 * Handles theme switching, persistence, and application of theme
 */

export type Theme = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'theme-preference'
const THEME_ATTRIBUTE = 'data-theme'

/**
 * Get the current theme from localStorage or system preference
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored
  }

  return 'system'
}

/**
 * Set the theme and persist it
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme)
  applyTheme(theme)
}

/**
 * Apply the theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement

  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', isDark)
  } else {
    root.classList.toggle('dark', theme === 'dark')
  }

  root.setAttribute(THEME_ATTRIBUTE, theme)
}

/**
 * Listen for system theme changes when theme is set to 'system'
 */
export function listenToSystemTheme(): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (getTheme() === 'system') {
      document.documentElement.classList.toggle('dark', e.matches)
    }
  }

  // Modern browsers support addEventListener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  // Fallback for older browsers
  mediaQuery.addListener(handleChange)
  return () => mediaQuery.removeListener(handleChange)
}

/**
 * Initialize theme on app load
 */
export function initializeTheme(): void {
  const theme = getTheme()
  applyTheme(theme)
  listenToSystemTheme()
}

/**
 * Get computed theme value (resolves 'system' to actual theme)
 */
export function getResolvedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const theme = getTheme()
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return theme
}

/**
 * Get theme colors for the current theme
 */
export function getThemeColors(): Record<string, string> {
  const isDark = getResolvedTheme() === 'dark'

  return {
    primary: isDark ? '#0052ff' : '#0052ff',
    secondary: isDark ? '#1a1d3a' : '#f0f4ff',
    background: isDark ? '#0a0e27' : '#ffffff',
    foreground: isDark ? '#f5f5f7' : '#0f0f23',
    accent: isDark ? '#5b80ff' : '#5b80ff',
    muted: isDark ? '#2d3142' : '#e5e9f2',
  }
}
