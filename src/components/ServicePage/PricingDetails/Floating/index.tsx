
/*

Multi Service Platform - Floating Pricing Details Component for users
Created: Mar. 04, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/




import styles from './FloatingPricingDetails.module.css';



import React, { useState } from 'react';
import Link from 'next/link';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';



import { AnimatePresence, motion } from 'framer-motion';
// import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';



interface FloatingPricingDetailsProps {
    priceType: string;
    priceSubType: string;
    formattedInitial: string;
    formattedFinal: string;
    serviceId: number;
}



const FloatingPricingDetails : React.FC<FloatingPricingDetailsProps> = ({ 
    formattedFinal, 
    formattedInitial, 
    priceSubType, 
    priceType,
    serviceId
 }) => {

    const [showPricingDetails, setShowPricingDetails] = useState<boolean>(false);


    const closePricingDetails = () => {
        setShowPricingDetails(false);
    }


    // const floatingPricingDetailsRef = useClickOutsideElement(closePricingDetails);



    return (
        <>
            <AnimatePresence>
                {
                    showPricingDetails && (
                        <div className={styles.pricingDetailsContainer}>
                            <motion.div 
                                animate={{
                                    y: [1500, 0]
                                }}
                                transition={{
                                    ease: 'easeOut',
                                    duration: 0.3
                                }}
                                exit={{
                                    y: [0, 1500]
                                }}
                                className={styles.pricingDetails}
                                // ref={floatingPricingDetailsRef}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <h2>Pricing</h2>
                                    <FontAwesomeIcon 
                                        icon={faClose}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={closePricingDetails}
                                    />
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Type: </td>
                                            <td>{priceType}</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Type: </td>
                                            <td>{priceSubType}</td>
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
                                    <Link href={`/service/${serviceId}/book`} passHref={true}>
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
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>

            <div className={styles.floatingPricingDetailsContainer}>
                <button 
                    className='main-button'
                    onClick={() => {
                        setShowPricingDetails(true);
                    }}
                >
                    Show Pricing Details
                </button>
            </div>
        </>
    )
}



export default FloatingPricingDetails;