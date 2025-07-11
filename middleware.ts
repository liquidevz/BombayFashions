import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Add the pathname to headers for use in the layout
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Authentication checks
  const isAuthenticated = request.cookies.has('admin_token')
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

  // Handle authentication redirects
  if (!isAuthenticated && isAdminPage) {
    const loginUrl = new URL('/login', request.url)
    // Preserve the original URL to redirect back after login
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isLoginPage) {
    // If there's a 'from' parameter, redirect there, otherwise go to admin
    const from = request.nextUrl.searchParams.get('from') || '/admin'
    return NextResponse.redirect(new URL(from, request.url))
  }

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/).*)',
  ],
} 