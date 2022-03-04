
/*

Multi Service Platform - Left Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';



import Link from 'next/link';



import useActivePage from '../../custom-hooks/useActivePage';




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMagnifyingGlass,
    faBookmark,
    faCalendar,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons';




const ACTIVE_PAGE = 'left-navbar-li-active';
const INACTIVE_PAGE = 'left-navbar-li';



const LeftNavbar : React.FC = () => {

    const activePage = useActivePage();
    

    return (
        <div className='left-navbar'>
            
            <div>
                <ul>
                    <Link href='/' passHref={true}>
                        <li className={activePage === 'Home' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                            <FontAwesomeIcon icon={faHouse} size='lg'/>
                            <p className='left-navbar-li-text'>Home</p>
                        </li>
                    </Link>
                    <Link href='/explore' passHref={true}>
                        <li className={activePage === 'Explore' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg'/>
                            <p className='left-navbar-li-text'>Explore</p>
                        </li>
                    </Link>
                    <Link href='/bookings' passHref={true}>
                        <li className={activePage === 'Bookings' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                            <FontAwesomeIcon icon={faCalendar} size='lg'/>
                            <p className='left-navbar-li-text'>Bookings</p>
                        </li>
                    </Link>
                </ul>
            </div>

            <div
                style={{
                    margin: '3em 0 0 0',
                    borderTop: '0.3px solid var(--secondaryPurple)'
                }}
            >
                <ul>
                    <Link href='/bookmarks' passHref={true}>
                        <li className={activePage === 'Bookmarks' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                            <FontAwesomeIcon icon={faBookmark} size='lg'/>
                            <p className='left-navbar-li-text'>Bookmarks</p>
                        </li>
                    </Link>
                    <li className='left-navbar-li'>
                        <FontAwesomeIcon icon={faThumbsUp} size='lg'/>
                        <p className='left-navbar-li-text'>Liked Services</p>
                    </li>
                </ul>
            </div>



            <div
                style={{
                    margin: '3em 0 0 0',
                    borderTop: '0.3px solid var(--secondaryPurple)'
                }}
            >
                <div
                    style={{
                        padding: '0.6em'
                    }}
                >
                    <p className='secondary-purple-text'>Followings</p>
                </div>

                <ul>
                    {/* <li className='left-navbar-li'>Business A</li> */}
                </ul>
            </div>

        </div>
    )
}



export default LeftNavbar;