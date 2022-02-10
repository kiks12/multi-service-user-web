

/*

Multi Service Platform - Top Navigation Bar Component
Created: Feb. 09, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';



import { useAuthentication } from '../../custom-hooks/useAuthentication';



import TopNavbarPopUp from './TopNavbarPopUp';



const TopNavbar : React.FC = () => {

    const { session } = useAuthentication();
    const [showPopup, setShowPopup] = useState<boolean>(false);




    return (
        <div className='top-navbar'>

            <div className='top-navbar-search-form-container'>
                <form className='top-navbar-search-form'>
                    <input 
                        type='text'
                        placeholder='Search for Services'
                        className='form-control'
                    />
                    <div 
                        style={{
                            width: '20%'
                        }}
                    >
                        <button
                            type='submit'
                            className='button gray-button'
                            >
                            Search
                        </button>
                    </div>
                </form>
            </div>


            <div className='top-navbar-ul-container'>
                <ul className='top-navbar-ul'>
                    <li className='top-navbar-li'>Messages</li>
                    
                    <li 
                        className='top-navbar-li'
                        style={{
                            position: 'relative'
                        }}
                    >
                        {
                            session ? (  
                                <>
                                    <div
                                        className='account-circle'
                                        onClick={() => {
                                            setShowPopup(true);
                                        }}
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
                                        showPopup && <TopNavbarPopUp setShowPopup={setShowPopup} />
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

        </div>
    )
}



export default TopNavbar;