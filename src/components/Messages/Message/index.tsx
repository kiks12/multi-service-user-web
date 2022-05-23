import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthentication } from "../../../custom-hooks/useAuthentication";
import MessageActions from "../Actions";

import styles from "./Message.module.css";

interface MessageProps {
    message: {
        messageId: number;
        conversationId: string;
        fromImage: string;
        fromId: string;
        toId: string;
        from: string;
        to: string;
        status: "SENT" | "DELETED";
        message: string;
        datetime: string;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const { session } = useAuthentication();
    const [openActions, setOpenActions] = useState<boolean>(false);

    const messageFromThisUser = () => {
        return session?.userId === message.fromId;
    };

    const closeActions = () => setOpenActions(false);

    return (
        <>
            <div
                className={
                    messageFromThisUser()
                        ? styles.containerFrom
                        : styles.containerTo
                }
            >
                {/* <div className={styles.circle}>
                    {
                        message.fromImage &&
                        <Image 
                        src={message.fromImage}
                        alt={message.from}
                        height={50}
                        width={50}
                        />
                    }
                </div> */}
                <p
                    className={
                        message.status === "SENT"
                            ? styles.message
                            : styles.unsentMessage
                    }
                >
                    {message.status === "SENT"
                        ? message.message
                        : "Message Unsent"}
                </p>
                <div
                    className={styles.ellipsis}
                    onClick={() => {
                        if (message.status === "DELETED") {
                            return;
                        }
                        setOpenActions(true);
                    }}
                >
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        style={{
                            color: "var(--secondaryPurple)",
                        }}
                    />
                    {openActions && (
                        <MessageActions
                            messageId={message.messageId}
                            closeActions={closeActions}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Message;
