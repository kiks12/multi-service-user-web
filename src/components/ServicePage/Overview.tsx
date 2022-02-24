
/*

Multi Service Platform - Service Page Overview Component
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/



import React, { useMemo } from 'react';



import Image from 'next/image';



import { formatter } from '../../../utils/formatter';




interface OverviewProps {
    service: any
}



const Overview : React.FC<OverviewProps> = ({ service }) => {


    const formattedInitial = useMemo(() => {
        return formatter.format(parseInt(service.priceInitial, 10));
    }, [service]);
    
    
    const formattedFinal = useMemo(() => {
        return formatter.format(parseInt(service.priceFinal, 10));
    }, [service]);


    return (
        <div style={{
            display: 'flex'
        }}>

            <div style={{
                width: '65%'
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
                        <Image 
                            src={service.Users.image}
                            alt={service.Users.username}
                            width={70}
                            height={70}
                            objectFit='fill'
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <h4>{service.Users.username}</h4>
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


            <div
                style={{
                    width: '35%',
                    margin: '0 0 0 1em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
                className='card'
            >
                <h2>Pricing</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Type: </td>
                            <td>{service.priceType}</td>
                        </tr>
                        <tr>
                            <td>Starting Price: </td>
                            <td>{formattedInitial}</td>
                        </tr>
                        <tr>
                            <td>Last Price: </td>
                            <td>{formattedFinal}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <button className='main-button'>
                        Book Service
                    </button>
                    <button 
                        className='ghost-button'
                        style={{
                            margin: '0.5em 0 0 0'
                        }}
                    >
                        Negotiate Pricing
                    </button>
                </div>
            </div>
        </div>
    )
}



export default Overview;