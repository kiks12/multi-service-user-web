
import Link from 'next/link';
import Image from 'next/image';



import { useRouter } from 'next/router';
import React, { useEffect } from 'react';



import styles from './Convo.module.css';
import { useConversation } from '../../../custom-hooks/useConversation';



interface ConvoProps {
    conversation: any;
}


const Convo : React.FC<ConvoProps> = ({ conversation }) => {

    const { setActiveConvo } = useConversation();
    const router = useRouter();
    const { id } = router.query;

    
    const containerClickHandler = () => {
        if (typeof setActiveConvo === 'function') setActiveConvo(conversation);
        if (router.pathname.includes('provider')) {
            router.push(`/provider/messages/${conversation.conversationId}`);
        } else {
            router.push(`/messages/${conversation.conversationId}`);
        }
    }


    useEffect(() => {
        return () => {
            if (typeof setActiveConvo === 'function') setActiveConvo(null);
        }
    }, [setActiveConvo]);


    return (
        <div 
            className={id === conversation.conversationId ? styles.containerActive : styles.container}
            onClick={containerClickHandler}
        >
            <div className={styles.circle}>
                {
                    conversation.image &&
                    <Image 
                        src={conversation.image}
                        alt={conversation.to}
                        height={50}
                        width={50}
                    />
                }
            </div>
            <div>
                <p>{conversation.to}</p>
                <small>You: {conversation.recentMessage}</small>
            </div>
        </div>
    )
}



export default Convo;