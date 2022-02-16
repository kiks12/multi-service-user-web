
/*

Multi Service Platform - Provider Service Component in Services Content Section
Created: Feb. 14, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import Image from 'next/image';



import React from 'react';



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
        <div 
            style={{
                border: '0.3px solid var(--gray)',
                borderRadius: '0.5em',
            }}
        >
            <div
                style={{
                    width: '100%',
                    backgroundColor: 'var(--gray)',
                    borderRadius: '0.5em 0.5em 0 0', 
                    overflow: 'hidden',
                    height: '22vh'
                }}
            >
                <Image 
                    src={service.Images[0].path} 
                    alt={service.Images[0].filename}
                    width={600}
                    height={600}
                    objectFit='fill'
                />
            </div>

            <div 
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between', 
                    padding: '0.5em'
                }}
            >
                <p>{service.title}</p>
                <p>
                    {service.priceType === 'Range' ? `Starting at P${service.priceInitial}` : `Price: P${service.priceInitial}`}
                </p>
            </div>
        </div>
    )
}



export default Service;