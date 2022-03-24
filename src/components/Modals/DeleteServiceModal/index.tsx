
/*

Multi Service Platform - Delete Service Modal component for Provider
Created: Feb. 23, 2022
Last Updated: Mar. 24, 2022
Author: Tolentino, Francis James S.

*/



import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../Modal.module.css';



import { useRouter } from 'next/router';



import React, { useState } from 'react';



import authorizedFetch from '../../../../utils/authorizedFetch';
import { __backend__ } from '../../../constants';



import Modal from '../Modal';



interface DeleteServiceModalProps {
    service: any;
    accessToken: string;
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}



const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({ service, accessToken, setOpenDeleteModal }) => {


    const key = service.Users.username + '-' + service.title;
    const [input, setInput] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
    const [openMainModal, setOpenMainModal] = useState<boolean>(true);
    

    const router = useRouter();



    const deleteService = async () => {
        // create an Authorize Request to endpoint
        // /provider/service/delete-service?serviceId={}
        // to delete a service
        const deleted = await authorizedFetch({
            url: `${__backend__}/provider/services/delete-service?serviceId=${service.serviceId}`,
            accessToken: accessToken,
            method: 'DELETE'
        })

        setMessage(deleted.msg);
        setOpenMainModal(false);
        setOpenMessageModal(true);      
    }


    return (
        <>
            {
                openMessageModal && 
                <Modal>
                    <div className={`card ${styles.card}`}>
                        <h2>Message</h2>

                        <p>{message}</p>

                        <button
                            onClick={() => {
                                setOpenDeleteModal(false);
                                router.push('/provider/services');
                            }}
                        >
                            okay
                        </button>
                    </div>
                </Modal>
            }
            {
                openMainModal &&
                <Modal>
                    <div className={`card ${styles.card}`}>
                        <div className={styles.header}>
                            <h2>Confirm</h2>
                            <FontAwesomeIcon 
                                icon={faClose}
                                style={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => setOpenDeleteModal(false)}
                            />
                        </div>


                        <p>Are you sure you want to delete this service?</p>
                        <p>{'To continue the deletion process please enter the following in the input box, '} 
                            <strong>
                                {key}
                            </strong>
                        </p>

                        <input 
                            className='form-control'
                            value={input}
                            onChange={(e) => { 
                                setInput(e.target.value);
                            }}
                            placeholder='Enter the key'
                        />

                        <div className={styles.buttonContainer}>
                            <button
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={key !== input}
                                onClick={deleteService}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}



export default DeleteServiceModal;