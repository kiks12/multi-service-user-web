
/*

Multi Service Platform - Provider Service Popup Right corner component
Created: Mar. 05, 2022
Last Updated: Mar. 05, 2022
Author: Tolentino, Francis James S.

*/



import styles from './ServicePopup.module.css';



import Link from 'next/link';
import React from 'react';



import useClickOutsideElement from '../../../../../custom-hooks/useClickOutsideElement';



import { Service } from '../../../../../../types';



interface ServicePopupProps {
    serviceId: number;
    status: 'active' | 'inactive';
    closePopup: () => void;
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}



const ServicePopup: React.FC<ServicePopupProps> = ({ 
    serviceId, status, closePopup, setServices 
}) => {


    const popupRef = useClickOutsideElement(closePopup);


    const setServiceAsInactive = async () => {
        setServices(prev => prev.map((service: Service) => {
            if (service.serviceId === serviceId) {
                return {
                    ...service, 
                    status: 'inactive',
                }
            }
            return service;
        }))
    }


    return (
        <div className={styles.popupContainer} ref={popupRef}>
            <ul className={styles.ul}>
                <Link href={`/provider/services/${serviceId}/edit`} passHref={true}>
                    <li className={styles.li}>Edit</li>
                </Link>
                <li className={styles.li}>Delete</li>
                <li 
                    className={styles.li}
                    onClick={setServiceAsInactive}
                >
                    Set as {status === 'active' ? 'Inactive' : 'Active'}
                </li>
            </ul>
        </div>
    )
}



export default ServicePopup;