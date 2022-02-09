
/*

Multi Service Platform - Main Layout Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S. 

*/



import React from 'react';



import ContentSection from '../ContentSection/ContentSection';
import LeftNavbar from '../NavigationBars/LeftNavbar';
import TopNavbar from '../NavigationBars/TopNavbar';
import MainGrid from './MainGrid';



const Layout: React.FC = () => {


    return (
        <MainGrid 
            leftNavbar={<LeftNavbar />}
            topNavbar={<TopNavbar />}
            contentSection={<ContentSection />}
        />
    )
}



export default Layout;