

/*

Multi Service Platform - Top Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';
import React, { useState } from 'react';



import AccountButton from './AccountButton';
import TopNavbarPopUp from './TopNavbarPopUp';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
} from '@fortawesome/free-regular-svg-icons';
import {
    faMagnifyingGlass,
    faBars
} from '@fortawesome/free-solid-svg-icons';


interface TopNavbarProps {
    accessToken: string;
}


const TopNavbar : React.FC <TopNavbarProps> = ({ accessToken }) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);




    return (
        <div className='top-navbar'>

            <div className='top-navbar-logo'>
                <FontAwesomeIcon 
                    icon={faBars} 
                    size='lg'
                    className='top-navbar-menu'
                />
                <h1>LOGO</h1>
            </div>

            <div className='top-navbar-search-form-container'>
                <form className='top-navbar-search-form'>
                    <input 
                        type='text'
                        placeholder='Search for Services'
                        className='form-control'
                    />
                    <div 
                        style={{
                            width: '20%'
                        }}
                    >
                        <button
                            type='submit'
                            className='button'
                            >
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass}
                                style={{
                                    color: 'var(--secondaryPurple)',
                                }}
                            />
                        </button>
                    </div>
                </form>
            </div>


            <div className='top-navbar-ul-container'>
                <ul className='top-navbar-ul'>
                    <li className='top-navbar-li'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg'/>
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
    )
}





export default TopNavbar;