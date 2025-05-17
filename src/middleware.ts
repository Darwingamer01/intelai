import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  console.log("🔒 Middleware running on:", pathname);
  console.log("🔑 Token present:", !!token);

  if (!token && pathname.startsWith('/user/chats')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/user/chats', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/user/chats',
  ],
};
