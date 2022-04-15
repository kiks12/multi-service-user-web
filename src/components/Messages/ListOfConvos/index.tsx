

import React, { useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';



import authorizedFetch from '../../../../utils/authorizedFetch';
import { GET_LIST_OF_CONVERSATIONS_API } from '../../../constants';
import styles from './List.module.css';



import Convo from '../Convo';
import { useRouter } from 'next/router';
import { useConversation } from '../../../custom-hooks/useConversation';



interface ListOfConvosProps {
    accessToken: string;
}



const ListOfConvos : React.FC<ListOfConvosProps> = ({accessToken}) => {

    const [conversations, setConversations] = useState<any[]>([]);
    const { session } = useAuthentication();
    const { setActiveConvo } = useConversation();
    const router = useRouter();

    const getListOfConversations = useCallback(async () => {
        const res = await authorizedFetch({
            url: GET_LIST_OF_CONVERSATIONS_API,
            method: 'GET',
            accessToken: accessToken,
        });
        return res;
    }, [accessToken]);


    const processConversationsData = useCallback(async (conversations: any[]) => {
        let conversationsData : any[] = [];
        conversations.forEach((convo: any) => {
            let to = '';
            if (convo.UserOne.userId === session?.userId) {
                if (convo.userOneRole === 'Client') {
                    to = convo.UserTwo.shopName;
                } else {
                    to = convo.UserTwo.username;
                }
            } else {
                if (convo.userTwoRole === 'Client') {
                    to = convo.UserOne.shopName;
                } else {
                    to = convo.UserOne.username;
                }
            }
            conversationsData.push({
                conversationId: convo.conversationId,
                image: convo.UserOne.userId === session?.userId ? convo.UserTwo.image : convo.UserOne.image,
                to: to,
                toId: convo.UserOne.userId === session?.userId ? convo.UserTwo.userId : convo.UserOne.userId,
                status: convo.UserOne.userId === session?.userId ? convo.userOneStatus : convo.userTwoStatus,
                recentMessage: '',
            });
        });

        return conversationsData;
    }, [session?.userId]);


    const setConversationsState = useCallback(async () => {
        const conversationsRes = await getListOfConversations();
        const finalData = await processConversationsData(conversationsRes.conversations);
        setConversations(finalData);
    }, [getListOfConversations, processConversationsData]);


    useEffect(() => {
        setConversationsState();

        return () => {
            setConversations([]);
        }
    }, [setConversationsState]);


    useEffect(() => {
        if (conversations[0] && typeof setActiveConvo === 'function') {
            setActiveConvo(conversations[0]);
        }
    }, [conversations, setActiveConvo]);


    useEffect(() => {
        if (conversations[0] && router.pathname === '/messages') {
            router.push(`/messages/${conversations[0].conversationId}`);
        }
    }, [conversations, router]); 


    return (
        <div className={styles.container}>
            <h2>Messages</h2>
            <div className={styles.grid}>
                {
                    conversations ? (
                        conversations.map((convo: any) => {
                            return (
                                <Convo key={convo.conversationId} conversation={convo}/>
                            )
                        })
                    ) : (
                        <p>No Convos</p>
                    )
                }
            </div>
        </div>
    )
};



export default ListOfConvos;