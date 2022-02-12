
/*

Mutli Service Platform - Provider Get Started Bar (Basic Information -> Skills -> Description -> Finalization)
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/

import React from 'react'; 



// Styling


const UL = {
    display: 'flex',
    listStyle: 'none',
}


const LI = {
    padding: '1em 2em',
    cursor: 'pointer'
}


const ACTIVE_LI = {
    padding: '1em 2em',
    cursor: 'pointer',
    borderBottom: '3px solid var(--mainPurple)'
}


// Styling



type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';



interface GetStartedBarProps {
    activePrompt: ActivePrompt;
    setActivePrompt: React.Dispatch<React.SetStateAction<ActivePrompt>>;
}



const GetStartedBar: React.FC<GetStartedBarProps> = ({activePrompt, setActivePrompt}) => {


    const changeActivePromptHandler = (prompt: ActivePrompt) => {
        localStorage.setItem('activePrompt', prompt);
        setActivePrompt(prompt);
    }



    return (
        <div>
            <ul style={UL}>


                <li 
                    style={activePrompt === 'Basic' ? ACTIVE_LI : LI}
                    onClick={() => changeActivePromptHandler('Basic')}    
                >
                    Basic Information
                </li>

                <li 
                    style={activePrompt === 'Desc' ? ACTIVE_LI : LI}
                    onClick={() => changeActivePromptHandler('Desc')}    
                >
                    Shop Description
                </li>

                <li 
                    style={activePrompt === 'Skills' ? ACTIVE_LI : LI}
                    onClick={() => changeActivePromptHandler('Skills')}    
                >
                    Skills
                </li>

                <li 
                    style={activePrompt === 'Upload' ? ACTIVE_LI : LI}
                    onClick={() => changeActivePromptHandler('Upload')}    
                >
                    Upload Images/Videos
                </li>

                <li 
                    style={activePrompt === 'Final' ? ACTIVE_LI : LI}
                    onClick={() => changeActivePromptHandler('Final')}    
                >
                    Finalization
                </li>


            </ul>
        </div>
    )
}



export default GetStartedBar;