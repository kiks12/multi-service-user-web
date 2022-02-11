

/*

Multi Service Platform - Provider Login Middleware route
Created: Feb. 11, 2022
Last Updated: Feb. 11, 2022
Author: Tolentino, Francis James S.

*/



import { NextRequest, NextResponse } from "next/server";



export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;

    console.log(req.cookies.user);

    if (req.cookies.user && path === '/provider/login'){
        console.log('redirect na dapat');
        return NextResponse.redirect(new URL('/provider', req.url));
    }

    if (!req.cookies.user && path === '/provider') {
        return NextResponse.redirect(new URL('/provider/login', req.url));
    }
}