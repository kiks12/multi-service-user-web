
/*

Multi Service Platform - Login Authentication API

*/


import type { NextApiRequest, NextApiResponse } from "next"


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.send("Login")
}


export default handler;