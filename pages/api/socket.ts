
/*

Multi Service Platform - Web Socket API route, this API route initializes the socket for the site
Created: Mar. 02, 2022
Last Updated: Mar. 02, 2022
Author: Tolentino, Francis James S.

*/



import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


import { NextApiRequest, NextApiResponse} from 'next';



const handler = (req: NextApiRequest , res: NextApiResponse) => {

    if (res.socket) {
        if (res.socket.server.io) {
            console.log('Socket is already running');
        } else {
            console.log('Socket is initializing');
            const io = new Server(req.socket.server);
            res.socket.server.io = io;
        }


        res.socket.server.io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {

            // handle socket events here
            
        })
    }

    res.end();
} 



export default handler;