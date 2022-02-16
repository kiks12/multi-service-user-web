
/*

Multi Service Platform - Provider Page Top Navigation Bar Component
Created: Feb. 12, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';



import React from 'react';



import AccountButton from '../../NavigationBars/AccountButton';



const ProviderTopNavbar: React.FC = () => {



    return (
        <div className='top-navbar'>
            <h1>LOGO</h1>

            <ul className='top-navbar-ul'
            >
                <Link href='/' passHref={true} >
                    <li className='top-navbar-li'>Switch to buying</li>
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