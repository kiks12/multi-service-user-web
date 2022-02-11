import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    if (req.cookies.user && req.nextUrl.pathname === '/provider/login') {
        return NextResponse.redirect(new URL('/provider', req.url));
    }

    return NextResponse.redirect(new URL('/provider/login', req.url));
}