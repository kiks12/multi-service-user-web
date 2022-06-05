
/*

Multi Service Platform - Provider Page Top Navigation Bar Component
Created: Feb. 12, 2022
Last Updated: Mar. 05, 2022
Author: Tolentino, Francis James S.

*/



import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';



import React from 'react';



import AccountButton from '../../../NavigationBars/AccountButton';



const ProviderTopNavbar: React.FC = () => {

    const [showPopup, setShowPopup] = useState

    return (
        <div className='top-navbar'>
            <h1>LOGO</h1>

            <ul className='top-navbar-ul'
            >
                <li className='top-navbar-li'>
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass}
                    />
                </li>
                <Link href='/provider/messages' passHref={true} >
                    <li className='top-navbar-li'>
                        <p>Messages</p>
                    </li>
                </Link>
                <Link href='/' passHref={true} >
                    <li className='top-navbar-li'>
                        <p>Switch to buying</p>
                    </li>
                </Link>
                <li className='top-navbar-li'>
                    <AccountButton 
                        onClick={() => {}}
                    />
                </li>
            </ul>
        </div>
    )
}



export default ProviderTopNavbar;
