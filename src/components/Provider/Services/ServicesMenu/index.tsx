
/*

Multi Service Platform - Provider Services Menu Component
Created: Feb. 16, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



interface MenuProps {
    activePrompt: 'active' | 'inactive' | 'all';
    onClick: (e:any) => void;
}



const ServicesMenu: React.FC<MenuProps> = ({ activePrompt, onClick }) =>{
    return (
        <div>
            <ul className='menu-ul'>
                <li 
                    onClick={() => onClick('active')} 
                    className={activePrompt === 'active' ? 'menu-li-active' : 'menu-li'}
                >
                    Active Services
                </li>
                <li
                    onClick={() => onClick('inactive')} 
                    className={activePrompt === 'inactive' ? 'menu-li-active' : 'menu-li'}
                >
                    Inactive Services
                </li>
                <li
                    onClick={() => onClick('all')} 
                    className={activePrompt === 'all' ? 'menu-li-active' : 'menu-li'}
                >
                    All
                </li>
            </ul>
        </div>
    )
}



export default ServicesMenu;