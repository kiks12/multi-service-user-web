
/*

Multi Service Platform - Provider Information Update API route
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prisma";


interface UpdateParams {
    id: number,
    accessToken: string,
}



const handler = (req: NextApiRequest, res: NextApiResponse) => {

    const { id, accessToken } = req.query;
    const { description,
            shopName,
            address,
            contact, 
            skills } = req.body;

    console.log('params: ', req.query);
    console.log('body: ', req.body);

    

}



export default handler;