
/*

Multi Service Platform - Provider Service Popup Right corner component
Created: Mar. 05, 2022
Last Updated: Mar. 25, 2022
Author: Tolentino, Francis James S.

*/



import styles from './ServicePopup.module.css';



import Link from 'next/link';
import React, { useState } from 'react';



import useClickOutsideElement from '../../../../../custom-hooks/useClickOutsideElement';



import { Service, ServiceStatus } from '../../../../../../types';
import authorizedFetch from '../../../../../../utils/authorizedFetch';
import { __backend__ } from '../../../../../constants';
import Modal from '../../../../Modals/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';




interface ServicePopupProps {
    serviceId: number;
    status: ServiceStatus;
    accessToken: string;
    closePopup: () => void;
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}



const ServicePopup: React.FC<ServicePopupProps> = ({ 
    serviceId, status, closePopup, setServices, accessToken 
}) => {


    const [message, setMessage] = useState<string>('');
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);



    const popupRef = useClickOutsideElement(closePopup);
    


    // this is the base function to toggle service status from active to inactive
    // and vice versa. This function creates an Authorized PATCH API request to Server
    // endpoint /provider/services/set-service-status?serviceId={}&status={}
    // returns the json response of the request
    const serviceStatusToggle = async (status: ServiceStatus) => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/services/set-service-status?serviceId=${serviceId}&status=${status}`,
            accessToken: accessToken, 
            method: 'PATCH',
        })

        return res;
    }





    // this function calls the first variation (set to inactive) of the base function 
    // serviceStatusToggle. This function will be called inside the UI.
    const toggleServiceStatusToInactive = async () => {
        // toggle service status to inactive
        const { msg } = await serviceStatusToggle('inactive');
        setOpenMessageModal(true);
        setMessage(msg);
    }





    // this function calls the second variation (set to active) of the base function  
    // serviceStatusToggle. This function will be called inside the UI.
    const toggleServiceStatusToActive = async () => {
        const { msg } = await serviceStatusToggle('active');
        setOpenMessageModal(true);
        setMessage(msg);
    }




    // After the service status toggle, the message modal will be open and
    // this function will handle the closure of the message modal.
    const closeMessageModal = () => {
        setServices(prev => prev.map((service: Service) => {
            if (service.serviceId === serviceId) {
                return {
                    ...service, 
                    status: service.status === 'active' ? 'inactive' : 'active',
                }
            }
            return service;
        }))
        setOpenMessageModal(false);
        setMessage('');
    }




    
    return (
        <>
            {
                openMessageModal &&
                <Modal>
                    <div 
                        className='card'
                        style={{
                            width: '35%'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h2>Message</h2>
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                        <p style={{
                            margin: '2em 0'
                        }}>{message}</p>

                        <button 
                            style={{
                                margin: '1em 0 0 0'
                            }}
                            onClick={closeMessageModal}
                        >
                            Okay
                        </button>
                    </div>
                </Modal>
            }
            <div className={styles.popupContainer} ref={popupRef}>
                <ul className={styles.ul}>
                    <Link href={`/provider/services/${serviceId}/edit`} passHref={true}>
                        <li className={styles.li}>Edit</li>
                    </Link>
                    <li className={styles.li}>Delete</li>
                    <li 
                        className={styles.li}
                        onClick={status === 'active' ? toggleServiceStatusToInactive : toggleServiceStatusToActive}
                    >
                        Set as {status === 'active' ? 'Inactive' : 'Active'}
                    </li>
                </ul>
            </div>
        </>
    )
}



export default ServicePopup;