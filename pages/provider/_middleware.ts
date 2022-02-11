import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    if (req.cookies.user && path === 'provider/login'){
        return NextResponse.redirect(new URL('/provider', req.url));
    }

    if (!req.cookies.user && path === '/provider') {
        return NextResponse.redirect(new URL('/provider/login', req.url));
    }
}