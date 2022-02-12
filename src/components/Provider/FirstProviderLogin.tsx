
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
            <main>
                <div className='card'>
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