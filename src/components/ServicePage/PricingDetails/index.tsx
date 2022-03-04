


/*

Multi Service Platform - Pricing Details Component for Service Page in users
Created: Feb. 23, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/



import styles from './PricingDetails.module.css';



import Link from 'next/link';
import React, { useMemo } from 'react';



import { formatter } from '../../../../utils/formatter';



import FloatingPricingDetails from './Floating';




interface PricingDetailsProps {
    service: any;
}






const PricingDetails: React.FC<PricingDetailsProps> = ({ service }) => {


    const formattedInitial = useMemo(() => {
        return formatter.format(parseInt(service.priceInitial, 10));
    }, [service]);
    
    
    const formattedFinal = useMemo(() => {
        return formatter.format(parseInt(service.priceFinal, 10));
    }, [service]);



    return (
        <>
            <FloatingPricingDetails 
                formattedFinal={formattedFinal}
                formattedInitial={formattedInitial}
                priceSubType={service.priceSubType}
                priceType={service.priceType}
                serviceId={service.serviceId}
            />
            <div className={styles.pricingDetailsContainer}>
                <h2>Pricing</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Type: </td>
                            <td>{service.priceType}</td>
                        </tr>
                        <tr>
                            <td>Sub Type: </td>
                            <td>{service.priceSubType}</td>
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
                    <Link href={`/service/${service.serviceId}/book`} passHref={true}>
                        <button className='main-button'>
                            Book Service
                        </button>
                    </Link>
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
        </>
    )
}




export default PricingDetails;