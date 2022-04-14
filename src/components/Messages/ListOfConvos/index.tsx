

import React, { useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';



import authorizedFetch from '../../../../utils/authorizedFetch';
import { GET_LIST_OF_CONVERSATIONS_API } from '../../../constants';
import styles from './List.module.css';



import Convo from '../Convo';



interface ListOfConvosProps {
    accessToken: string;
}



const ListOfConvos : React.FC<ListOfConvosProps> = ({accessToken}) => {

    const [conversations, setConversations] = useState<any[]>([]);
    const { session } = useAuthentication();

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
                to: to,
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