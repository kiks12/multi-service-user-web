
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";



import Layout from "../../../src/components/layout/Layout";
import Messages from "../../../src/components/Messages";
import MessagesLayout from "../../../src/components/Messages/Layout";
import ListOfConvos from "../../../src/components/Messages/ListOfConvos";



import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";
import { useConversation } from "../../../src/custom-hooks/useConversation";
import { useMessages } from "../../../src/custom-hooks/useMessages";



import fetchUserInformation from "../../../libs/fetchUserInformation";
import { useRouter } from "next/router";
import useWebSocket from "../../../src/custom-hooks/useWebSocket";



const Conversations : NextPage = ({
    user, accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const { getMessages } = useMessages();
    const { activeConvo, getConversationDetails } = useConversation();
    const router = useRouter();
    const socket = useWebSocket();
    const { id } = router.query;


    useEffect(() => {   

         if (id) {
            getConversationDetails(id as string, accessToken);
            getMessages(id as string, accessToken);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (activeConvo) {
            socket.emit('joinConversation', activeConvo.conversationId);
        }
    }, [activeConvo, socket]);


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    return (
        <Layout accessToken={accessToken}>
            <MessagesLayout>

                <ListOfConvos accessToken={accessToken} role='CLIENT'/>
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