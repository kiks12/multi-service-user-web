
/*

Multi Services Platform - Users Home Content Categories Component
Created: Feb. 17, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComputerMouse,
    faAirFreshener,
} from '@fortawesome/free-solid-svg-icons';



import React from 'react';


// Computer Servicing <FontAwesomeIcon icon="fa-solid fa-computer-classic" />
// AC Maintanence <FontAwesomeIcon icon="fa-solid fa-air-conditioner" />
// Plumbing <FontAwesomeIcon icon="fa-solid fa-pipe-valve" />
// Home Cleaning <FontAwesomeIcon icon="fa-solid fa-vacuum" />
// Laundry <FontAwesomeIcon icon="fa-solid fa-washing-machine" />
// Salons <FontAwesomeIcon icon="fa-solid fa-user-hair" />
// Spas <FontAwesomeIcon icon="fa-solid fa-spa" />
// Electrician <FontAwesomeIcon icon="fa-solid fa-plug" />
// Moving Services <FontAwesomeIcon icon="fa-solid fa-truck" />



const Categories: React.FC = () => {
    return (
        <div 
            className='card'
            style={{
                margin: '1em 0'
            }}
        >
            <p>Categories</p>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(10vh, 20%))'
            }}>
                <div
                    style={{
                        // backgroundColor: 'red'
                    }}
                >
                    <FontAwesomeIcon icon={faComputerMouse} />
                    <p>Computer Servicing</p> 
                </div>
                <div
                    style={{
                        // backgroundColor: 'red'
                    }}
                >
                    <FontAwesomeIcon icon={faAirFreshener} />
                    <p>AC Maintenance</p> 
                </div>
            </div>
        </div>
    )
}



export default Categories;