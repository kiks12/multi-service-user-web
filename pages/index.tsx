
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect } from 'react';



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from 'next'
import Head from 'next/head';



import Layout from '../src/components/layout/Layout';
import authenticatePage from '../libs/authenticatePage';
import fetchServices from '../libs/fetchServices';



import { useAuthentication } from '../src/custom-hooks/useAuthentication';



const Home: NextPage = ({ user, services}: InferGetServerSidePropsType<typeof getServerSideProps>) => { 

    const {setSession} = useAuthentication();


    useEffect(() => {
        if(typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    useEffect(() => {
        console.log(services);
    }, [services]);


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Layout />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    
    const [isAuthenticated, user] = authenticatePage(ctx);
    const services = await fetchServices({
        userId: user.userId,
        accessToken: user.accessToken
    })


    if (isAuthenticated) {
        return {
            props: {
                user: user,
                services: services
            }
        }
    }


    return {
        props: {}
    }
}



export default Home;
