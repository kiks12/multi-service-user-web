
import React from 'react';



import styles from './Convo.module.css';



interface ConvoProps {
    conversation: any;
}


const Convo : React.FC<ConvoProps> = ({conversation}) => {
    return (
        <div className={styles.container}>
            <div>
                <p>{conversation.to}</p>
                <small>You: {conversation.recentMessage}</small>
            </div>
        </div>
    )
}



export default Convo;