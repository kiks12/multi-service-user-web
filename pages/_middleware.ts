import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const accessToken = req.cookies.accessToken;

    if ((path === "/login" && accessToken) || (path === "/register" && accessToken)) return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next()
};
