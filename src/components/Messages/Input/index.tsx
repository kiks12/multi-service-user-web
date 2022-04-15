
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import authorizedFetch from '../../../../utils/authorizedFetch';
import { SEND_MESSAGE_API } from '../../../constants';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';
import { useConversation } from '../../../custom-hooks/useConversation';
import { useMessages } from '../../../custom-hooks/useMessages';
import useWebSocket from '../../../custom-hooks/useWebSocket';



import styles from './Input.module.css';


interface MessagesInputProps {
    accessToken: string;
}



const MessagesInput : React.FC<MessagesInputProps> = ({ accessToken }) => {

    const [message, setMessage] = useState<string>('');
    const { session } = useAuthentication();
    const { activeConvo } = useConversation();
    const socket = useWebSocket();
    const { setMessages } = useMessages();


    const messageOnChangeHandler = (e: any) => {
        setMessage(e.target.value);
    }


    const sendMessage = async (e: any) => {
        e.preventDefault();
        // const messageRes = await authorizedFetch({
        //     url: `${SEND_MESSAGE_API}?userTwo=${activeConvo.toId}`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         message: message, 
        //         conversationId: activeConvo.conversationId,
        //     }),
        //     method: 'POST',
        //     accessToken: accessToken, 
        // });

        // if (messageRes.status === 200) {
        socket.emit('sendMessage', JSON.stringify({
            userOne: session?.userId,
            userTwo: activeConvo.toId,
            message,
            conversationId: activeConvo.conversationId,
        }));
        // socket.on('messageSent', (payload) => {
        //     console.log(payload);
        //     if (typeof setMessages === 'function') {
        //         setMessages(prev => [...prev, JSON.parse(payload)]);
        //     }
        // });
        // }
    }


    useEffect(() => {
        socket.on('messageSent', (payload) => {
            if (typeof setMessages === 'function') {
                setMessages(prev => [...prev, JSON.parse(payload)]);
            }
        })
    }, [setMessages, socket]);


    return (
        <div className={styles.container}>
            <div>
                <FontAwesomeIcon 
                    icon={faCirclePlus}
                />
            </div>
            <form onSubmit={sendMessage}>
                <textarea 
                    value={message}
                    onChange={messageOnChangeHandler}
                    className='form-control'
                    required={true}
                    placeholder='Message....'
                />
                <button 
                    type='submit' 
                    className='main-button'
                    onSubmit={sendMessage}
                >
                    Send
                </button>
            </form>
        </div>
    );
}



export default MessagesInput;