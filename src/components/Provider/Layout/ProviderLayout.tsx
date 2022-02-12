
/*

Multi Service Platform - Provider Layout Component
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import ProviderContentSection from '../ContentSection/ProviderContentSection';
import ProviderLeftNavbar from '../NavigationBars/ProviderLeftNavbar';
import ProviderTopNavbar from '../NavigationBars/ProviderTopNavbar';
import MainGrid from './MainGrid';



const Layout: React.FC = () => {
    return (
        <MainGrid 
            topNavbar={<ProviderTopNavbar />}
            leftNavbar={<ProviderLeftNavbar />}
            contentSection={<ProviderContentSection />}
        />
    )
}



export default Layout;