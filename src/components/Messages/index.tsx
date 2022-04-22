
import React, { useEffect } from 'react';
import { useConversation } from '../../custom-hooks/useConversation';
import { useMessages } from '../../custom-hooks/useMessages';
import MessagesHeader from './Header';
import MessagesInput from './Input';
import Message from './Message';



import styles from './Messages.module.css';


interface MessagesProps {
    accessToken: string;
}


const Messages : React.FC<MessagesProps> = ({ accessToken }) => {

    const { messages } = useMessages();
    const { activeConvo } = useConversation();

    useEffect(() => {
        console.log(messages, activeConvo);
    }, [activeConvo, messages]);

    return (
        <>
            {
                !activeConvo || messages.length === 0 ? 
                <div className={styles.container}></div>
                :
                <div className={styles.container}>
                    <MessagesHeader />
                    <div className={styles.messagesContainer}>
                        {
                            messages && messages.map((message: any) => {
                                return <Message key={message.messageId} message={message}/>
                            })
                        }
                    </div>
                    <MessagesInput accessToken={accessToken}/>
                </div>
            }
        </>
    )
}



export default Messages;