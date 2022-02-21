
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



import fetchUserInformation from "../../libs/fetchUserInformation";



import Layout from "../../src/components/Provider/Layout/ProviderLayout";
import GetStartedBar from "../../src/components/Provider/ContentSection/GetStarted/GetStartedBar";
import BasicInformation from "../../src/components/Provider/ContentSection/GetStarted/BasicInformation";
import ShopDescription from "../../src/components/Provider/ContentSection/GetStarted/ShopDescription";
import Skills from "../../src/components/Provider/ContentSection/GetStarted/Skills";




type ActivePrompt = 'Basic' | 'Desc' | 'Skills' | 'Upload' | 'Final';




const GetStarted: NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();
    const [startProcess, setStartProcess] = useState<boolean>(false);
    const [activePrompt, setActivePrompt] = useState<ActivePrompt>('Basic');



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);




    return (
        <>
            <Head>
                <title>Get Started</title>
            </Head>

            <Layout>

                {
                    !startProcess && (

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                        >
                            <div 
                                className='card'
                                style={{
                                    width: '50%',
                                    height: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <div>
                                    <h1>Get Started as a Provider</h1>
                                    <p>In order to proceed as a provider, you need to finish the process</p>
                                </div>
                                <button 
                                    className="main-button"
                                    onClick={() => setStartProcess(true)}
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <h2>Get Started</h2>
                                <button
                                    className='red-button'
                                    style={{
                                        width: '10%'
                                    }}
                                    onClick={() => setStartProcess(false)}
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



        return {
            props: {
                user: userInformation.user
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