
/*

Multi Service Platform - Bottom Menu Component for Login and Register Page
Created: Feb. 10, 2022
Last Updated: Feb. 11, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';



import React from 'react';



interface BottomMenuProps {
    type: 'LoginUser' | 'LoginProvider'
}


const BottomMenu: React.FC<BottomMenuProps> = ({ type }) => {
    return (
        <div className='login-register-right-bottom-row'>
            <Link href={type === 'LoginUser' ? '/provider' : '/login'} passHref={true}>
                <p className='main-purple-link'>
                    {type === 'LoginUser' ? 'Be a Provider' : 'Login as a User'}
                </p>
            </Link>
            <p style={{margin: '0 1em'}}>|</p>
            <p className='main-purple-link'>Help and Support</p>
        </div>
    )
}



export default BottomMenu;