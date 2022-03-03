
/*

Multi Service Platform - each Provider Booked Service Component
Created: Mar. 03, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S. 

*/



import React from 'react';



import { Booking } from '../../../../types';
import authorizedFetch from '../../../../utils/authorizedFetch';
import { formatter } from '../../../../utils/formatter';
import { __backend__ } from '../../../constants';



interface ProviderBookedServiceProps {
    booking: Booking;
    accessToken: string;
    setBookedServices: React.Dispatch<React.SetStateAction<Booking[]>>
}



const ProviderBookedService: React.FC<ProviderBookedServiceProps> = ({ booking, accessToken, setBookedServices }) => {

    const formattedPrice = formatter.format(booking.price);
    const formattedFinalPrice = formatter.format(booking.finalPrice);




    const acceptBooking = async () => {
        const res = await authorizedFetch({
            url: `${__backend__}/bookings/provider/accept-booking?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: 'PUT',
        });


        if (res.status === 200) {
            setBookedServices(prev => {
                return prev.map((_booking: Booking) => {
                    if (_booking.bookId === booking.bookId) {
                        return res.booking;
                    }

                    return _booking;
                })
            })

            return;
        } 


        alert(res.msg);
    }
    
    
    


    const deleteBooking = async () => {
        const res = await authorizedFetch({
            url: `${__backend__}/bookings/provider/delete-booking?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: 'DELETE',
        });


        if (res.status === 200) {
            setBookedServices(prev => {
                return prev.filter((_booking: Booking) => _booking.bookId !== booking.bookId)
            })

            return;
        } 


        alert(res.msg);
    }



    

    
    return (
        <div style={{
            backgroundColor: 'var(--lightGray)',
            borderRadius: '0.3em',
            padding: '0.5em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div>
                <small>Book Id: {booking.bookId}</small>
                <p>{booking.Service.title}</p>
                <p>Customer: {booking.Users.username}</p>
            </div>

            <div>
                <p>Price: {formattedPrice}</p>
                <p>Pax: {booking.pax}</p>
                <p>Final Price: {formattedFinalPrice}</p>
            </div>

            {
                booking.status === 'To be Approved' &&
                    <div style={{
                        display: 'flex',
                        width: '33%'
                    }}>
                        <div style={{flexBasis: '100%'}}>
                            <button 
                                className='main-button'
                                onClick={acceptBooking}
                            >
                                Accept
                            </button>
                        </div>
                        <div style={{margin: '0 0 0 0.5em', flexBasis: '100%'}}>
                            <button 
                                className='red-button'
                                onClick={deleteBooking}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
            }

        </div>
    )
}



export default ProviderBookedService;