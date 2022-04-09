
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import React, { useMemo, useState } from 'react';



import { Booking } from '../../../../types';
import { formatter } from '../../../../utils/formatter';
import styles from './Booking.module.css';
import Link from 'next/link';
import Actions from './Action';
import CancelModal from './CancelModal';
import MessageModal from './MessageModal';



interface BookingProps {
    booking: Booking;
    accessToken: string;
    updateBookingState?: (cancellationRes: {msg: string, status: number, booking: Booking}) => void;
    perspective?: "User" | "Provider";
    buttonValue?: string;
    buttonOnClick?: () => void;
}


const TO_BE_APPROVED = '0.3em solid var(--mainBlue)';
const TO_BE_RENDERED = '0.3em solid var(--mainPurple)';
const TO_BE_RATED = '0.3em solid var(--secondaryPurple)';
const COMPLETED = '0.3em solid var(--lightGreen)';
const CANCELLED = '0.3em solid var(--errorRed)';



const Booking : React.FC<BookingProps> = ({ 
    booking, 
    accessToken, 
    updateBookingState,
    perspective,
    buttonValue,
    buttonOnClick
 }) => {

    const [openActionButton, setOpenActionButton] = useState<boolean>(false);    
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
    const [cancellationResponse, setCancellationResponse] = useState<{
        msg: string,
        status: number,
        booking: Booking,
    }>({msg: '', status: 400, booking});
    const [message, setMessage] = useState<string>('');



    const formattedPrice = useMemo(() => {
        return formatter.format(booking.price);
    }, [booking.price]);



    const formattedFinalPrice = useMemo(() => {
        return formatter.format(booking.finalPrice);
    }, [booking.finalPrice]);



    return (
        <div 
            className={styles.container}
            style={{
                borderLeft: booking.status === 'To be Approved' ? TO_BE_APPROVED : booking.status === 'To be Rendered' ? TO_BE_RENDERED : booking.status === 'To be Rated' ?TO_BE_RATED : booking.status === 'Cancelled' ? CANCELLED : COMPLETED
            }}
        >
            <table style={{width: '100%'}}>
                <tbody>
                    <tr className={styles.tr}>
                        <td 
                            className={styles.td}
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{
                                backgroundColor: 'var(--gray)',
                                height: '5em',
                                width: '5em',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                image
                            {/* <Image /> */}
                            </div>
                            <Link 
                                href={`/service/${booking.serviceId}`}
                                passHref={true}
                            > 
                                <p style={{margin: '0 0.5em'}}>
                                    {booking.Service.title}
                                </p>
                            </Link>
                        </td>
                        <td className={styles.td}>
                            {booking.date}
                        </td>
                        <td
                            className={styles.td}
                        >
                            {formattedPrice}
                        </td>
                        <td
                            className={styles.td}
                        >
                            {booking.pax}
                        </td>
                        <td
                            className={styles.td}
                        >
                            {formattedFinalPrice}
                        </td>
                        {
                            perspective === 'Provider' && 
                            <td>
                                <button 
                                    className='main-button'
                                    onClick={buttonOnClick}
                                >
                                    {buttonValue}
                                </button>
                            </td>
                        }
                    </tr> 
                </tbody>
            </table>
            <div 
                className={styles.ellipsis}
                onClick={() => setOpenActionButton(true)}
            >
                <FontAwesomeIcon 
                    icon={faEllipsisVertical}
                />
            </div>
            {
                openActionButton && 
                    <Actions 
                        setOpenActionButton={setOpenActionButton}
                        setOpenCancelModal={setOpenCancelModal}
                    />
            }
            {
                openCancelModal &&
                    <CancelModal 
                        setCancellationResponse={setCancellationResponse}
                        setMessage={setMessage}
                        setOpenMessageModal={setOpenMessageModal}
                        setOpenCancelModal={setOpenCancelModal}
                        accessToken={accessToken}
                        bookId={booking.bookId}
                    />
            }
            {
                openMessageModal &&
                    <MessageModal 
                        updateBookingState={updateBookingState}
                        cancellationResponse={cancellationResponse}
                        message={message}
                        setOpenMessageModal={setOpenMessageModal}
                    />
            }
            
        </div>
    )
}



export default Booking;