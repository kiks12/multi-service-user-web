


import React from 'react';
import useActivePage from '../../../custom-hooks/useActivePage';
import { useAuthentication } from '../../../custom-hooks/useAuthentication';
import GetStartedContent from './GetStarted/GetStartedContent';



const ProviderContentSection: React.FC = () => {

    const { session } = useAuthentication();
    const activePage = useActivePage();

    return (
        <div>
            {
                (session?.firstProviderLogin && activePage === 'Provider-Overview') ?
                <GetStartedContent /> : <></>
            }
        </div>
    )
}



export default ProviderContentSection;