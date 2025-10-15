import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/forgot-password"]

// Role-based route access control
const roleRoutes: Record<string, string[]> = {
  patient: ["/patient"],
  doctor: ["/doctor"],
  nurse: ["/nurse"],
  staff: ["/staff"],
  admin: ["/admin"],
  healthcare_manager: ["/manager"],
  system_admin: ["/system-admin"],
  emergency_services: ["/emergency"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some((route) => pathname === route)) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get("auth_token")?.value

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}