


import { NextApiRequest, NextApiResponse } from "next";



import prisma from "../../../../prisma/prisma";



import type { User } from "../../../../types";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        res.send('Only POST method is allowed');
    }

    const { email, password } = req.body;

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

        // if (findUser?.password !== password) {
        //     res.json({
        //         msg: 'Password Incorrect',
        //         status: 500
        //     })
        //     return;
        // }

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