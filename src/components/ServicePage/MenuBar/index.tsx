
/*

Multi Service Platform - Service Page Menu Bar COmponent
Created: Feb. 24, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import styles from './MenuBar.module.css';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faFlag,
} from '@fortawesome/free-regular-svg-icons'
import { 
    faShare
} from '@fortawesome/free-solid-svg-icons';



import React, { useState } from 'react';



type ActivePart = 'Overview' | 'Description' | 'AboutProvider' | 'Reviews' | 'FAQs';



const MenuBar: React.FC = () => {

    const [activePart, setActivePart] = useState<ActivePart>('Overview');


    return (
        <div
            className={styles.menuContainer}
        >
            <div className={styles.menuScrollWrapper}>
                <ul className={styles.menuUl}>
                    <li className={activePart === 'Overview' ? 'menu-li-active' : 'menu-li'}>Overview</li>
                    <li className={activePart === 'Description' ? 'menu-li-active' : 'menu-li'}>Description</li>
                    <li className={activePart === 'AboutProvider' ? 'menu-li-active' : 'menu-li'}>About the Provider</li>
                    <li className={activePart === 'Reviews' ? 'menu-li-active' : 'menu-li'}>Reviews</li>
                    <li className={activePart === 'FAQs' ? 'menu-li-active' : 'menu-li'}>FAQs</li>
                </ul>
            </div>


            <div className={styles.controlsContainer}>
                <button>
                    <FontAwesomeIcon 
                        icon={faBookmark}
                    />
                    <p>Add to bookmarks</p>
                </button>
                <button>
                    <FontAwesomeIcon 
                        icon={faFlag}
                    />
                    <p>Report</p>
                </button>
                <button>
                    <FontAwesomeIcon 
                        icon={faShare}
                    />
                    <p>Share Service</p>
                </button>
            </div>
        </div>
    )
}



export default MenuBar;