/*

Multi Service Platform - Provider Layout Component
Created: Feb. 12, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/

import React from "react";
import MainGrid from "../../layout/MainGrid";
import TopNavbar from "../../NavigationBars/TopNavbar";

import ProviderLeftNavbar from "../NavigationBars/ProviderLeftNavbar";

interface props {
    accessToken: string;
}

const Layout: React.FC<props> = ({ children, accessToken }) => {
    return (
        <MainGrid 
            topNavbar={<TopNavbar accessToken={accessToken}/>} 
            leftNavbar={<ProviderLeftNavbar />}
        >
            {children}
        </MainGrid>
    );
};

export default Layout;
