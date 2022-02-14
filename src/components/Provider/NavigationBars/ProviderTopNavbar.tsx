
/*

Multi Service Platform - Provider Page Top Navigation Bar Component
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



import { useAuthentication } from '../../../custom-hooks/useAuthentication';



const ProviderTopNavbar: React.FC = () => {

    const { session } = useAuthentication();


    return (
        <div>
            <h1>{session?.shopName}</h1>

            <ul>
                <li>Switch to buying</li>
                <li>
                    {
                            session ? (  
                                <>
                                    <div
                                        className='account-circle'
                                        // onClick={() => {
                                        //     setShowPopup(true);
                                        // }}
                                    >
                                        {
                                            session?.image && <Image 
                                                                src={session?.image as string} 
                                                                alt='profile' 
                                                                width={50}
                                                                height={50}
                                                                objectFit='cover' 
                                                                />
                                        }
                                        
                                    </div>
                                    {
                                        // showPopup && <TopNavbarPopUp setShowPopup={setShowPopup} />
                                    }
                                </>                       
                            ) : (
                                <Link href='/login' passHref={true}>
                                    <button className="button">Login</button>
                                </Link>
                                )
                        }
                </li>
            </ul>
        </div>
    )
}



export default ProviderTopNavbar;