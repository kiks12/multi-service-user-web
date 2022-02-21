
/*

Multi Service Platform - Provider Layout Component
Created: Feb. 12, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';
import MainGrid from '../../layout/MainGrid';



import ProviderLeftNavbar from '../NavigationBars/ProviderLeftNavbar';
import ProviderTopNavbar from '../NavigationBars/ProviderTopNavbar';




const Layout: React.FC = ({ children }) => {
    return (
        <MainGrid 
            topNavbar={<ProviderTopNavbar />}
            leftNavbar={<ProviderLeftNavbar />}
        >
            {children}
        </MainGrid>
    )
}



export default Layout;