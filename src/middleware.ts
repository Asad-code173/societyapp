import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isRootRoute = createRouteMatcher(['/']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isResidentRoute = createRouteMatcher(['/resident(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { sessionId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata?.role as string) || "resident";
  const currentPath = new URL(req.url).pathname;
  console.log("Path:" +currentPath +" role "+role)

  if (publicRoutes(req)) {
    return;
  }

  if (isRootRoute(req) && !sessionId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (isRootRoute(req) && sessionId) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    } else {
      return NextResponse.redirect(new URL('/resident/dashboard', req.url));
    }
  }


  if (isResidentRoute(req) && role === 'admin') {
    if (currentPath !== '/admin/dashboard') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
  }
  
  if (isAdminRoute(req) && role === 'resident') {
    if (currentPath !== '/resident/dashboard') {
      return NextResponse.redirect(new URL('/resident/dashboard', req.url));
    }
  }



});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
