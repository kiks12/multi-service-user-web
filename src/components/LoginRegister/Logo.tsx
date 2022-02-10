
/*

Multi Service Platform - Logo Component for Login and Register Page
Created: Feb. 10, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import Image from 'next/image';



import React from 'react';



const Logo : React.FC = () => {
    return (
        <div
            style={{
                borderRadius: '50%',
                width: '90vh',
                height: '90vh',
                overflow: 'hidden',
            }}
        >
            <Image 
                src='/try.svg'
                height={800}
                width={800}
                objectFit='cover'
            />
        </div>
    )
}



export default Logo;