
import React, { useMemo } from 'react';



import { Booking } from '../../../../types';
import { formatter } from '../../../../utils/formatter';
import styles from './Booking.module.css';


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
                    {booking.Service.title}
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
        </div>
    )
}



export default Booking;