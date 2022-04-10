
/*

Multi Service Platform - Service Page Overview Component
Created: Feb. 24, 2022
Last Updated: Mar. 07, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import Image from 'next/image';
import { Service } from '../../../../types';
import Link from 'next/link';





interface OverviewProps {
    service: Service
}



const Overview : React.FC<OverviewProps> = ({ service }) => {


    return (
        <div style={{
            width: '100%'
        }}>
            <h2>{service.title}</h2>
            

            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '1em 0'
            }}>
                <div 
                    className='account-circle'
                    style={{
                        zIndex: '-20'
                    }}
                >
                    {
                        service.Users?.image &&
                            <Image 
                                src={service.Users.image as string}
                                alt={service?.Users?.shopName as string}
                                width={70}
                                height={70}
                                objectFit='fill'
                            />
                    }
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Link href={`/provider/page/${service.Users?.userId}`} passHref={true}>
                        <h4>{service.Users?.shopName}</h4>
                    </Link>
                    <p style={{margin: '0 1em'}}> | {service.ratings} ratings</p>
                </div>
            </div>


            <div style={{
                width: '100%',
                height: '50vh',
                backgroundColor: 'var(--gray)',
                margin: '1em 0'
            }}>
                Carousel
            </div>
        </div>            
    )
}



export default Overview;