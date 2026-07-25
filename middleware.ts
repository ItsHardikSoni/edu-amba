import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('aura_admin_session')?.value;
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect from login if already authenticated
  if (pathname === '/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
