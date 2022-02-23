
/*

Multi Service Platform - 1 Service Component
Created: Feb. 23, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faThumbsDown
} from '@fortawesome/free-regular-svg-icons';


import React, { useEffect, useMemo } from 'react';



import { formatter } from '../../../utils/formatter';
import Link from 'next/link';



// import Image from 'next/image';



interface ServiceProps {
    service: {
        serviceId: number;
        title: string;
        serviceDetails: string;
        status: string;
        priceType: string;
        priceInitial: number;
        priceFinal: number;
        dislikes: number;
        likes: number;
        ratings: number;
        Images: any[];
        Users: any[];
    }
}



const Service: React.FC<ServiceProps> = ({ service }) => {


    const formattedInitial = useMemo(() => {
        return formatter.format(service.priceInitial);
    }, [service]);




    return (
        <Link 
            href={`/service/${service.serviceId}`}
            passHref={true}
        >
            <div className='default-service-container'>
                <div className='default-service-image'>
                    {/* Image */}
                    image
                </div>

                <div style={{
                    padding: '0.5em'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <p>{service.title}</p>

                        <div style={{
                            display: 'flex',
                            color: 'var(--mainPurple)'
                        }}>
                            <p style={{margin: '0 1em 0 0'}}>{service.priceType === 'Flat Rate' ? 'Price: ' : 'Starting at '}</p>
                            <p>{formattedInitial}</p>
                        </div>
                    </div>


                    <div style={{
                        display: 'flex',
                        justifyContent:'space-between',
                        margin: '0.4em 0 0 0'
                    }}>
                        <div>
                            <p>{service.ratings} ratings</p>
                        </div>

                        <div style={{
                            display: 'flex'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginInline: '0.5em'
                            }}>
                                <FontAwesomeIcon 
                                    icon={faThumbsUp}
                                />
                                <p>{service.likes}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginInline: '0.5em'
                            }}>
                                <FontAwesomeIcon 
                                    icon={faThumbsDown}
                                />
                                <p>{service.dislikes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </Link>
    )
}



export default Service;