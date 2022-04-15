
import React from 'react';
import { useMessages } from '../../custom-hooks/useMessages';
import MessagesHeader from './Header';
import MessagesInput from './Input';
import Message from './Message';



import styles from './Messages.module.css';


interface MessagesProps {
    accessToken: string;
}


const Messages : React.FC<MessagesProps> = ({accessToken}) => {

    const { messages } = useMessages();

    return (
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
    )
}



export default Messages;