
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import authorizedFetch from "../../utils/authorizedFetch";
import { GET_CONVERSATION_MESSAGES_API } from "../constants";
import { useAuthentication } from "./useAuthentication";



interface MessagesInterface {
    processRawMessage: any;
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>> | null;
    getMessages: (id: string, accessToken: string) => void;
}


const MessagesContext = createContext<MessagesInterface>({
    processRawMessage: () => {},
    messages: [],
    setMessages: null,
    getMessages: () => {},
});



export const MessagesProvider : React.FC = ({ children }) => {

    const [messages, setMessages] = useState<any[]>([]);
    // const { session } = useAuthentication();


    const getMessages = async (id: string, accessToken: string) => {
        try {
            const res = await authorizedFetch({
                url: `${GET_CONVERSATION_MESSAGES_API}?conversationID=${id}`,
                method: 'GET',
                accessToken: accessToken,
            });

            if (res.status === 200) {
                setMessages(res.messages);
            }
        } catch (e) {
            console.error(e);
        }
    }


    const userOneIsClientTwoIsProvider = (message: any) => {
        return message.Conversation.userOneRole === 'Client' && message.Conversation.userTwoRole === 'Provider';
    }


    const userOneIsSender = (message: any) => {
        return message.Conversation.userOne === message.from;
    }


    const userTwoIsSender = (message: any) => {
        return message.Conversation.userTwo === message.from;
    }


    const processRawMessage = useCallback((message: any) => {
        let from = '';
        let to = '';

        if (userOneIsClientTwoIsProvider(message) && userOneIsSender(message)) {
            from = message.From.username;
            to = message.To.shopName;
        }

        if (userOneIsClientTwoIsProvider(message) && userTwoIsSender(message)) {
            from = message.To.username;
            to = message.From.shopName;
        }   

        return {
            messageId: message.messageId,
            conversationId: message.conversationId,
            fromImage: message.From.image,
            fromId: message.from,
            toId: message.to,
            from: from,
            to: to,
            status: message.status,
            message: message.message,
            datetime: new Date(message.datetime).toString(),
        }
    }, []);


    const processedMessages = useMemo(() => {
        let messagesFinal : any[] = [];
        messages.forEach((message: any) => {
            const finalMessage = processRawMessage(message);            

            messagesFinal.push(finalMessage);
        })

        return messagesFinal;
    }, [messages, processRawMessage])



    return (
        <MessagesContext.Provider value={{
                messages: processedMessages, 
                setMessages, 
                processRawMessage,
                getMessages,
            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}



export const useMessages = () => {
    return useContext(MessagesContext);
}