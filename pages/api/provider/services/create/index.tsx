
/*

Multi Services Platform - Provider Create new Service API ROUTE
Created: Feb. 14, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest, NextApiResponse } from "next";



import { extractIDandAccessToken } from "../../../../../libs/extractIDandAccessToken";



import prisma from "../../../../../prisma/prisma";



import fs from 'fs';
import path from "path";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        res.json({
            msg: 'only POST requests are allowed',
            status: 500
        })
    }


    const { userId, accessToken } = extractIDandAccessToken(req);




    try {
        const user = await prisma.users.findMany({
            where: {
                userId: userId, 
                accessToken: accessToken,
            }
        })


        if (!user) {
            res.json({
                msg: 'This user is not registered in records',
                statu: 500, 
            })
        }


        const { title, details, type, startingPrice, lastPrice, category } = req.body;


        fs.mkdir(path.join(__dirname, `../../../../../../public/users/${userId}/${title}`), (err) => {
            if (err) console.error(err);
            else console.log('Directory Created Successfully!');
        });



        const newService = await prisma.services.create({
            data: {
                userId: userId,
                title: title, 
                serviceDetails: details,
                category: category,
                status: 'active',
                priceType: type,
                priceInitial: startingPrice, 
                priceFinal: lastPrice, 
                dislikes: 0, 
                likes: 0, 
                ratings: 0,
            }
        })


        if (newService) {
            res.json({
                msg: 'Your new service is created successfully',
                serviceId: newService.serviceId,
                status: 100
            })
        }


    } catch (e) {
        console.error(e);
    }
   
}



export default handler;