import React, { useEffect, useRef } from "react";
import { useConversation } from "../../custom-hooks/useConversation";
import { useMessages } from "../../custom-hooks/useMessages";
import MessagesHeader from "./Header";
import MessagesInput from "./Input";
import Message from "./Message";

import styles from "./Messages.module.css";

interface MessagesProps {
    accessToken: string;
}

const Messages: React.FC<MessagesProps> = ({ accessToken }) => {
    const { messages } = useMessages();
    const { activeConvo } = useConversation();
    const containerRef = useRef<HTMLDivElement>(null);
    const secondContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {!activeConvo && messages.length === 0 ? (
                <div className={styles.container}>Loading....</div>
            ) : (
                <div className={styles.container}>
                    <MessagesHeader />
                    <div
                        className={styles.messagesContainer}
                        ref={containerRef}
                    >
                        <div ref={secondContainerRef}>
                            {
                                messages &&
                                messages.map((message: any) => {
                                    return (
                                        <Message
                                            key={message.messageId}
                                            message={message}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                    <MessagesInput 
                        accessToken={accessToken}  
                        containerRef={containerRef}
                        secondContainerRef={secondContainerRef}
                    />
                </div>
            )}
        </>
    );
};

export default Messages;
