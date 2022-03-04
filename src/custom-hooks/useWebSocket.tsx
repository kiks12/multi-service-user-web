
/*

Multi Service Platform - Custom hook to handle web socket connection to server 
Created: Mar. 03, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import { createContext, useContext, useEffect, useState } from "react";



import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";




const webSocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);




export const WebSocketProvider: React.FC = ({ children }) => {

    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(io());
    

    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, []);


    return (
        <webSocketContext.Provider value={socket}>
            {children}
        </webSocketContext.Provider>
    )
}



const useWebSocket = () => {
    return useContext(webSocketContext);
}



export default useWebSocket;