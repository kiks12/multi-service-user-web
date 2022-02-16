
/*

Multi Service Platform - Provider Layout Component
Created: Feb. 12, 2022
Last Updated: Feb. 16, 2022
Author: Tolentino, Francis James S.

*/



import React, { ReactElement } from 'react';
import MainGrid from '../../layout/MainGrid';



import ProviderContentSection from '../ContentSection/ProviderContentSection';
import ProviderLeftNavbar from '../NavigationBars/ProviderLeftNavbar';
import ProviderTopNavbar from '../NavigationBars/ProviderTopNavbar';



interface LayoutProps {
    contentSection?: ReactElement;
}



const Layout: React.FC<LayoutProps> = ({ contentSection }) => {
    return (
        <MainGrid 
            topNavbar={<ProviderTopNavbar />}
            leftNavbar={<ProviderLeftNavbar />}
            contentSection={contentSection ? contentSection : <ProviderContentSection />}
        />
    )
}



export default Layout;