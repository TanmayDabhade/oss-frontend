import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = ["/sign-in", "/sign-up"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // API routes - allow all API routes to pass through
  const isApiRoute = pathname.startsWith("/api");

  // Protected routes - only protect page routes, not API routes
  const isProtectedRoute = pathname.startsWith("/(protected)");

  // Redirect to sign-in if accessing protected routes without auth
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect to signed-in home if accessing root while logged in
  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect to signed-in home if accessing auth pages while logged in
  if (isLoggedIn && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
