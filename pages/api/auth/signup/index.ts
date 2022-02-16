
/*

Multi Service Platform - Registration API
Created: Feb. 08, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import type { NextApiRequest, NextApiResponse } from "next";



import { generateAccessToken } from "../../../../libs/hashAccessToken";



import prisma from "../../../../prisma/prisma";



import fs from 'fs';
import path from "path";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    
    if (!req.body){
        res.statusCode = 400;
        res.send("There seems to be a problem");
    }

    
    if (req.method !== 'POST'){
        res.send("Method Error: only POST method is allowed");
    }



    const { username, email, image, provider } = req.body;


    const existingUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    });



    if (existingUser) {
        res.json({
            msg: 'This Email is already used!',
            status: 500
        });
    }


    const generatedAccessToken = generateAccessToken({email, username});



    await prisma.users.create({
        data: {
            username: username,
            accessToken: generatedAccessToken,
            email: email,
            provider: provider,
            address: null,
            contact: null,
            image: image,
            followers: 0,
            likes: 0,
            verifiedProvider: false,
            firstLogin: true,
            firstProviderLogin: true,
        }
    })



    const createdUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    

    if (!createdUser) {
        res.json({
            msg: 'There seems to be a problem',
            status: 500
        });
    }



    fs.mkdir(path.join(__dirname, `../../../../../public/users/${createdUser?.userId}`), (err) => {
        if(err) console.log(err);
        else console.log('Directory Created Successfully');
    })


    res.json({
        msg: 'User Successfully Created',
        status: 100
    });
}



export default handler;