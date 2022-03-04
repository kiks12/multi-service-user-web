
/*

Multi Service Platform - Account Button For Top Navigation Component
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: TOlentino, Francis James S.

*/

import Image from 'next/image';



import React from 'react';



import { useAuthentication } from '../../../custom-hooks/useAuthentication';



interface AccountButtonProps {
    onClick: () => void;
}



const AccountButton: React.FC<AccountButtonProps> = ({ onClick }) => {

    const { session } = useAuthentication();


    return (

        <div
            onClick={() => onClick()}
        >
            {
                session && (  
                    <>
                        <div
                            className='account-circle'
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

                    </>                       
                ) 
            }
        </div>

    )
}



export default AccountButton;