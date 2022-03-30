
import React from 'react';



import { Booking } from '../../../../types';
import styles from './Booking.module.css';


interface BookingProps {
    booking: Booking
}


const Booking : React.FC<BookingProps> = ({ booking }) => {

    return (
        <div className={styles.container}>
            <div className={styles.image}>Image</div>
            <p>{booking.bookId}</p>
            <p>{booking.Service.title}</p>
            <p>{booking.ServiceProviders.username}</p>
        </div>
    )
}



export default Booking;