
/*

Multi Service Platform - Provider Services Fetch API Route
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest, NextApiResponse } from "next";



import prisma from "../../../../prisma/prisma";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let isOk = false;
    const { id, accessToken } = req.query;
    const userId = parseInt(id as string, 10);
    

    try {

        const user = await prisma.users.findFirst({
            where: {
                accessToken: accessToken as string,
                userId: userId,
            }
        })
    
    
        if (user) {
            const services = await prisma.services.findMany({
                where: {
                    userId: userId,
                }, 
                include: {
                    Images: true
                }
            });


            res.json({
                services: services,
                status: 100,
            })
        }

    } catch (e) {
        console.error(e);
        res.json({
            msg: JSON.stringify(e),
            status: 500
        })
    }
    
}



export default handler;