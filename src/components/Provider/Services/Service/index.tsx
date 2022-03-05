
/*

Multi Service Platform - Provider Service Component in Services Content Section
Created: Feb. 14, 2022
Last Updated: Mar. 05, 2022
Author: Tolentino, Francis James S.

*/



import styles from './Service.module.css';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis
} from '@fortawesome/free-solid-svg-icons';



// import Image from 'next/image';



import React, { useState } from 'react';
import Link from 'next/link';



import { __backend__ } from '../../../../constants';
import ServicePopup from './Popup';
import { Service } from '../../../../../types';







interface ServiceProps {
    service: Service;
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}



const Service: React.FC<ServiceProps> = ({ service, setServices}) => {


    const [showPopup, setShowPopup] = useState<boolean>(false);


    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);


    return (
        <div 
            className={styles.serviceContainer}
            style={service.status === 'active' ? {
                borderTop: '5px solid var(--mainPurple)',
            } : {
                borderTop: '5px solid var(--errorRed)'
            }}
        >
            <div className={styles.serviceTripleDotContainer}>
                <FontAwesomeIcon 
                    icon={faEllipsis}
                    style={{
                        fontSize: '1.5em',
                        color: 'var(--white)'
                    }}
                    onClick={openPopup}
                />

                {
                    showPopup && <ServicePopup 
                                    {...service} 
                                    closePopup={closePopup}
                                    setServices={setServices}
                                />
                }

            </div>
            <Link href={`/provider/services/${service.serviceId}`} passHref={true}>
                <div>
                    <div className={styles.serviceImageContainer}>
                        {/* <Image 
                            // src='http://localhost:4000/public/HomeScreen.PNG'
                            // alt={service.Images[0].filename}
                            width={600}
                            height={600}
                            objectFit='fill'
                        /> */}
                    </div>

                    <div className={styles.serviceTextContainer}>
                        <p>{service.title}</p>
                        <p className='main-purple-text'>
                            {service.priceType === 'Range' ? `Starting at P${service.priceInitial}` : `Price: P${service.priceInitial}`}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}



export default Service;