
/*

Multi Service Platform - Service Page Menu Bar COmponent
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faFlag,
    faHeart
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
            style={{
                position: 'sticky',
                top: '0',
                backgroundColor: 'var(--white)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <ul className='menu-ul'>
                <li className={activePart === 'Overview' ? 'menu-li-active' : 'menu-li'}>Overview</li>
                <li className={activePart === 'Description' ? 'menu-li-active' : 'menu-li'}>Description</li>
                <li className={activePart === 'AboutProvider' ? 'menu-li-active' : 'menu-li'}>About the Provider</li>
                <li className={activePart === 'Reviews' ? 'menu-li-active' : 'menu-li'}>Reviews</li>
                <li className={activePart === 'FAQs' ? 'menu-li-active' : 'menu-li'}>FAQs</li>
            </ul>


            <div style={{
                display: 'flex',
                width: '16%'
            }}>
                {/* <button 
                    style={{
                        flex: '1',
                        margin: '0 0.5em'
                    }}
                >
                    <FontAwesomeIcon 
                        icon={faHeart}
                    />
                </button> */}
                <button 
                    style={{
                        flex: '1',
                        margin: '0 0.5em'
                    }}
                >
                    <FontAwesomeIcon 
                        icon={faBookmark}
                    />
                </button>
                <button style={{
                    flex: '1',
                    margin: '0 0.5em'
                }}>
                    <FontAwesomeIcon 
                        icon={faFlag}
                    />
                </button>
                <button style={{
                    flex: '1',
                    margin: '0 0.5em'
                }}>
                    <FontAwesomeIcon 
                        icon={faShare}
                    />
                </button>
            </div>
        </div>
    )
}



export default MenuBar;