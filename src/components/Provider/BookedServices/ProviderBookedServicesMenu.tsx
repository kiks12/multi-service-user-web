
/*

Multi Service Platform - Provider Booked Services Menu Component
Created: Mar. 03, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



const ProviderBookedServicesMenu: React.FC = () => {


    
    return (
        <div>
            <ul className='menu-ul'>
                <li className='menu-li'>To be Approved</li>
                <li className='menu-li'>To be Rendered</li>
                <li className='menu-li'>To be Rated</li>
                <li className='menu-li'>Cancelled</li>
                <li className='menu-li'>All</li>
            </ul>
        </div>
    )
}



export default ProviderBookedServicesMenu;