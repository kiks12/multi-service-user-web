

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose
} from '@fortawesome/free-solid-svg-icons';



import React from 'react';



import Modal from '../../../Modals/Modal';



import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';



import { Booking as BookingType } from '../../../../../types';
import authorizedFetch from '../../../../../utils/authorizedFetch';
import { __backend__ } from '../../../../constants';



interface CancelModalProps {
    setCancellationResponse: React.Dispatch<React.SetStateAction<{
        msg: string;
        status: number;
        booking: BookingType;
    }>>;
    setOpenCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setOpenMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookId: number;
    accessToken: string;
}



const CancelModal : React.FC<CancelModalProps> = ({ 
    setOpenCancelModal, 
    bookId, 
    accessToken, 
    setMessage, 
    setOpenMessageModal, 
    setCancellationResponse
}) => {


    const closeModal = () => setOpenCancelModal(false);


    const divRef = useClickOutsideElement(closeModal);


    const confirmCancellation = async () => {
        const cancellationRes = await authorizedFetch({
            url: `${__backend__}/user/bookings/cancel-booking?bookId=${bookId}`,
            accessToken: accessToken,
            method: 'PATCH'
        });

        setCancellationResponse(cancellationRes);
        setMessage(cancellationRes.msg);
        setOpenCancelModal(false);
        setOpenMessageModal(true);
    }


    return (
        <Modal>
            <div 
                ref={divRef}
                className='card'
                style={{
                    width: '40%'
                }}
            >
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2>Confirm</h2>
                    <div onClick={closeModal}>
                        <FontAwesomeIcon 
                            icon={faClose}
                        />
                    </div>
                </div>
                <p>Are you sure you want to cancel this booking?</p>
                <div className='split' style={{margin: '2em 0 0 0'}}>
                    <button>Cancel</button>
                    <button 
                        className='main-button'
                        onClick={confirmCancellation}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    )
};



export default CancelModal;