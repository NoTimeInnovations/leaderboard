import { NextResponse } from 'next/server';
import { verifyToken } from './utils/jwt';
import { cookies } from "next/headers";
import {jwtVerify} from 'jose';


export async function middleware(req) {
  const token = req.cookies.get('token').value;
  console.log(token);

  if(token){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(token, secret);
    console.log(payload)
  }
  else{
    return NextResponse.redirect(new URL('/', req.url));
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/', req.url));
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
