

/*

Multi Service Platform - Pop Up Component in Navigation Bar
Created: Feb. 09, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import useClickOutsideElement from '../../custom-hooks/useClickOutsideElement';
import { useAuthentication } from '../../custom-hooks/useAuthentication';



interface Props {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}



const TopNavbarPopUp: React.FC<Props> = ({ setShowPopup }) => {


    const { logout } = useAuthentication();


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
                    onClick={() => logout()}
                >
                    Logout
                </li>
            </ul>
        </div>
    )
}



export default TopNavbarPopUp;