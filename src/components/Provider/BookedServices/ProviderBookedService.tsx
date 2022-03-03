
/*

Multi Service Platform - each Provider Booked Service Component
Created: Mar. 03, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S. 

*/



import React from 'react';
import { Booking } from '../../../../types';


interface ProviderBookedServiceProps {
    booking: Booking
}



const ProviderBookedService: React.FC<ProviderBookedServiceProps> = ({ booking }) => {
    return (
        <div style={{
            backgroundColor: 'var(--lightGray)',
            borderRadius: '0.3em',
        }}>
            <small>Book Id: {booking.bookId}</small>
            <p>{booking.Service.title}</p>
            <p>Customer: {booking.Users.username}</p>

            <p>{booking.price}</p>
            <p>{booking.pax}</p>
        </div>
    )
}



export default ProviderBookedService;