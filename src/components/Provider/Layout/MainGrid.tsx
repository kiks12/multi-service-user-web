


import React, { ReactElement } from 'react';


interface MainGridProps {
    leftNavbar: ReactElement;
    topNavbar: ReactElement;
    contentSection: ReactElement;
}



const MainGrid: React.FC<MainGridProps> = ({contentSection, leftNavbar, topNavbar}) => {
    return (
        <main className='provider-main-grid'>
            <div className='provider-top-container'>
                {topNavbar}
            </div>
            <div className='provider-left-container'>
                {leftNavbar}
            </div>
            <div className='provider-content-section'>
                {contentSection}
            </div>
        </main>
    )
}



export default MainGrid;