
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useConversation } from '../../../custom-hooks/useConversation';


import styles from './Header.module.css';



const MessagesHeader : React.FC = () => {

    const { activeConvo } = useConversation();


    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.circle}>
                    {
                        activeConvo.image &&
                        <Image 
                            src={`${activeConvo.image}`}
                            alt={activeConvo.to}
                            height={50}
                            width={50}
                        />
                    }
                </div>
                <p>{activeConvo.to}</p>
            </div>

            <div className={styles.infoContainer}>
                <FontAwesomeIcon 
                    icon={faSearch}
                />
                <FontAwesomeIcon 
                    icon={faEllipsis}
                />
            </div>
        </div>
    )
}



export default MessagesHeader;