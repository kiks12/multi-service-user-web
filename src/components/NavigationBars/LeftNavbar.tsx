
/*

Multi Service Platform - Left Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';



const LeftNavbar : React.FC = () => {


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
                    <li className='left-navbar-li-active'>Home</li>
                    <li className='left-navbar-li'>Explore</li>
                    <li className='left-navbar-li'>Bookings</li>
                </ul>
            </div>

            <div
                style={{
                    margin: '3em 0 0 0',
                    borderTop: '0.3px solid var(--secondaryPurple)'
                }}
            >
                <ul>
                    <li className='left-navbar-li'>Bookmarks</li>
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