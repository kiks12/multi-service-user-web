
/*

Multi Service Platform - Left Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';



import Link from 'next/link';



import useActivePage from '../../custom-hooks/useActivePage';



const ACTIVE_PAGE = 'left-navbar-li-active';
const INACTIVE_PAGE = 'left-navbar-li';



const LeftNavbar : React.FC = () => {

    const activePage = useActivePage();
    

    return (
        <div className='left-navbar'>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <h1>LOGO</h1>
            </div>
            
            <div
                style={{
                    margin: '2em 0 0 0'
                }}
            >
                <ul>
                    <Link href='/' passHref={true}>
                        <li className={activePage === 'Home' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                            Home
                        </li>
                    </Link>
                    <Link href='/explore' passHref={true}>
                        <li className={activePage === 'Explore' ? ACTIVE_PAGE : INACTIVE_PAGE}>Explore</li>
                    </Link>
                    <Link href='/bookings' passHref={true}>
                        <li className='left-navbar-li'>Bookings</li>
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
                        <li className={activePage === 'Bookmarks' ? ACTIVE_PAGE : INACTIVE_PAGE}>Bookmarks</li>
                    </Link>
                    <li className='left-navbar-li'>Liked Services</li>
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
                    <li className='left-navbar-li'>Business A</li>
                </ul>
            </div>

        </div>
    )
}



export default LeftNavbar;