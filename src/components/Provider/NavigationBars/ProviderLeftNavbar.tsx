


import Link from 'next/link';



import React from 'react';



import useActivePage from '../../../custom-hooks/useActivePage';



const ACTIVE_PAGE = 'provider-left-navbar-li-active';
const INACTIVE_PAGE = 'provider-left-navbar-li';



const ProviderLeftNavbar: React.FC = () => {

    const activePage = useActivePage();


    return (
        <div>
            <ul className='provider-left-navbar-ul'>
                <Link href='/provider' passHref={true}>
                    <li className={activePage === 'Provider-Overview' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                        Overview
                    </li>
                </Link>
                <Link href='/provider/services' passHref={true}>
                    <li className={activePage === 'Provider-Services' ? ACTIVE_PAGE : INACTIVE_PAGE}>
                        Services
                    </li>
                </Link>

                <li className='provider-left-navbar-li'>Settings</li>
            </ul>
        </div>
    )
}



export default ProviderLeftNavbar;