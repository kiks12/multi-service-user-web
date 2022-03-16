
/*

Mutli Service Platform - Provider Get Started Bar (Basic Information -> Skills -> Description -> Finalization)
Created: Feb. 12, 2022
Last Updated: Mar. 16, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react'; 



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
            <ul className='menu-ul'>
                <li 
                    className={activePrompt === 'Basic' ? 'menu-li-active' : 'menu-li'}
                    onClick={() => changeActivePromptHandler('Basic')}    
                >
                    Basic Information
                </li>

                <li 
                    className={activePrompt === 'Desc' ? 'menu-li-active' : 'menu-li'}
                    onClick={() => changeActivePromptHandler('Desc')}    
                >
                    Shop Description
                </li>

                <li 
                    className={activePrompt === 'Skills' ? 'menu-li-active' : 'menu-li'}
                    onClick={() => changeActivePromptHandler('Skills')}    
                >
                    Skills
                </li>

                <li 
                    className={activePrompt === 'Upload' ? 'menu-li-active' : 'menu-li'}
                    onClick={() => changeActivePromptHandler('Upload')}    
                >
                    Upload Images/Videos
                </li>

                <li 
                    className={activePrompt === 'Final' ? 'menu-li-active' : 'menu-li'}
                    onClick={() => changeActivePromptHandler('Final')}    
                >
                    Finalization
                </li>


            </ul>
        </div>
    )
}



export default GetStartedBar;