
import type { NextApiRequest, NextApiResponse } from "next";


// import jwt from 'jsonwebtoken';


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body){
        res.statusCode = 400;
        res.send("There seems to be a problem");
    }
    
    if (req.method !== 'POST'){
        res.send("Method Error: only POST method is allowed");
    }


    const { username, email, password } = req.body;

    


    res.send("hello register");
}



export default handler;