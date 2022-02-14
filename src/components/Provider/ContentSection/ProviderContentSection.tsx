
/*

Multi Service Platform - Main Provider Content Section Component
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022 
Author: Tolentino, Francis James S.

*/



import React from 'react';



import useActivePage from '../../../custom-hooks/useActivePage';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';



import GetStartedContent from './GetStarted/GetStartedContent';
import Services from './Services/Services';



const ProviderContentSection: React.FC = () => {

    const { session } = useAuthentication();
    const activePage = useActivePage();

    return (
        <div>
            {
                (session?.firstProviderLogin && activePage === 'Provider-Overview') ?
                <GetStartedContent /> : <></>
            }
            {
                activePage === 'Provider-Services' && <Services />
            }
        </div>
    )
}



export default ProviderContentSection;