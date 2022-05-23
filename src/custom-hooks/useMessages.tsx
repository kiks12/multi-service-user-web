import { createContext, useContext, useMemo, useState } from "react";
import authorizedFetch from "../../utils/authorizedFetch";
import { GET_CONVERSATION_MESSAGES_API } from "../constants";

interface MessagesInterface {
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>> | null;
    getMessages: (id: string, accessToken: string) => void;
    getPaginatedMessages: (id: string, accessToken: string) => void;
}

const MessagesContext = createContext<MessagesInterface>({
    messages: [],
    setMessages: null,
    getMessages: () => {},
    getPaginatedMessages: () => {},
});

export const MessagesProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<any[]>([]);
    // const { session } = useAuthentication();

    const getSentMessage = async (id: string, accessToken: string) => {
        try {
            const res = await authorizedFetch({
                url: `${GET_CONVERSATION_MESSAGES_API}?conversationID=${id}&status=SENT`,
                accessToken: accessToken,
                method: "GET",
            });

            console.log(res);
            return res.messages;
        } catch (e) {
            console.error(e);
        }
    };

    const seenMessages = async (id: string, accessToken: string) => {
        const sentMessages = await getSentMessage(id, accessToken);
        if (sentMessages) {
            console.log("sent: ", sentMessages);
        }
    };

    const getMessages = async (id: string, accessToken: string) => {
        try {
            const res = await authorizedFetch({
                url: `${GET_CONVERSATION_MESSAGES_API}?conversationID=${id}&take=${20}`,
                method: "GET",
                accessToken: accessToken,
            });

            if (res.status === 200) {
                setMessages(res.messages);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getPaginatedMessages = async (id: string, accessToken: string) => {
        try {
            const res = await authorizedFetch({
                url: `${GET_CONVERSATION_MESSAGES_API}?conversationID=${id}&take=20&skip=${messages.length}`,
                method: "GET",
                accessToken: accessToken,
            });

            if (res.status === 200) {
                setMessages((prev) => {
                    return res.messages.concat(prev);
                });
            }
        } catch (e) {
            // handle errors
            console.error(e);
        }
    };

    const memoizedMessages = useMemo(() => {
        return messages;
    }, [messages]);

    return (
        <MessagesContext.Provider
            value={{
                messages: memoizedMessages,
                setMessages,
                getMessages: getMessages,
                getPaginatedMessages,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => {
    return useContext(MessagesContext);
};
