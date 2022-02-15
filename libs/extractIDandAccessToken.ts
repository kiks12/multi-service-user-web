
/*

Multi Service Platform - Lib Function to extract Id and accesstoken from request
Created: Feb. 15, 2022
Last Updated: Feb. 15, 2022
Author: Tolentino, Francis James S.

*/



import { NextApiRequest } from "next";



type ExtractIDandAccessToken = (req: NextApiRequest) => {userId: number, accessToken: string}



export const extractIDandAccessToken:ExtractIDandAccessToken = (req: NextApiRequest) => {
    const { id, accessToken } = req.query;
    const userId = parseInt(id as string, 10);

    return {
        userId: userId,
        accessToken: accessToken as string
    };
}