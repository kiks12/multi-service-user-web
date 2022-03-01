
/*

Multi Service Platform - Main Grid for multiple pages
Created: Feb. 09, 2022
Last Updated: Mar. 01, 2022
Author: Tolentino, Francis James S.

*/


import React, { ReactElement } from 'react';


interface MainGridProps {
    leftNavbar: ReactElement;
    topNavbar: ReactElement;
}


const MainGrid : React.FC<MainGridProps> = ({ leftNavbar, topNavbar, children }) => {

    return (
        <>
            <header>
                <div className='top-navbar-container'>
                    <div className='container'>
                        {topNavbar}
                    </div>
                </div>
            </header>
            <main>
                <div className='left-navbar-container'>
                    {leftNavbar}
                </div>
                <div className='content-section-container'>
                    <div className='container'>
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}



export default MainGrid;