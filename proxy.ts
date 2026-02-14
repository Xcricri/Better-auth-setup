import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIX = "/user";
const PUBLIC_PATH = "/user/login";
const ALLOWED_ROLES = new Set(["admin", "user"]);

export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // Jika bukan path yang dilindungi atau path publik, lanjutkan
    if (!pathname.startsWith(PROTECTED_PREFIX) || pathname === PUBLIC_PATH) {
        return NextResponse.next();
    }

    // Ambil sesi
    const session = await getSessionFromAPI(request);
    const role = session?.user?.role?.toLowerCase();

    // Jika tidak ada user atau role tidak diizinkan, redirect ke login
    if (!role || !ALLOWED_ROLES.has(role)) {
        const loginUrl = new URL(PUBLIC_PATH, request.url);
        const redirectTo = pathname + search;
        if (redirectTo !== PUBLIC_PATH) {
            loginUrl.searchParams.set("redirectTo", redirectTo);
        }
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*"],
};

type SessionResponse = {
    session: { expiresAt: string; token: string };
    user: { id: string; role?: string;[key: string]: unknown };
} | null;

async function getSessionFromAPI(request: NextRequest): Promise<SessionResponse> {
    const url = new URL("/api/auth/get-session", request.url);
    const headers = new Headers({
        accept: "application/json",
        cookie: request.headers.get("cookie") || "",
        "x-forwarded-for": request.headers.get("x-forwarded-for") || "",
        "user-agent": request.headers.get("user-agent") || "",
    });

    try {
        const res = await fetch(url, { headers, cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as SessionResponse;
    } catch {
        return null;
    }
}
