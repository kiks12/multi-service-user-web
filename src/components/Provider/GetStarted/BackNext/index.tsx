
/*

Multi Service Platform - Provider Get Started Back Next Component
Created: Feb. 12, 2022
Last Updated: Feb. 21, 2022
Auhtor: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



import React, { useState } from 'react';
import authorizedFetch from '../../../../../utils/authorizedFetch';
import { __backend__ } from '../../../../constants';



import { useAuthentication } from '../../../../custom-hooks/useAuthentication';
import { useRouter } from 'next/router';



import Modal from '../../../Modals/Modal';



type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';



interface BackNextProps {
    activePrompt: ActivePrompt;
    setActivePrompt: React.Dispatch<React.SetStateAction<ActivePrompt>>;
    accessToken: string;
}



const BACK_NEXT_PROMPTS = {
    'Basic': ['', 'Desc'],
    'Desc': ['Basic', 'Skills'],
    'Skills': ['Desc', 'Upload'],
    'Upload': ['Skills', 'Final'],
    'Final': ['Upload', '']
}




const BackNext: React.FC<BackNextProps> = ({ activePrompt, setActivePrompt, accessToken }) => {

    const { session, setSession } = useAuthentication();
    const [message, setMessage] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();


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
        console.log(session);
        // try {
        //     const res = await authorizedFetch({
        //         url:`${__backend__}/provider/update-information?firstVerifiedLogin=0`,
        //         method: 'PUT',
        //         accessToken: accessToken,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(session),
        //     });


        //     setMessage(res.msg);
        //     setOpenModal(true);


        //     if (typeof setSession === 'function') setSession(res.user);
        // } catch (e) {
        //     console.error(e);
        // }
    }



    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '3em 0 0 0'
        }}>

            <div>
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


            <div>
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


            {
                openModal && 
                <Modal>
                    <div 
                        style={{
                            width: 'min(30em, 90%)'
                        }}
                        className="card"
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '0 0 1em 0'
                        }}>
                            <h2>Message</h2>
                            <FontAwesomeIcon
                                onClick={() => setOpenModal(false)}
                                style={{
                                    cursor: 'pointer'
                                }}
                                icon={faXmark}
                            />
                        </div>
                        <p>{message}</p>
                        <div style={{
                            margin: '2em 0 0 0'
                        }}>
                            <button 
                                className='main-button'
                                onClick={() => {
                                    router.push('/provider');
                                }}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}



export default BackNext;