
/*

Multi Service Platform - Provider Service Popup Right corner component
Created: Mar. 05, 2022
Last Updated: Mar. 05, 2022
Author: Tolentino, Francis James S.

*/



import styles from './ServicePopup.module.css';



import Link from 'next/link';
import React, { useState } from 'react';



import useClickOutsideElement from '../../../../../custom-hooks/useClickOutsideElement';



import { Service } from '../../../../../../types';
import authorizedFetch from '../../../../../../utils/authorizedFetch';
import { __backend__ } from '../../../../../constants';
import Modal from '../../../../Modals/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';



interface ServicePopupProps {
    serviceId: number;
    status: 'active' | 'inactive';
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
    




    const handleActiveInactiveToggle = async (status: 'active' | 'inactive') => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/services/set-as-${status}?serviceId=${serviceId}`,
            accessToken: accessToken, 
            method: 'PUT',
        })

        return res;
    }




    const setServiceAsInactive = async () => {
        const res = await handleActiveInactiveToggle('inactive');
        setOpenMessageModal(true);
        setMessage(res.msg);
    }





    const setServiceAsActive = async () => {
        const res = await handleActiveInactiveToggle('active');
        setOpenMessageModal(true);
        setMessage(res.msg);
    }





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
                        onClick={status === 'active' ? setServiceAsInactive : setServiceAsActive}
                    >
                        Set as {status === 'active' ? 'Inactive' : 'Active'}
                    </li>
                </ul>
            </div>
        </>
    )
}



export default ServicePopup;