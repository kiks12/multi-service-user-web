
import React, { useEffect, useRef } from 'react';
import useWebSocket from '../../../custom-hooks/useWebSocket';
import { useMessages } from '../../../custom-hooks/useMessages';


import styles from './Actions.module.css';



interface MessageActionsProps {
    closeActions: () => void;
    messageId: number;
}



const MessageActions: React.FC<MessageActionsProps> = ({ closeActions, messageId }) => {

    const socket = useWebSocket();
    const { setMessages, processRawMessage} = useMessages();
    const divRef = useRef<HTMLDivElement>(null);


    const deleteMessage = async () => {
        socket.emit('deleteMessage', messageId);
    }


    useEffect(() => {
        if (divRef.current) {
            divRef.current.addEventListener('mouseleave', (e: any) => {
                closeActions();
            })
        }
    }, [closeActions]);


    useEffect(() => {
        socket.on('messageDeleted', (payload) => {
            const deletedMessage = JSON.parse(payload);
            console.log('payload: ', payload);
            console.log('deletedMessage: ,', deletedMessage);

            if (typeof setMessages === 'function') {
                setMessages(prev => prev.map(message => {
                    if (message.messageId === deletedMessage.messageId) {
                        return processRawMessage(deletedMessage);
                    }
                    return message;
                }))
            }
        })
    }, [processRawMessage, setMessages, socket]);


    return (
        <div
            className={styles.container}
            ref={divRef}
        >   
            <button>Copy</button>
            <button onClick={deleteMessage}>Delete Message</button>
            <button onClick={closeActions}>Cancel</button>
        </div>
    )
}



export default MessageActions;