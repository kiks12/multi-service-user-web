
import { createContext, useContext, useState } from "react";
import authorizedFetch from "../../utils/authorizedFetch";
import { GET_CONVERSATION_DETAILS_API } from "../constants";


interface ConversationContextType {
    setActiveConvo:  React.Dispatch<any> | null;
    activeConvo: any;
    getConversationDetails: (id: string, accessToken: string) => void;
}



const ConversationContext = createContext<ConversationContextType>({
    activeConvo: {},
    setActiveConvo: null,
    getConversationDetails: () => {},
});



export const ConversationProvider : React.FC = ({ children }) => {

    const [activeConvo, setActiveConvo] = useState<any>({});


    const getConversationDetails = async (id: string, accessToken: string) => {
        const res = await authorizedFetch({
            url: `${GET_CONVERSATION_DETAILS_API}?conversationId=${id}`,
            accessToken: accessToken,
            method: 'GET',
        });

        setActiveConvo(res.conversation);
    }


    return (
        <ConversationContext.Provider value={{activeConvo, setActiveConvo, getConversationDetails}}>
            {children}
        </ConversationContext.Provider>
    )
}


export const useConversation = () => {
    return useContext(ConversationContext);
}
