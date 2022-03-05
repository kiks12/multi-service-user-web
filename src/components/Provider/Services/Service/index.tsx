
/*

Multi Service Platform - Provider Service Component in Services Content Section
Created: Feb. 14, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faEllipsis
} from '@fortawesome/free-solid-svg-icons';



// import Image from 'next/image';



import React from 'react';
import { __backend__ } from '../../../../constants';
import Link from 'next/link';



interface ServiceProps {
    service: {
        serviceId: number, 
        status: 'active' | 'inactive', 
        title: string,
        priceType: 'Range' | 'Flat Rate',
        serviceDetails: string, 
        userId: number, 
        dislikes: number, 
        likes: number, 
        ratings: number,
        priceInitial: number, 
        priceFinal: number | null, 
        Images: any[]
    }
}



const Service: React.FC<ServiceProps> = ({ service }) => {



    return (
        <Link href={`/provider/services/${service.serviceId}`} passHref={true}>
            <div className='service-container'>
                <div className='service-triple-dot-container'>
                    <FontAwesomeIcon 
                        icon={faEllipsis}
                        style={{
                            fontSize: '1.5em',
                            color: 'var(--white)'
                        }}
                    />
                </div>
                <div className='service-image-container'>
                    {/* <Image 
                        // src='http://localhost:4000/public/HomeScreen.PNG'
                        // alt={service.Images[0].filename}
                        width={600}
                        height={600}
                        objectFit='fill'
                    /> */}
                </div>

                <div className='service-text-container'>
                    <p>{service.title}</p>
                    <p className='main-purple-text'>
                        {service.priceType === 'Range' ? `Starting at P${service.priceInitial}` : `Price: P${service.priceInitial}`}
                    </p>
                </div>
            </div>
        </Link>
    )
}



export default Service;