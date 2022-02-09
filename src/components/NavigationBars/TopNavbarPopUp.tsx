

/*

Multi Service Platform - Pop Up Component in Navigation Bar
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import useClickOutsideElement from '../../custom-hooks/useClickOutsideElement';
import { useAuthentication } from '../../custom-hooks/useAuthentication';



import { signOut } from 'firebase/auth';
import { auth } from '../../../scripts/firebase';



interface Props {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}



const TopNavbarPopUp: React.FC<Props> = ({ setShowPopup }) => {


    const { clearSession } = useAuthentication();


    const popupRef = useClickOutsideElement(() => {
        setShowPopup(false);
    })


    return (
        <div className='top-navbar-popup' ref={popupRef}>
            <ul className='top-navbar-popup-ul'>
                <li className='top-navbar-popup-li'>Profile</li>
                <li className='top-navbar-popup-li'>Settings</li>
                <li className='top-navbar-popup-li'>Help and Support</li>
                <li 
                    className='top-navbar-popup-li'
                    onClick={() => {
                        clearSession();
                        signOut(auth);
                    }}
                >
                    Logout
                </li>
            </ul>
        </div>
    )
}



export default TopNavbarPopUp;