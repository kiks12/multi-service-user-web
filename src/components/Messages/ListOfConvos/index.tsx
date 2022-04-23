

import React, { useCallback, useEffect, useMemo, useState } from 'react';



import authorizedFetch from '../../../../utils/authorizedFetch';
import { GET_LIST_OF_CONVERSATIONS_API } from '../../../constants';
import styles from './List.module.css';



import Convo from '../Convo';
import { useRouter } from 'next/router';
import { useConversation } from '../../../custom-hooks/useConversation';



interface ListOfConvosProps {
    accessToken: string;
    role: 'PROVIDER' | 'CLIENT';
}



const ListOfConvos : React.FC<ListOfConvosProps> = ({accessToken, role}) => {

    const [conversations, setConversations] = useState<any[]>([]);
    const { setActiveConvo } = useConversation();
    const router = useRouter();



    const getListOfConversations = useCallback(async () => {
        const res = await authorizedFetch({
            url: `${GET_LIST_OF_CONVERSATIONS_API}?myRole=${role}`,
            method: 'GET',
            accessToken: accessToken,
        });
        return res;
    }, [accessToken, role]);



    const setConversationsState = useCallback(async () => {
        const conversationsRes = await getListOfConversations();
        setConversations(conversationsRes.conversations);
    }, [getListOfConversations]);

    

    useEffect(() => {
        setConversationsState();

        return () => {
            setConversations([]);
        };
    }, [setConversationsState]);



    useEffect(() => {
        if (conversations.length !== 0 && (router.pathname === '/provider/messages/' || router.pathname === '/messages/') && typeof setActiveConvo === 'function') {
            setActiveConvo(conversations[0]);
        }
    }, [conversations, router.pathname, setActiveConvo]);



    useEffect(() => {
        if (conversations.length !== 0 && router.pathname === '/messages') {
            router.push(`/messages/${conversations[0].conversationId}`);
        }

        if (conversations.length !== 0 && router.pathname === '/provider/messages') {
            router.push(`/provider/messages/${conversations[0].conversationId}`);
        }
    }, [conversations, router]); 




    return (
        <div className={styles.container}>
            <h2>Messages</h2>
            <div className={styles.grid}>
                {
                    conversations.length !== 0 ? (
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