import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  const { pathname } = request.nextUrl;

  if (isLoggedIn && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (!isLoggedIn && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
