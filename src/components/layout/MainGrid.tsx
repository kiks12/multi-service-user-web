
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
            <div className='left-navbar'>
                {leftNavbar}
            </div>
            <div className='top-navbar'>
                {topNavbar}
            </div>
            <div className='content-section'>
                {contentSection}
            </div>
        </main>
    )
}



export default MainGrid;