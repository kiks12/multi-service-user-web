

/*

Multi Service Platform - Top Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';
import React, { useState } from 'react';



import { useAuthentication } from '../../custom-hooks/useAuthentication';
import AccountButton from './AccountButton';



import TopNavbarPopUp from './TopNavbarPopUp';



const TopNavbar : React.FC = () => {

    const { session } = useAuthentication();
    const [showPopup, setShowPopup] = useState<boolean>(false);




    return (
        <div className='top-navbar'>

            <div>
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
                            Search
                        </button>
                    </div>
                </form>
            </div>


            <div className='top-navbar-ul-container'>
                <ul className='top-navbar-ul'>
                    <li className='top-navbar-li'>Messages</li>

                    <Link href='/provider' passHref={true} >
                        <li className='top-navbar-li'>My Shop</li>
                    </Link>
                    
                    <li 
                        className='top-navbar-li'
                        style={{
                            position: 'relative'
                        }}
                    >
                        {
                            session ? (  
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