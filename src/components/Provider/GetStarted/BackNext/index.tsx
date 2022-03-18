
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





    // this function is making the POST request for the cover photo
    // this returns a promise with the result of the POST request to 
    // /provider/upload-cover-photo
    // this will be later called in the main finalization
    const handleCoverPhotoUpload = async () => {
        try {
            // prepare the form data
            const formData = new FormData();
            formData.append('files', images.cover);

            // create the request
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




    // this function sends a POST API request to /provider/upload-profile-picture
    // to upload the profile picture from user information
    // returns a promise with the result of the request
    // this will be later called in the main finalization
    const handleProfilePictureUpload = async () => {
        try {
            // prepare the form data
            const formData = new FormData();
            formData.append('files', images.profile);

            // send the request
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





    // similar to the previous 2 functions, this also
    // sends a POST API request to the server in /provider/upload-images route
    // to handle the uploads of the images
    // returns a promise with the result of the request
    // this will be later called in the main finalization
    const handleImagesUpload = async () => {
        try {
            // create the form data
            const formData = new FormData();

            for (let i=0; i<images.images.length; i++) {
                // iterate through the images and append each
                // image file to formdata
                formData.append('files', images.images[i]);
            }

            // create the request
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




    // this function will create a PUT API request 
    // to /provider/update-information
    // and will return a promise with a value of the result
    // this will be later called in the main finalization
    const handleProviderInformationUpdate = async () => {
        try {
            // create the request
            const res = await authorizedFetch({
                url:`${__backend__}/provider/update-information`,
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



    



    // this is the main finalization logic binded to the finish button component
    // in the DOM, this function calls 4 other functions created above.
    // this will handle all upload and update logic of the get started process
    const finalizationLogicHandler = async () => {
        // create a post request to Provider Information Update API Route
        const { msg } = await handleProviderInformationUpdate();
        const { msg:msg2 } = await handleProfilePictureUpload();
        const { msg:msg3 } = await handleCoverPhotoUpload();
        const {msg:msg4 } = await handleImagesUpload();

        // combine all messages through all 4 requests and set it to the message state
        setMessage(`${msg}, ${msg2}, ${msg3}, and ${msg4}`);
        // then open the modal
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