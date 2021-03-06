import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../../custom-hooks/useAuthentication";
import { useConversation } from "../../../custom-hooks/useConversation";
import { useMessages } from "../../../custom-hooks/useMessages";
import useWebSocket from "../../../custom-hooks/useWebSocket";

import styles from "./Input.module.css";

interface MessagesInputProps {
    accessToken: string;
    containerRef: React.RefObject<HTMLDivElement>;
    secondContainerRef: React.RefObject<HTMLDivElement>;
}

const MessagesInput: React.FC<MessagesInputProps> = ({ containerRef, secondContainerRef }) => {
    const [message, setMessage] = useState<string>("");
    const { session } = useAuthentication();
    const { activeConvo } = useConversation();
    const socket = useWebSocket();
    const { setMessages } = useMessages();

    const messageOnChangeHandler = (e: any) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e: any) => {
        e.preventDefault();
        socket.emit(
            "sendMessage",
            JSON.stringify({
                userOne: session?.userId,
                userTwo: activeConvo.toId,
                message,
                conversationId: activeConvo.conversationId,
            })
        );
        setMessage("");
    };

    useEffect(() => {
        socket.on("messageSent", (payload) => {
            if (typeof setMessages === "function") {
                setMessages((prev) => [...prev, JSON.parse(payload)]);
                
                if (containerRef.current && secondContainerRef.current) {
                    containerRef.current.scrollTo(0, secondContainerRef.current.offsetHeight);
                }

            }
        });
    }, [setMessages, socket]);

    return (
        <div className={styles.container}>
            <div>
                <FontAwesomeIcon icon={faCirclePlus} />
            </div>
            <form onSubmit={sendMessage}>
                <textarea
                    value={message}
                    onChange={messageOnChangeHandler}
                    className="form-control"
                    required={true}
                    placeholder="Message...."
                />
                <button
                    type="submit"
                    className="main-button"
                    onSubmit={sendMessage}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessagesInput;
