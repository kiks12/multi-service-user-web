

/*

Multi Service Platform - Top Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';



import { useAuthentication } from '../../custom-hooks/useAuthentication';
import useClickOutsideElement from '../../custom-hooks/useClickOutsideElement';



import TopNavbarPopUp from './TopNavbarPopUp';



const TopNavbar : React.FC = () => {

    // const {session} = useAuthentication();
    const [showPopup, setShowPopup] = useState<boolean>(false);


    const popupRef = useClickOutsideElement(() => setShowPopup(false));


    return (
        <div className='top-navbar'>

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
                            className='button gray-button'
                            >
                            Search
                        </button>
                    </div>
                </form>
            </div>


            <div className='top-navbar-ul-container'>
                <ul className='top-navbar-ul'>
                    <li className='top-navbar-li'>Messages</li>
                    <li 
                        className='top-navbar-li'
                    >
                        <div
                            style={{
                                position: 'relative'
                            }}
                            onClick={() => {
                                setShowPopup(true);
                            }}
                        >
                            Account
                            {showPopup && <TopNavbarPopUp setShowPopup={setShowPopup} />}
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}



export default TopNavbar;