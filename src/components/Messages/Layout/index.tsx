
import React from 'react';


import styles from './Layout.module.css';


const MessagesLayout : React.FC = ({children}) => {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    )
};



export default MessagesLayout;