

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';
import Modal from '../../../Modals/Modal';


interface MessageModalProps {
    message: string;
    setOpenMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const MessageModal : React.FC<MessageModalProps> = ({ message, setOpenMessageModal }) => {

    const closeModal = () => setOpenMessageModal(false);


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