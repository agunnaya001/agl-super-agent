import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware for AGL Super Agent
 * Handles theme persistence and request routing
 */

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add Base network headers for blockchain integration
  response.headers.set('X-Network-Chain', '8453')
  response.headers.set('X-Network-Name', 'base')

  // Handle theme preference
  const themePreference = request.cookies.get('theme-preference')?.value
  if (!themePreference) {
    response.cookies.set('theme-preference', 'system')
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Add permissions policy for Web3 APIs
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  return response
}

// Configure which routes trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
