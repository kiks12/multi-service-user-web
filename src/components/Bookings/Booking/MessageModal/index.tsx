

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import React from 'react';



import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';



import Modal from '../../../Modals/Modal';



import { Booking } from '../../../../../types';




interface MessageModalProps {
    message: string;
    setOpenMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
    cancellationResponse: {
        msg: string;
        status: number;
        booking: Booking;
    };
    updateBookingState: (cancellationRes: {msg: string, status: number, booking: Booking}) => void;
}


const MessageModal : React.FC<MessageModalProps> = ({ 
    message, 
    setOpenMessageModal,
    updateBookingState,
    cancellationResponse
}) => {

    
    const closeModal = () => {
        updateBookingState(cancellationResponse);
        setOpenMessageModal(false);
    };


    const divRef = useClickOutsideElement(closeModal);


    return (
        <Modal>
            <div 
                ref={divRef}
                className='card'
                style={{
                    width: '40%'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Message</h2>
                    <div onClick={closeModal}>
                        <FontAwesomeIcon 
                            icon={faClose}
                        />
                    </div>
                </div>
                <p>{message}</p>

                <button onClick={closeModal}>Okay</button>
            </div>
        </Modal>
    )
}



export default MessageModal;