import { NextResponse } from 'next/server';
import { verifyToken } from './utils/jwt';

export function middleware(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check for roles
  const { role } = decodedToken;
  const adminRoutes = ['/admin/:path*']; // Define admin routes

  // Check if the request is for an admin route
  const isRequestForAdminRoute = adminRoutes.some((route) => new URL(req.url).pathname.startsWith(route.replace(':path*', '')));

  if (isRequestForAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/not-authorized', req.url)); // Redirect if not authorized
  }

  req.user = decodedToken;
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*', '/admin/:path*'],
};
