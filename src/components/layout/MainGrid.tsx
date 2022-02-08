
/*

Multi Service Platform - Main Grid for multiple pages
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React, { ReactElement } from 'react';


interface MainGridProps {
    leftNavbar: ReactElement;
    topNavbar: ReactElement;
    contentSection: ReactElement;
}


const MainGrid : React.FC<MainGridProps> = ({ children, contentSection, leftNavbar, topNavbar }) => {

    return (
        <main className='main-grid'>
            <div className='left-navbar-container'>
                {leftNavbar}
            </div>
            <div className='top-navbar-container'>
                {topNavbar}
            </div>
            <div className='content-section-container'>
                {contentSection}
            </div>
        </main>
    )
}



export default MainGrid;