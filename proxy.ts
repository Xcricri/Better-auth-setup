import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/better-auth"; // lib/auth.ts yang kamu bikin

export async function proxy(request: NextRequest) {
    // dapatkan session dari cookie
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // jika tidak ada session → redirect ke login
    if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // kalau ada session → lanjut
    return NextResponse.next();
}

// paths yang ingin kamu proteksi
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};
