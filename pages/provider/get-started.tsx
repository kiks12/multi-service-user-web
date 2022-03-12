
/*

Multi Service Platform - Provider Get Started Page
Created: Feb. 21, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Head from "next/head";



import { useEffect, useState } from "react";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



import styles from './GetStarted.module.css';



import fetchUserInformation from "../../libs/fetchUserInformation";



import Layout from "../../src/components/Provider/Layout/ProviderLayout";
import GetStartedBar from "../../src/components/Provider/GetStarted/GetStartedBar";
import BasicInformation from "../../src/components/Provider/GetStarted/BasicInformation";
import ShopDescription from "../../src/components/Provider/GetStarted/ShopDescription";
import Skills from "../../src/components/Provider/GetStarted/Skills";
import Finalization from "../../src/components/Provider/GetStarted/Finalization";
import BackNext from "../../src/components/Provider/GetStarted/BackNext";




type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';




const GetStarted: NextPage = ({user, accessToken}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();
    const [startProcess, setStartProcess] = useState<boolean>(false);
    const [activePrompt, setActivePrompt] = useState<ActivePrompt>('Basic');



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
                        <>
                            <div className={styles.getStartedContent}>
                                <h2>Get Started</h2>
                                <button
                                    className='red-button'
                                    style={{
                                        width: '10%'
                                    }}
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
                                    <p>Upload</p>
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
                            />
                        </>
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