
/*

Multi Service Platform - Registration API
Created: Feb. 08, 2022
Last Updated: Feb. 08, 2022
Author: Tolentino, Francis James S.

*/


import type { NextApiRequest, NextApiResponse } from "next";


import prisma from "../../../prisma/prisma";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (!req.body){
        res.statusCode = 400;
        res.send("There seems to be a problem");
    }
    
    if (req.method !== 'POST'){
        res.send("Method Error: only POST method is allowed");
    }



    const { username, email, password, type } = req.body;


    const existingUser = await prisma.users.findFirst({
        where: {
            username: username
        }
    });


    if (existingUser) {
        res.json({
            msg: 'Username already used!',
            status: 500
        });
    }



    await prisma.users.create({
        data: {
            username: username,
            email: email,
            password: password,
            address: '',
            contact: '',
            type: type,
        }
    })


    const createdUser = await prisma.users.findFirst({
        where: {
            username: username
        }
    })

    
    if (!createdUser) {
        res.json({
            msg: 'There seems to be a problem',
            status: 500
        });
    }



    res.json({
        msg: 'User Successfully Created',
        status: 100
    });
}



export default handler;