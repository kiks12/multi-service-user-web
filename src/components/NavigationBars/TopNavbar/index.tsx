

/*

Multi Service Platform - Top Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';
import React, { useState } from 'react';



import AccountButton from '../AccountButton';
import TopNavbarPopUp from './Menu';
import ModalLeftNavbar from '../LeftNavbar/ModalLeftNavbar';
import SearchBar from './SearchBar';
import PopupSearchBar from './SearchBar/Popup';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
} from '@fortawesome/free-regular-svg-icons';
import {
    faMagnifyingGlass,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';



interface TopNavbarProps {
    accessToken: string;
}


const TopNavbar : React.FC <TopNavbarProps> = ({ accessToken }) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false); 
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);



    const closeMenu = () => {
        setShowMenu(false);
    }


    const closeSearchBar = () => {
        setShowSearchBar(false);
    }



    return (
        <>
            <AnimatePresence>
                {
                    showMenu && <ModalLeftNavbar closeMenu={closeMenu}/>
                }
            </AnimatePresence>
            {
                showSearchBar && <PopupSearchBar closeSearchBar={closeSearchBar}/>
            }
            <div className='top-navbar'>

                <div className='top-navbar-logo'>
                    <FontAwesomeIcon 
                        icon={faBars} 
                        size='lg'
                        className='top-navbar-menu'
                        onClick={() => {
                            setShowMenu(true);
                        }}
                    />
                    <h1>LOGO</h1>
                </div>

                <div className='top-navbar-search-form-container'>
                    <SearchBar />
                </div>


                <div className='top-navbar-ul-container'>
                    <ul className='top-navbar-ul'>
                        <li className='top-navbar-li'>
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                size='lg'
                                onClick={() => {
                                    setShowSearchBar(true);
                                }}
                            />
                        </li>
                        <li className='top-navbar-li'>
                            <FontAwesomeIcon icon={faMessage} size='lg' />
                        </li>

                        <Link href='/provider' passHref={true} >
                            <li className='top-navbar-li'>
                                <p>My Shop</p>
                            </li>
                        </Link>
                        
                        <li 
                            className='top-navbar-li'
                            style={{
                                position: 'relative'
                            }}
                        >
                            {
                                accessToken ? (  
                                    <>
                                        <AccountButton 
                                            onClick={() => setShowPopup(true)}
                                        /> 
                                        {
                                            showPopup && <TopNavbarPopUp setShowPopup={setShowPopup} />
                                        }
                                    </>                       
                                ) : (
                                    <Link href='/login' passHref={true}>
                                        <button className="button">Login</button>
                                    </Link>
                                )
                            }
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}





export default TopNavbar;