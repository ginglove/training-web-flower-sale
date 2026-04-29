import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ADMIN PROTECTION
  if (pathname.startsWith('/quan-tri') && pathname !== '/quan-tri/dang-nhap') {
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL('/quan-tri/dang-nhap', request.url));
    }

    try {
      // Decode JWT payload without verification (safe for Edge runtime without extra libs)
      const payloadBase64 = adminToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/quan-tri/dang-nhap', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/quan-tri/dang-nhap', request.url));
    }
  }

  // 2. MEMBER PROTECTION
  const protectedMemberRoutes = ['/thanh-vien', '/thanh-toan'];
  if (protectedMemberRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/dang-nhap', request.url));
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      if (payload.role !== 'customer') {
        return NextResponse.redirect(new URL('/dang-nhap', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/dang-nhap', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/quan-tri/:path*',
    '/thanh-vien/:path*',
    '/thanh-toan/:path*',
  ],
};
