
/*

Multi Service Platform - Content Section Component
Created: Feb. 09, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import useActivePage from '../../custom-hooks/useActivePage';



import HomeContent from './Home/HomeContent';



const ContentSection : React.FC = () => {

    const activePage = useActivePage();

    return (
        <div>
            { activePage === 'Home' && <HomeContent />}
        </div>
    )
}



export default ContentSection;