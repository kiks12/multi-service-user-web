
import React from 'react';
import MessagesHeader from './Header';



import styles from './Messages.module.css';



const Messages : React.FC = () => {
    return (
        <div className={styles.container}>
            <MessagesHeader />
        </div>
    )
}



export default Messages;