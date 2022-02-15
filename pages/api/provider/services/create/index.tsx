
/*

Multi Services Platform - Provider Create new Service API ROUTE
Created: Feb. 14, 2022
Last Updated: Feb. 15, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest, NextApiResponse } from "next";
import { extractIDandAccessToken } from "../../../../../libs/extractIDandAccessToken";



const handler = (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        res.json({
            msg: 'only POST requests are allowed',
            status: 500
        })
    }


    const { userId, accessToken } = extractIDandAccessToken(req);


    console.log('userId: ', userId, ' accessToken: ', accessToken);
    console.log('body: ', req.body);
   
}



export default handler;