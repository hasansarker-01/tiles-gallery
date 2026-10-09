
import { NextResponse } from "next/server";

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const privateRoutes = [
        "/my-profile",
        "/tile",
    ];

    const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (!isPrivateRoute) {
        return NextResponse.next();
    }

    // Better Auth session cookie check
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie) {
        const loginUrl = new URL("/login", request.url);

        loginUrl.searchParams.set("callbackUrl", pathname);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-profile/:path*", "/tile/:path*"],
};

