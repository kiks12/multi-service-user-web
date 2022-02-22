
/*

Multi Services Platform - Users Home Content Categories Component
Created: Feb. 17, 2022
Last Updated: Feb. 22, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDesktop,
    faWind,
    faToilet,
    faBroom,
    faSoap,
    faScissors,
    faSpa,
    faPlug,
    faTruck
} from '@fortawesome/free-solid-svg-icons';



import React from 'react';
import Link from 'next/link';


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
        <div className='categories-grid-container'>
            <h2>Categories</h2>
            
            <div className='categories-container'>
                <Link href='/computer-servicing' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faDesktop}
                        size='2x'    
                        />
                        <p>Computer Servicing</p> 
                    </div>
                </Link>



                <Link href='/ac-maintenance' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faWind} 
                        size='2x'    
                    />
                        <p>AC Maintenance</p> 
                    </div>
                </Link>



                <Link href='/plumbing' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faToilet} 
                        size='2x'    
                    />
                        <p>Plumbing</p> 
                    </div>
                </Link>



                <Link href='/home-cleaning' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faBroom} 
                        size='2x'    
                    />
                        <p>Home Cleaning</p> 
                    </div>
                </Link>



                <Link href='/laundry' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faSoap} 
                        size='2x'    
                    />
                        <p>Laundry</p> 
                    </div>
                </Link>



                <Link href='salons' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faScissors} 
                        size='2x'    
                    />
                        <p>Salons</p> 
                    </div>
                </Link>



                <Link href='/spa' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faSpa} 
                        size='2x'    
                    />
                        <p>Spa</p> 
                    </div>
                </Link>


                <Link href='/electrician' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faPlug} 
                        size='2x'    
                    />
                        <p>Electrician</p> 
                    </div>
                </Link>


                
                <Link href='moving-services' passHref={true}>
                    <div className='category'>
                        <FontAwesomeIcon 
                        icon={faTruck} 
                        size='2x'    
                    />
                        <p>Moving Services</p> 
                    </div>
                </Link>
            </div>
        </div>
    )
}



export default Categories;