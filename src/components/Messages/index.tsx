import React, { useEffect, useRef, useState } from "react";
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
    const { messages, getPaginatedMessages } = useMessages();
    const { activeConvo } = useConversation();
    const containerRef = useRef<HTMLDivElement>(null);
    const secondContainerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        if (containerRef.current && secondContainerRef.current) {
            containerRef.current.scrollTo(
                0,
                secondContainerRef.current.offsetHeight
            );
        }
    }, [secondContainerRef.current, containerRef.current]);

    const fetchPaginatedMessages = () => {
        if (containerRef.current?.scrollTop === 0) {
            getPaginatedMessages(activeConvo.conversationId, accessToken);
        }
    };

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
                        onScroll={fetchPaginatedMessages}
                    >
                        <div ref={secondContainerRef}>
                            {messages &&
                                messages.map((message: any, idx: number) => {
                                    return (
                                        <Message
                                            key={message.messageId}
                                            message={message}
                                        />
                                    );
                                })}
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
