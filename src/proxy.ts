import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "constants/auth";

const PUBLIC_ONLY_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/profile", "/products", "/category", "/blogs"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
    const isAuthenticated = Boolean(token);

    const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.some(
        (route) => pathname === route
    );

    const isProtectedRoute = PROTECTED_ROUTES.some(
        (route) =>
            pathname === route ||
            pathname.startsWith(`${route}/`)
    );

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (isPublicOnlyRoute && isAuthenticated) {
        return NextResponse.redirect(
            new URL("/profile", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/profile/:path*",
        "/products/:path*",
        "/category/:path*",
        "/blogs/:path*",
    ],
};
