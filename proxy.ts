import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/user"];
const PUBLIC_PATHS = ["/user/login"];
const ALLOWED_ROLES = new Set(["admin", "user"]);

function isProtectedPath(pathname: string) {
    return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

function hasAllowedRole(role: unknown) {
    if (typeof role !== "string") {
        return false;
    }

    return ALLOWED_ROLES.has(role.toLowerCase());
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!isProtectedPath(pathname) || isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const session = await getSessionFromAPI(request);

    if (!session?.user || !hasAllowedRole(session.user.role)) {
        const loginUrl = new URL("/user/login", request.url);
        const redirectTarget = `${pathname}${request.nextUrl.search}`;
        if (redirectTarget && redirectTarget !== "/user/login") {
            loginUrl.searchParams.set("redirectTo", redirectTarget);
        }
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*"],
};

type SessionResponse = {
    session: {
        expiresAt: string;
        token: string;
    };
    user: {
        id: string;
        role?: string;
        [key: string]: unknown;
    };
} | null;

async function getSessionFromAPI(request: NextRequest): Promise<SessionResponse> {
    const sessionUrl = new URL("/api/auth/get-session", request.url);

    const headers = new Headers({
        accept: "application/json",
    });

    const cookie = request.headers.get("cookie");
    if (cookie) {
        headers.set("cookie", cookie);
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        headers.set("x-forwarded-for", forwardedFor);
    }

    const userAgent = request.headers.get("user-agent");
    if (userAgent) {
        headers.set("user-agent", userAgent);
    }

    try {
        const response = await fetch(sessionUrl, {
            headers,
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as SessionResponse;
        return data;
    } catch {
        return null;
    }
}
