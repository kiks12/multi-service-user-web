
/*

Multi Service Platform - Provider Get Started Main Component
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useState } from 'react';



import BackNext from './BackNext';
import BasicInformation from './BasicInformation';
import GetStartedBar from './GetStartedBar';
import ShopDescription from './ShopDescription';
import Skills from './Skills';




type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';




const GetStartedContent: React.FC = () => {

    const [activePrompt, setActivePrompt] = useState<ActivePrompt>('Basic');


    useEffect(() => {
        const persistedActivePrompt = window.localStorage.getItem('activePrompt');

        if(persistedActivePrompt){
            setActivePrompt(window.localStorage.getItem('activePrompt') as ActivePrompt);
        }
    }, []);



    return (
        <div>
            <h2>Get Started</h2>
            <GetStartedBar 
                activePrompt={activePrompt} 
                setActivePrompt={setActivePrompt}
            />

            {
                activePrompt === 'Basic' && <BasicInformation />
            }
                
            {
                activePrompt === 'Desc' && <ShopDescription />
            }

            {
                activePrompt === 'Skills' && <Skills />
            }

            <BackNext 
                activePrompt={activePrompt}    
                setActivePrompt={setActivePrompt}    
            />

        </div>
    )
}



export default GetStartedContent;