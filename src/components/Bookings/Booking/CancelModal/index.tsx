

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose
} from '@fortawesome/free-solid-svg-icons';


import React from 'react';
import Modal from '../../../Modals/Modal';
import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';



interface CancelModalProps {
    setOpenCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
}



const CancelModal : React.FC<CancelModalProps> = ({ setOpenCancelModal  }) => {


    const divRef = useClickOutsideElement(() => {
        setOpenCancelModal(false);
    })


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
                    <div>
                        <FontAwesomeIcon 
                            icon={faClose}
                        />
                    </div>
                </div>
                <p>Are you sure you want to cancel this booking?</p>
                <div className='split' style={{margin: '2em 0 0 0'}}>
                    <button>Cancel</button>
                    <button className='main-button'>Confirm</button>
                </div>
            </div>
        </Modal>
    )
};



export default CancelModal;