import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    const accessToken = req.cookies.accessToken;


    if (accessToken && (path === '/login' || path === 'register')) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}