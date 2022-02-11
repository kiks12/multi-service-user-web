import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    if (req.cookies.user && (path === '/login' || path === '/register')) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}