
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";
import fetchUserInformation from "../../../libs/fetchUserInformation";
import Layout from "../../../src/components/layout/Layout";
import Messages from "../../../src/components/Messages";
import MessagesLayout from "../../../src/components/Messages/Layout";
import ListOfConvos from "../../../src/components/Messages/ListOfConvos";
import { GET_CONVERSATION_MESSAGES_API } from "../../../src/constants";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";
import { useConversation } from "../../../src/custom-hooks/useConversation";
import { useMessages } from "../../../src/custom-hooks/useMessages";
import authorizedFetch from "../../../utils/authorizedFetch";


const Conversations : NextPage = ({
    user, accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const { setMessages } = useMessages();
    const { activeConvo } = useConversation();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    useEffect(() => {
        const getMessages = async () => {
            const messagesRes = await authorizedFetch({
                url: `${GET_CONVERSATION_MESSAGES_API}?conversationID=${activeConvo.conversationId}`,
                method: 'GET',
                accessToken: accessToken,
            });

            if (messagesRes.status === 200 && typeof setMessages === 'function') {
                setMessages(messagesRes.messages);
            }
        }


        getMessages();

        return () => {
            if (typeof setMessages === 'function') setMessages([]);
        }
    }, [accessToken, activeConvo.conversationId, setMessages]);


    return (
        <Layout accessToken={accessToken}>
            <MessagesLayout>
                <ListOfConvos accessToken={accessToken}/>
                <Messages accessToken={accessToken}/>
            </MessagesLayout>
        </Layout>
    )
}


export const getServerSideProps : GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies.accessToken);

        if (userInformation) {
            return {
                props: {
                    user: userInformation.user,
                    accessToken: req.cookies.accessToken,
                }
            }
        }

    }

    return {
        props: {
            user: '',
            accessToken: req.cookies.accessToken,
        }
    }
}


export default Conversations;