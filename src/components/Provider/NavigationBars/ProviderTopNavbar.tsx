
/*

Multi Service Platform - Provider Page Top Navigation Bar Component
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';
import React from 'react';



import AccountButton from '../../NavigationBars/AccountButton';



const ProviderTopNavbar: React.FC = () => {



    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <h1>Logo</h1>

            <ul 
                style={{
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Link href='/' passHref={true} >
                    <li>Switch to buying</li>
                </Link>
                <li>
                    <AccountButton 
                        onClick={() => {}}
                    />
                </li>
            </ul>
        </div>
    )
}



export default ProviderTopNavbar;