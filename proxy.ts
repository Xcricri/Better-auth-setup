// middleware.js
import { NextRequest, NextResponse } from 'next/server';

const LOGIN_PATH = '/user/login';
const DASHBOARD_PATH = '/user/dashboard';
const SESSION_COOKIE_NAME = 'better-auth.session_token';

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isLoginPage = pathname === LOGIN_PATH;
    const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

    if (!hasSession) {
        // Tetap izinkan akses ke halaman login ketika belum ada sesi
        if (isLoginPage) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
    }

    // Jika sudah login dan mencoba buka halaman login, arahkan ke dashboard
    if (isLoginPage) {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
    }

    return NextResponse.next();
}

// Hanya matcher untuk halaman yang perlu proteksi
export const config = {
    matcher: ['/user/:path*'],
};
