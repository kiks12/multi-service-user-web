
/*

Multi Service Platform - Provider Information Update API route
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import cookie from 'cookie';



import { NextApiRequest, NextApiResponse } from "next";



import prisma from "../../../../prisma/prisma";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let isOk = false;

    const { id, accessToken } = req.query;
    const userId = parseInt(id as string, 10);



    const { description,
            shopName,
            address,
            contact, 
            skills } = req.body;


    
    try {
        // update the provider information using id and accesstoken params
        // update the properties in req.body (desc, shopName, address, etc.)
        await prisma.users.updateMany({
            where: {
                userId: userId,
                accessToken: accessToken as string
            },
            data: {
                description: description,
                shopName: shopName,
                address: address,
                contact: contact,
                skills: skills,
                firstProviderLogin: false,
            }
        })

        // if successfully updated then status isOk set to true
        isOk = true;


        // then get the latest version of the provider information from database
        const updatedUserInformation = await prisma.users.findFirst({
            where: {
                userId: userId
            }
        }) 



        if (isOk && updatedUserInformation) {

            // update user cookie to the latest version of the data from database
            res.setHeader("Set-Cookie", cookie.serialize("user", JSON.stringify(updatedUserInformation), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 5,
                sameSite: "strict",
                path: "/" 
            }));


            // send the remarks, status, and updated information through json response
            res.json({
                msg: 'Your Provider Information is successfully updated',
                user: updatedUserInformation,                
                status: 100
            })
            return;
        }

        isOk = false;

    } catch (e) {
        console.error(e);
        res.json({
            msg: JSON.stringify(e),
            status: 500
        })
    }
}



export default handler;