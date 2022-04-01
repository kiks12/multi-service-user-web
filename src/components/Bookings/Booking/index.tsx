
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import React, { useMemo } from 'react';



import { Booking } from '../../../../types';
import { formatter } from '../../../../utils/formatter';
import styles from './Booking.module.css';
import Link from 'next/link';


interface BookingProps {
    booking: Booking
}


const Booking : React.FC<BookingProps> = ({ booking }) => {

    const formattedPrice = useMemo(() => {
        return formatter.format(booking.price);
    }, [booking.price]);



    const formattedFinalPrice = useMemo(() => {
        return formatter.format(booking.finalPrice);
    }, [booking.finalPrice]);


    return (
        <div className={styles.container}>
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
                    </tr> 
                </tbody>
            </table>
            <div className={styles.ellipsis}>
                <FontAwesomeIcon 
                    icon={faEllipsisVertical}
                />
            </div>
        </div>
    )
}



export default Booking;