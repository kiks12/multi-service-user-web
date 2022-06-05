
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


import React , { useMemo } from 'react';



import { formatter } from '../../../utils/formatter';
import Link from 'next/link';
import type { Service as ServiceType } from '../../../types';


import Image from 'next/image';
import {__backend__} from '../../constants';



interface ServiceProps {
    service: ServiceType; 
}



const Service: React.FC<ServiceProps> = ({ service }) => {


    const formattedPrice = useMemo(() => {
        return formatter.format(service.price);
    }, [service]);




    return (
        <Link 
            href={`/service/${service.serviceId}`}
            passHref={true}
        >
            <div className='default-service-container'>
                <div className='default-service-image'>
                    {
                        service.Images.length > 0 ?
                        <Image 
                            src={`${__backend__}/public/${service.Images[0].path}`}
                            height={350}
                            width={350}
                        /> : <p>No Image</p>
                    }
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
                            <p>{formattedPrice}</p>
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
