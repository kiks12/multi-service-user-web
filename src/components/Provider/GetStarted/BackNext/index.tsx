
/*

Multi Service Platform - Provider Get Started Back Next Component
Created: Feb. 12, 2022
Last Updated: Mar. 19, 2022
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
    images: {
        cover: any;
        profile: any;
        videos: any[];
        images: any[];
    }
}



const BACK_NEXT_PROMPTS = {
    'Basic': ['', 'Desc'],
    'Desc': ['Basic', 'Skills'],
    'Skills': ['Desc', 'Upload'],
    'Upload': ['Skills', 'Final'],
    'Final': ['Upload', '']
}




const BackNext: React.FC<BackNextProps> = ({ 
    activePrompt, 
    setActivePrompt,
    accessToken,
    images
 }) => {

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



    const handleCoverPhotoUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('files', images.cover);
            const res = await authorizedFetch({
                url: `${__backend__}/provider/upload-cover-photo`,
                accessToken,
                body: formData,
                method: 'POST',
            })
            return Promise.resolve(res);
        } catch (e) {
            // handle errors
            console.error(e);
        }
    }




    const handleProfilePictureUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('files', images.profile);
            const res = await authorizedFetch({
                url: `${__backend__}/provider/upload-profile-picture`,
                accessToken,
                body: formData,
                method: 'POST',
            })
            return Promise.resolve(res);
        } catch (e) {
            // handle errors
            console.error(e);
        }
    }




    const handleImagesUpload = async () => {
        try {
            const formData = new FormData();

            for (let i=0; i<images.images.length; i++) {
                formData.append('files', images.images[i]);
            }

            const res = await authorizedFetch({
                url: `${__backend__}/provider/upload-images`,
                accessToken,
                body: formData,
                method: 'POST',
            })
            return Promise.resolve(res);
        } catch (e) {
            // handle errors 
            console.error(e);
        }
    }




    const handleProviderInformationUpdate = async () => {
        try {
            const res = await authorizedFetch({
                url:`${__backend__}/provider/update-information?firstVerifiedLogin=0`,
                method: 'PUT',
                accessToken: accessToken,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(session),
            });


            if (typeof setSession === 'function') setSession(res.user);

            return Promise.resolve(res);
        } catch (e) {
            console.error(e);
        }
    }



    



    // on click handler of finish button
    const finalizationLogicHandler = async () => {
        // create a post request to Provider Information Update API Route
        const { msg } = await handleProviderInformationUpdate();
        const { msg:msg2 } = await handleProfilePictureUpload();
        const { msg:msg3 } = await handleCoverPhotoUpload();
        const {msg:msg4 } = await handleImagesUpload();
        setMessage(`${msg}, ${msg2}, ${msg3}, and ${msg4}`);
        setOpenModal(true);
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