
/*

Multi Service Platform - Fetch API Route to services data by user
Created: Feb. 17, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest, NextApiResponse } from "next";



import { extractIDandAccessToken } from "../../../libs/extractIDandAccessToken";



import prisma from "../../../prisma/prisma";




const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') res.json({
        msg: 'Only POST requests are allowed',
        status: 500
    })


    const { userId, accessToken } = extractIDandAccessToken(req);


    const findUser = await prisma.users.findMany({
        where: {
            userId: userId,
            accessToken: accessToken as string
        }
    }) 


    if (!findUser) res.json({
        msg: 'This user is not registered',
        status: 500
    })


    const services = await prisma.services.findMany()


    if (!services) res.json({
        msg: 'There seems to be a problem in the server',
        status: 500,
    })


    res.json({
        msg: `Services found for user ${userId}`,
        services: services,
        status: 100
    })

}



export default handler;