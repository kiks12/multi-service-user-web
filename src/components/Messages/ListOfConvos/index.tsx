

import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useAuthentication } from '../../../custom-hooks/useAuthentication';



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
    // const { session } = useAuthentication();
    const { setActiveConvo } = useConversation();
    const router = useRouter();



    // const filteredConversations = useMemo(() => {
    //     if (conversations.length === 0 ) return [];
    //     const filtered = conversations.filter((convo: any, idx: number) => {
    //         if (idx === conversations.length - 1) setStatus('Complete');
    //         return convo.myRole !== role;
    //     })

    //     return filtered;
    // }, [conversations, role]);



    const getListOfConversations = useCallback(async () => {
        const res = await authorizedFetch({
            url: `${GET_LIST_OF_CONVERSATIONS_API}?myRole=${role}`,
            method: 'GET',
            accessToken: accessToken,
        });
        return res;
    }, [accessToken, role]);



    // const processConversationsData = useCallback(async (conversations: any[]) => {
    //     let conversationsData : any[] = [];
    //     conversations.forEach((convo: any) => {
    //         let to = '';
    //         let role = '';
    //         if (convo.UserOne.userId === session?.userId) {
    //             if (convo.userOneRole === 'Client') {
    //                 to = convo.UserTwo.shopName;
    //                 role = 'CLIENT';
    //             } else {
    //                 to = convo.UserTwo.username;
    //                 role = 'PROVIDER';
    //             }
    //         } else {
    //             if (convo.userTwoRole === 'Client') {
    //                 to = convo.UserOne.shopName;
    //                 role = 'PROVIDER';
    //             } else {
    //                 to = convo.UserOne.username;
    //                 role = 'CLIENT';
    //             }
    //         }
    //         conversationsData.push({
    //             conversationId: convo.conversationId,
    //             image: convo.UserOne.userId === session?.userId ? convo.UserTwo.image : convo.UserOne.image,
    //             to: to,
    //             toId: convo.UserOne.userId === session?.userId ? convo.UserTwo.userId : convo.UserOne.userId,
    //             status: convo.UserOne.userId === session?.userId ? convo.userOneStatus : convo.userTwoStatus,
    //             recentMessage: '',
    //             myRole: role,
    //         });
    //     });

    //     return Promise.resolve(conversationsData);
    // }, [session?.userId]);



    const setConversationsState = useCallback(async () => {
        const conversationsRes = await getListOfConversations();
        // const finalData = await processConversationsData(conversationsRes.conversations);
        setConversations(conversationsRes.conversations);
    }, [getListOfConversations]);

    

    useEffect(() => {
        setConversationsState();

        return () => {
            setConversations([]);
        };
    }, [setConversationsState]);



    useEffect(() => {
        if (conversations.length !== 0 && typeof setActiveConvo === 'function') {
            setActiveConvo(conversations[0]);
        }
    }, [conversations, setActiveConvo]);



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