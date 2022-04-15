
import Link from 'next/link';
import React from 'react';



import styles from './Convo.module.css';



interface ConvoProps {
    conversation: any;
}


const Convo : React.FC<ConvoProps> = ({conversation}) => {
    return (
        <Link href={`/messages/${conversation.conversationId}`} passHref={true}>
            <div className={styles.container}>
                <div>
                    <p>{conversation.to}</p>
                    <small>You: {conversation.recentMessage}</small>
                </div>
            </div>
        </Link>
    )
}



export default Convo;