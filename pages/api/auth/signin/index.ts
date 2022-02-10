
/*

Multi Service Platform - Login API
Created: Feb. 08, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.


*/


import cookie from 'cookie';



import { NextApiRequest, NextApiResponse } from "next";



import prisma from "../../../../prisma/prisma";



import type { User } from "../../../../types";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        res.send('Only POST method is allowed');
    }

    const { email } = req.body;

    try {
        const findUser = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if (!findUser) {
            res.json({
                msg: 'User Not Found',
                status: 500
            })
            return;
        }


        const foundUser : User = {
            email: findUser.email,
            id: findUser.userId,
            image: findUser.image,
            username: findUser.username,
        }


        res.setHeader("Set-Cookie", cookie.serialize("user", JSON.stringify(foundUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 5,
            sameSite: "strict",
            path: "/" 
        }));



        res.json({
            user: foundUser,
            status: 100
        })

    } catch (e) {
        res.json({
            msg: e,
            status: 500
        })
    }

}



export default handler;