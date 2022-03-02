


import { createContext, useContext, useEffect } from "react";



import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";




const webSocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);


let socket : Socket<DefaultEventsMap, DefaultEventsMap> | null;


export const WebSocketProvider: React.FC = ({ children }) => {


    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket');
            socket = io();


            socket.on('connect', () => {
                console.log('io connected');
            })
            
        }


        socketInitializer();
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