

/*

Multi Service Platform - Provider Login Middleware route
Created: Feb. 11, 2022
Last Updated: Feb. 18, 2022
Author: Tolentino, Francis James S.

*/



import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    if (req.cookies.accessToken && path === '/provider/login'){
        return NextResponse.redirect(new URL('/provider', req.url));
    }

    if (!req.cookies.accessToken && path === '/provider') {
        return NextResponse.redirect(new URL('/provider/login', req.url));
    }
}