
/*

Multi Service Platform - Log out API
Created: Feb. 08, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.


*/


import cookie from 'cookie';



import { NextApiRequest, NextApiResponse } from "next";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    res.setHeader("Set-Cookie", cookie.serialize("user", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/" 
    }));

    res.statusCode = 200;
    res.json({success : true});
}



export default handler;