
import { createContext, useContext, useState } from "react";


interface ConversationContextType {
    setActiveConvo:  React.Dispatch<any> | null;
    activeConvo: any;
}



const ConversationContext = createContext<ConversationContextType>({
    activeConvo: {},
    setActiveConvo: null,
});



export const ConversationProvider : React.FC = ({ children }) => {

    const [activeConvo, setActiveConvo] = useState<any>({});


    return (
        <ConversationContext.Provider value={{activeConvo, setActiveConvo}}>
            {children}
        </ConversationContext.Provider>
    )
}


export const useConversation = () => {
    return useContext(ConversationContext);
}
