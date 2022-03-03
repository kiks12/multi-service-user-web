
/*

Multi Service Platform - each Provider Booked Service Component
Created: Mar. 03, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S. 

*/



import React from 'react';



import { Booking } from '../../../../types';
import { formatter } from '../../../../utils/formatter';



interface ProviderBookedServiceProps {
    booking: Booking
}



const ProviderBookedService: React.FC<ProviderBookedServiceProps> = ({ booking }) => {

    const formattedPrice = formatter.format(booking.price);


    return (
        <div style={{
            backgroundColor: 'var(--lightGray)',
            borderRadius: '0.3em',
            padding: '0.5em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <small>Book Id: {booking.bookId}</small>
                <p>{booking.Service.title}</p>
                <p>Customer: {booking.Users.username}</p>
            </div>

            <div>
                <p>Price: {formattedPrice}</p>
                <p>Pax: {booking.pax}</p>
                <p>Final Price: {formattedPrice}</p>
            </div>

            <div style={{
                display: 'flex',
                width: '33%'
            }}>
                <div style={{flexBasis: '100%'}}>
                    <button className='main-button'>Accept</button>
                </div>
                <div style={{margin: '0 0 0 0.5em', flexBasis: '100%'}}>
                    <button className='red-button'>Delete</button>
                </div>
            </div>

        </div>
    )
}



export default ProviderBookedService;