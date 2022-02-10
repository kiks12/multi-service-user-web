
/*

Multi Service Platform - Bottom Menu Component for Login and Register Page
Created: Feb. 10, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';



import React from 'react';



const BottomMenu: React.FC = () => {
    return (
        <div className='login-register-right-bottom-row'>
            <Link href='/provider' passHref={true}>
                <p className='main-purple-link'>Be a Provider</p>
            </Link>
            <p style={{margin: '0 1em'}}>|</p>
            <p className='main-purple-link'>Help and Support</p>
        </div>
    )
}



export default BottomMenu;