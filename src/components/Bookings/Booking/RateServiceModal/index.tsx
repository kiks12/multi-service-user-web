

import styles from './RateServiceModal.module.css';


import { faClose, faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from '../../../Modals/Modal';
import useClickOutsideElement from '../../../../custom-hooks/useClickOutsideElement';
import authorizedFetch from '../../../../../utils/authorizedFetch';
import { __backend__ } from '../../../../constants';
import { Booking } from '../../../../../types';



interface RateServiceModalProps {
    updateBookingState: (cancellationRes: {
        msg: string;
        status: number;
        booking: Booking;
    }) => void;
    setOpenRateServiceModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>
    accessToken: string;
    bookId: number;
}



const RateServiceModal : React.FC<RateServiceModalProps> = ({ 
    setOpenRateServiceModal, 
    accessToken, 
    bookId,
    setMessage,
    setOpenMessageModal,
    updateBookingState
}) => {

    const [rating, setRating] = useState<number>(0);


    const closeModal = () => setOpenRateServiceModal(false);

    const modalRef = useClickOutsideElement(closeModal);


    const checkboxOnChangeHandler = (num: number) => {
        return () => setRating(rating === num ? 0 : num);
    }


    
    const rateService = async () => {
        try { 
            const res = await authorizedFetch({
                url: `${__backend__}/user/bookings/rate-service?bookId=${bookId}&rating=${rating}`,
                method: 'PATCH',
                accessToken: accessToken,
            })

            if (res.status === 200) {
                setOpenMessageModal(true);
                setMessage(res.msg);
                setOpenRateServiceModal(false);
                updateBookingState(res);
            }
        } catch (e) {
            console.error(e);
            // handle errors
        }
    }



    return (
        <Modal>
            <div className="card" ref={modalRef}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <h2>Rate Service</h2>
                    <FontAwesomeIcon 
                        onClick={closeModal}
                        icon={faClose}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                Rate the service that was rendered for you.

                <div className="split">

                    <div className={styles.checkboxContainer}>
                        <div>
                            <label htmlFor='star1'>
                                {
                                    rating >= 1 ? 
                                        <FontAwesomeIcon 
                                            icon={faStarSolid}
                                        /> : 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                        />
                                }
                            </label>
                            <input 
                                id='star1'
                                type='checkbox'
                                className={styles.checkbox}
                                onChange={checkboxOnChangeHandler(1)}
                            />
                        </div>
                        <div>
                            <label htmlFor='star2'>
                                {
                                    rating >= 2 ? 
                                        <FontAwesomeIcon 
                                            icon={faStarSolid}
                                        /> : 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                        />
                                }
                            </label>
                            <input 
                                id='star2'
                                type='checkbox'
                                className={styles.checkbox}
                                onChange={checkboxOnChangeHandler(2)}
                            />
                        </div>
                        <div>
                            <label htmlFor='star3'>
                                {
                                    rating >= 3 ? 
                                        <FontAwesomeIcon 
                                            icon={faStarSolid}
                                        /> : 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                        />
                                }
                            </label>
                            <input 
                                id='star3'
                                type='checkbox'
                                className={styles.checkbox}
                                onChange={checkboxOnChangeHandler(3)}
                            />
                        </div>
                        <div>
                            <label htmlFor='star4'>
                                {
                                    rating >= 4 ? 
                                        <FontAwesomeIcon 
                                            icon={faStarSolid}
                                        /> : 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                        />
                                }
                            </label>
                            <input 
                                id='star4'
                                type='checkbox'
                                className={styles.checkbox}
                                onChange={checkboxOnChangeHandler(4)}
                            />
                        </div>
                        <div>
                            <label htmlFor='star5'>
                                {
                                    rating >= 5 ? 
                                        <FontAwesomeIcon 
                                            icon={faStarSolid}
                                        /> : 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                        />
                                }
                            </label>
                            <input 
                                id='star5'
                                type='checkbox'
                                className={styles.checkbox}
                                onChange={checkboxOnChangeHandler(5)}
                            />
                        </div>
                    </div>

                    <div>
                        <p>Rating: {rating}</p>
                    </div>

                </div>


                <div className='split'>
                    <button onClick={closeModal}>Cancel</button>
                    <button 
                        disabled={rating === 0}
                        onClick={rateService}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    )
}



export default RateServiceModal;