
/*

Multi Service Platform - Provider Get Started Page
Created: Feb. 21, 2022
Last Updated: Mar. 21, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Head from "next/head";



import CryptoJS from "crypto-js";



import { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import styles from './GetStarted.module.css';



import fetchUserInformation from "../../../libs/fetchUserInformation";



import Layout from "../../../src/components/Provider/Layout/ProviderLayout";
import GetStartedBar from "../../../src/components/Provider/GetStarted/MenuBar";
import BasicInformation from "../../../src/components/Provider/GetStarted/BasicInformation";
import ShopDescription from "../../../src/components/Provider/GetStarted/ShopDescription";
import Skills from "../../../src/components/Provider/GetStarted/Skills";
import Finalization from "../../../src/components/Provider/GetStarted/Finalization";
import BackNext from "../../../src/components/Provider/GetStarted/BackNext";
import UploadImages from "../../../src/components/Provider/GetStarted/Upload";




type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';




const GetStarted: NextPage = ({user, accessToken}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { session, setSession } = useAuthentication();
    const [startProcess, setStartProcess] = useState<boolean>(false);
    const [activePrompt, setActivePrompt] = useState<ActivePrompt>('Basic');
    const [profile, setProfile] = useState<any>('');
    const [cover, setCover] = useState<any>('');
    const [images, setImages] = useState<File[]|string[]>([]);
    const [videos, setVideos] = useState<any[]>([]);



    const secretKey = accessToken;



    // const persistUserInputs = useCallback(() => {
    //     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(session), secretKey).toString();
    //     localStorage.setItem('session-persist', encryptedData);
    // }, [secretKey, session]);



    // useEffect(() => {
    //     setTimeout(() => {
    //         const persistedData = localStorage.getItem('session-persist') as string;
    //         if (!persistedData) return;
    //         const decryptedData = CryptoJS.AES.decrypt(persistedData, secretKey).toString(CryptoJS.enc.Utf8);
    //         console.log(decryptedData);
    //         if (typeof setSession === 'function') setSession(JSON.parse(decryptedData));
    //     }, 3000);
    // }, [secretKey, setSession]);



    // useEffect(() => {
    //     persistUserInputs();
    // }, [persistUserInputs]);



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    
    useEffect(() => {
        setStartProcess(localStorage.getItem('startProcess') === 'true');
        setActivePrompt(() => {
            return localStorage.getItem('activePrompt') as ActivePrompt;
        });
    }, [setStartProcess]);




    const startProcessHandler = () => {
        setStartProcess(true);
        localStorage.setItem('startProcess', (!startProcess).toString());
    }



    const cancelProcessHandler = () => {
        setStartProcess(false);
        localStorage.setItem('startProcess', (!startProcess).toString());
    }




    return (
        <>
            <Head>
                <title>Get Started</title>
            </Head>

            <Layout>

                {
                    !startProcess && (

                        <div className={styles.getStartedCardContainer}>
                            <div className={styles.getStartedCard}>
                                <div>
                                    <h1>Get Started as a Provider</h1>
                                    <p>In order to proceed as a provider, you need to finish the process</p>
                                </div>
                                <button 
                                    className="main-button"
                                    onClick={startProcessHandler}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div>

                    )
                }


                {
                    startProcess && (
                        <div className={styles.getStartedContent}>
                            <div className={styles.getStartedHeader}>
                                <h2>Get Started</h2>
                                <button
                                    className='red-button'
                                    onClick={cancelProcessHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                            <GetStartedBar 
                                activePrompt={activePrompt} 
                                setActivePrompt={setActivePrompt}
                            />

                            {
                                activePrompt === 'Basic' && (
                                    <BasicInformation />
                                )
                            }
                            {
                                activePrompt === 'Desc' && (
                                    <ShopDescription />
                                )   
                            }
                            {
                                activePrompt === 'Skills' && (
                                    <Skills />
                                )
                            }
                            {
                                activePrompt === 'Upload' && ( 
                                    <UploadImages 
                                        cover={cover}
                                        setCover={setCover}
                                        images={images}
                                        setImages={setImages}
                                        profile={profile}
                                        setProfile={setProfile}
                                        videos={videos}
                                        setVideos={setVideos}
                                    />
                                )
                            }
                            {
                                activePrompt === 'Final' && ( 
                                    <Finalization />
                                )
                            }

                            <BackNext 
                                activePrompt={activePrompt}
                                setActivePrompt={setActivePrompt}
                                accessToken={accessToken}
                                images={{
                                    cover,
                                    profile,
                                    images,
                                    videos,
                                }}
                            />
                        </div>
                    )
                }
            </Layout>
        </>
    )
}




export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {}
                }
            }
        }



        if (!userInformation.user.firstProviderLogin) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/provider'
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                accessToken: req.cookies.accessToken
            }
        }
    }



    return {
        props: {
            user: {}
        }
    }

}




export default GetStarted;