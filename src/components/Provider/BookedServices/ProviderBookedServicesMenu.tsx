
/*

Multi Service Platform - Provider Booked Services Menu Component
Created: Mar. 03, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import { BookedServicesFilter } from '../../../../types';




interface ProviderBookedServiceMenuProps {
    bookedServicesFilter: BookedServicesFilter,
    setBookedServicesFitler: React.Dispatch<React.SetStateAction<BookedServicesFilter>>
}




const ProviderBookedServicesMenu: React.FC<ProviderBookedServiceMenuProps> = ({
    bookedServicesFilter, 
    setBookedServicesFitler
}) => {



    const handleClickEvent = (e: any) => {
        setBookedServicesFitler(e.target.textContent as BookedServicesFilter);
    }



    return (
        <div>
            <ul className='menu-ul'>
                <li 
                    className={bookedServicesFilter === 'To be Approved' ? 'menu-li-active' : 'menu-li'}
                    onClick={handleClickEvent}
                >
                    To be Approved
                </li>
                <li 
                    className={bookedServicesFilter === 'To be Rendered' ? 'menu-li-active' : 'menu-li'}
                    onClick={handleClickEvent}
                >
                    To be Rendered
                </li>
                <li 
                    className={bookedServicesFilter === 'To be Rated' ? 'menu-li-active' : 'menu-li'}
                    onClick={handleClickEvent}
                >
                    To be Rated
                </li>
                <li 
                    className={bookedServicesFilter === 'Cancelled' ? 'menu-li-active' : 'menu-li'}
                    onClick={handleClickEvent}
                >
                    Cancelled
                </li>
                <li 
                    className={bookedServicesFilter === 'All' ? 'menu-li-active' : 'menu-li'}
                    onClick={handleClickEvent}
                >
                    All 
                </li>
            </ul>
        </div>
    )
}



export default ProviderBookedServicesMenu;