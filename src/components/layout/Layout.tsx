
/*

Multi Service Platform - Main Layout Component
Created: Feb. 09, 2022
Last Updated: Mar. 1, 2022
Author: Tolentino, Francis James S. 

*/



import React from 'react';



import LeftNavbar from '../NavigationBars/LeftNavbar';
import TopNavbar from '../NavigationBars/TopNavbar';
import MainGrid from './MainGrid';



interface LayoutProps { 
    accessToken: string;
}



const Layout: React.FC<LayoutProps> = ({ children, accessToken }) => {


    return (
        <MainGrid 
            leftNavbar={<LeftNavbar />}
            topNavbar={<TopNavbar accessToken={accessToken} />}
        >
            {children}
        </MainGrid>
    )
}



export default Layout;