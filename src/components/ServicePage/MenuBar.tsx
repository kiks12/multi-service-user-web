
/*

Multi Service Platform - Service Page Menu Bar COmponent
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';



type ActivePart = 'Overview' | 'Description' | 'AboutProvider' | 'Reviews' | 'FAQs';



const MenuBar: React.FC = () => {

    const [activePart, setActivePart] = useState<ActivePart>('Overview');


    return (
        <div>
            <ul className='menu-ul'>
                <li className={activePart === 'Overview' ? 'menu-li-active' : 'menu-li'}>Overview</li>
                <li className={activePart === 'Description' ? 'menu-li-active' : 'menu-li'}>Description</li>
                <li className={activePart === 'AboutProvider' ? 'menu-li-active' : 'menu-li'}>About the Provider</li>
                <li className={activePart === 'Reviews' ? 'menu-li-active' : 'menu-li'}>Reviews</li>
                <li className={activePart === 'FAQs' ? 'menu-li-active' : 'menu-li'}>FAQs</li>
            </ul>
        </div>
    )
}



export default MenuBar;