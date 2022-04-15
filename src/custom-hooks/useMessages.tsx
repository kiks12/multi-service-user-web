
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthentication } from "./useAuthentication";



interface MessagesInterface {
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>> | null;
}


const MessagesContext = createContext<MessagesInterface>({
    messages: [],
    setMessages: null,
});



export const MessagesProvider : React.FC = ({ children }) => {

    const [messages, setMessages] = useState<any[]>([]);
    const { session } = useAuthentication();

    const userOneIsClientTwoIsProvider = (message: any) => {
        return message.Conversation.userOneRole === 'Client' && message.Conversation.userTwoRole === 'Provider';
    }


    const userOneIsSender = (message: any) => {
        return message.Conversation.userOne === message.from;
    }


    const userTwoIsSender = (message: any) => {
        return message.Conversation.userTwo === message.from;
    }


    const processedMessages = useMemo(() => {
        let messagesFinal : any[] = [];
        messages.forEach((message: any) => {
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

            messagesFinal.push({
                messageId: message.messageId,
                conversationId: message.conversationId,
                fromImage: message.From.image,
                fromId: message.from,
                toId: message.to,
                from: from,
                to: to,
                message: message.message,
                datetime: new Date(message.datetime).toString(),
            })
        })

        return messagesFinal;
    }, [messages])


    return (
        <MessagesContext.Provider value={{messages: processedMessages, setMessages}}>
            {children}
        </MessagesContext.Provider>
    )
}



export const useMessages = () => {
    return useContext(MessagesContext);
}