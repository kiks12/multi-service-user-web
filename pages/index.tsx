
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Mar. 02, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useState } from 'react';



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from 'next'
import Head from 'next/head';



import Layout from '../src/components/layout/Layout';



import { useAuthentication } from '../src/custom-hooks/useAuthentication';
import useWebSocket from '../src/custom-hooks/useWebSocket';
import fetchUserInformation from '../libs/fetchUserInformation';



import Categories from '../src/components/Home/Categories';
import Promos from '../src/components/Home/Promos';
import ForYou from '../src/components/Home/ForYou';
import Recents from '../src/components/Home/Recents';




const Home: NextPage = ({ user, accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => { 

    const { setSession } = useAuthentication();
    const socket = useWebSocket();
    const [i, setI] = useState<string>('');


    useEffect(() => {
        if(typeof setSession === 'function') setSession(user);
    }, [setSession, user]);

    
    useEffect(() => { 

        socket?.on('try-reply', msg => {
            setI(msg);
        })
        
    }, [socket]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Layout accessToken={accessToken}> 
                <button onClick={() => {
                    socket?.emit('try', 'click');
                }}>
                    Click
                </button>

                <input value={i} onChange={(e) => setI(e.target.value)}/>

                <Promos />

                <Categories />

                <ForYou />

                <Recents />
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
                    user: {},
                    accessToken: ''
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
            user: {},
            accessToken: ''
        }
    }
}



export default Home;
