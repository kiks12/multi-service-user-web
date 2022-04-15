
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';


import styles from './Message.module.css';



interface MessageProps {
    message: {
        messageId: number,
        conversationId: string,
        fromImage: string,
        fromId: string;
        toId: string;
        from: string;
        to: string;
        message: string;
        datetime: string;
    }
}



const Message : React.FC<MessageProps> = ({ message }) => {

    const { session } = useAuthentication();

    const messageFromThisUser = () => {
        return session?.userId === message.fromId;
    }

    return (
        <div className={messageFromThisUser() ? styles.containerFrom : styles.containerTo}>
            <div className={styles.circle}>
                {
                    message.fromImage &&
                    <Image 
                       src={message.fromImage}
                       alt={message.from}
                       height={50}
                       width={50}
                    />
                }
            </div>
            <p className={styles.message}>{message.message}</p>
        </div>
    )
}



export default Message;