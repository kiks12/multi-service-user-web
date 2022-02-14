
/*

Multi Service Platform - Provider Get Started Back Next Component
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022
Auhtor: Tolentino, Francis James S.

*/



import React from 'react';



import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';



interface BackNextProps {
    activePrompt: ActivePrompt;
    setActivePrompt: React.Dispatch<React.SetStateAction<ActivePrompt>>;
}



const BACK_NEXT_PROMPTS = {
    'Basic': ['', 'Desc'],
    'Desc': ['Basic', 'Skills'],
    'Skills': ['Desc', 'Upload'],
    'Upload': ['Skills', 'Final'],
    'Final': ['Upload', '']
}




const BackNext: React.FC<BackNextProps> = ({activePrompt, setActivePrompt}) => {

    const { session, setSession } = useAuthentication();


    // change active prompt per click on back button to persist the active prompt 
    const backButtonLogicHandler = () => {
        window.localStorage.setItem('activePrompt', BACK_NEXT_PROMPTS[activePrompt][0]);
        setActivePrompt((prev:any) => {
            prev = BACK_NEXT_PROMPTS[activePrompt][0]
            return prev;
        })
    }



    // change active prompt per click on next button to persist the active prompt 
    const nextButtonLogicHandler = () => {
        window.localStorage.setItem('activePrompt', BACK_NEXT_PROMPTS[activePrompt][1]);
        setActivePrompt((prev:any) => {
            prev = BACK_NEXT_PROMPTS[activePrompt][1]
            return prev;
        })
    }
    


    // on click handler of finish button
    const finalizationLogicHandler = async () => {
        // create a post request to Provider Information Update API Route
        try {
            const res = await fetch(`/api/provider/information/update?id=${session?.userId}&accessToken=${session?.accessToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(session),
            })


        const jsonRes = await res.json();


            if (typeof setSession === 'function') setSession(jsonRes.user);
        } catch (e) {
            console.error(e);
        }
    }



    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '3em 0 0 0'
        }}>

            <div 
                style={{
                    width: '5%'
                }}
            >
                {
                    activePrompt !== 'Basic' &&
                        <button 
                            className='button'
                            onClick={backButtonLogicHandler}
                        >
                            Back
                        </button>
                }
            </div>


            <div 
                style={{
                    width: '5%'
                }}
            >
                {
                    activePrompt !== 'Final' ? (
                        <button 
                            className='button main-button'
                            onClick={nextButtonLogicHandler}
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            className='button main-button'
                            onClick={finalizationLogicHandler}
                        >
                            Finish
                        </button>
                    )
                }
            </div>
        </div>
    )
}



export default BackNext;