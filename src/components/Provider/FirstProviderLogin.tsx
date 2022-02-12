
/*

Multi Service Platform - First Provider Login Page
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import Link from 'next/link';



import React from 'react';



const FirstProviderLogin: React.FC = () => {
    return (
        <>
            <main className='provider-login-main-container'>
                <div className='card'>
                    <h1>Welcome!</h1>
                    <small>Click the button to get started as a service provider</small>

                    <Link href='/provider/get-started' passHref={true}>
                        <button className='button main-button'>
                            Get Started
                        </button>
                    </Link>
                </div>
            </main>
        </>
    )
}



export default FirstProviderLogin;