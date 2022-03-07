
/*

Multi Service Platform - Custom hook to handle web socket connection to server 
Created: Mar. 03, 2022
Last Updated: Mar. 07, 2022
Author: Tolentino, Francis James S.

*/



import { createContext, useContext, useEffect, useState } from "react";



import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Modal from "../components/Modals/Modal";




const webSocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);




export const WebSocketProvider: React.FC = ({ children }) => {

    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(io());
    

    useEffect(() => {
        // setSocket(io('http://localhost:4000'));
        const ioConnection = io('http://localhost:4000');
        if (ioConnection.connected) {
            setSocket(ioConnection);
        } else {
            setSocket(io());
        }
    }, []);


    // if(!socket.connected){
    //     return (
    //         <div>
    //             <Modal>
    //                 <div style={{width: '33%'}} className="card">
    //                     <h2>Server Connection Problem</h2>
    //                     <p>The server is down, sorry for the inconvinience</p>
    //                 </div>
    //             </Modal>
    //         </div>
    //     )
    // }


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