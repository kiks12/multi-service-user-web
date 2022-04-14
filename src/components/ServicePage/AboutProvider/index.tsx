
/*

Multi Service Platform - Service Page About the Provider Component
Created: Feb. 24, 2022
Last Updated: Apr. 14, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import Image from 'next/image';
import { useRouter } from 'next/router';
import authorizedFetch from '../../../../utils/authorizedFetch';
import { CREATE_CONVERSATION_API, GET_CONVERSATION_DETAILS_API } from '../../../constants';
import { User } from '../../../../types';



interface AboutProviderProps {
    user: User;
    accessToken: string;
}



const AboutProvider: React.FC<AboutProviderProps> = ({ user, accessToken }) => {

    const router = useRouter();



    const messageProvider = async () => {
        const conversationDetailsRes = await authorizedFetch({
            url: `${GET_CONVERSATION_DETAILS_API}?userTwo=${user.userId}`,
            accessToken: accessToken,
            method: 'GET'
        })

        if (conversationDetailsRes.status === 200) {
            console.log(conversationDetailsRes);
            router.push(`/messages/${conversationDetailsRes.conversation.conversationId}`);
        }

        const createdConversation = await authorizedFetch({
            url: `${CREATE_CONVERSATION_API}?userTwo=${user.userId}`,
            method: 'POST',
            accessToken: accessToken,
        });
        
        if (createdConversation.status === 200) {
            router.push(`/messages/${createdConversation.conversation.conversationId}`);
        }
    }


    
    return (
        <div style={{
            margin: '2em 0'
        }}>
            <h3>About the Provider</h3>

            <div style={{
                margin: '1em 0',
                display: 'flex',

            }}>
                <div 
                    className='account-circle'
                    style={{
                        width: '7em',
                        height: '7em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyItems: 'center',
                        zIndex: '-20'
                    }}
                >
                    {
                        user.image &&
                        <Image
                            src={user.image as string} 
                            alt={user.username as string}
                            height={120}
                            width={120}
                            objectFit='fill'
                        />
                    }
                </div>
                <div style={{
                    width: '50%',
                    marginInline: '1em'
                }}>
                    <h4>{user.username}</h4>
                    <p>How can I help you today?</p>
                    <div className='split'>
                        <button 
                            className='ghost-button'
                            onClick={messageProvider}
                        >
                            Message
                        </button>
                        <button 
                            className='ghost-button'
                            onClick={() => router.push(`/provider/page/${user.userId}`)}
                        >
                            View Shop
                        </button>
                    </div>
                </div>
            </div>


            <div>
                <small className='secondary-purple-text'>Shop Description</small>
                <p>{user.description}</p>
            </div>

        </div>
    )
}



export default AboutProvider;