


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