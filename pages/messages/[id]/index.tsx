import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import { useEffect } from "react";

import Layout from "../../../src/components/layout/Layout";
import Messages from "../../../src/components/Messages";
import MessagesLayout from "../../../src/components/Messages/Layout";
import ListOfConvos from "../../../src/components/Messages/ListOfConvos";

import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";
import { useConversation } from "../../../src/custom-hooks/useConversation";
import { useMessages } from "../../../src/custom-hooks/useMessages";

import fetchUserInformation from "../../../libs/fetchUserInformation";
import useWebSocket from "../../../src/custom-hooks/useWebSocket";
import authorizedFetch from "../../../utils/authorizedFetch";
import {GET_CONVERSATION_DETAILS_API, GET_CONVERSATION_MESSAGES_API} from "../../../src/constants";

const Conversations: NextPage = ({
    user,
    accessToken,
    messages,
    conversationDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { setSession } = useAuthentication();
    const { setMessages } = useMessages();
    const { activeConvo, setActiveConvo } = useConversation();
    const socket = useWebSocket();

    useEffect(() => {
        if (typeof setMessages === "function") setMessages(messages);
        if (typeof setActiveConvo === "function") setActiveConvo(conversationDetails);
        if (typeof setSession === "function") setSession(user);

        return () => {
            if (typeof setMessages === "function") setMessages([]);
            if (typeof setActiveConvo === "function") setActiveConvo({});
            if (typeof setSession === "function") setSession(null);
        }
    }, [setMessages, setActiveConvo, setSession, messages, conversationDetails, user]);

    useEffect(() => {
        if (activeConvo) {
            socket.emit("joinConversation", activeConvo.conversationId);
        }
    }, [activeConvo, socket]);

    if (!messages && !conversationDetails) {
        return (
            <Layout accessToken={accessToken}>
                <p>Loading...</p>
            </Layout>
        )
    }

    return (
        <Layout accessToken={accessToken}>
            <MessagesLayout>
                <ListOfConvos accessToken={accessToken} role="CLIENT" />
                <Messages accessToken={accessToken} />
            </MessagesLayout>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}: GetServerSidePropsContext) => {
    const { id } = query;

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(
            req.cookies.accessToken
        );

        const conversationDetailsResponse = await authorizedFetch({
            url: `${GET_CONVERSATION_DETAILS_API}?conversationId=${id}`,
            accessToken: req.cookies.accessToken,
            method: 'GET',
        });
        
        const messagesResponse = await authorizedFetch({
            url: `${GET_CONVERSATION_MESSAGES_API}?conversationId=${id}`,
            accessToken: req.cookies.accessToken,
            method: 'GET',
        });

        if (userInformation && conversationDetailsResponse.conversation && messagesResponse.messages) {
            return {
                props: {
                    user: userInformation.user,
                    accessToken: req.cookies.accessToken,
                    messages: messagesResponse.messages,
                    conversationDetails: conversationDetailsResponse.conversation,
                },
            };
        }
    }

    return {
        props: {
            user: "",
            accessToken: req.cookies.accessToken,
            messages: [],
            conversationDetails: {},
        },
    };
};

export default Conversations;
