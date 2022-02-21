
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Feb. 19, 2022
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



import { useAuthentication } from '../src/custom-hooks/useAuthentication';
import fetchUserInformation from '../libs/fetchUserInformation';



const Home: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => { 

    const { setSession } = useAuthentication();


    useEffect(() => {
        if(typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Layout> 
                <p>Home</p>
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



export default Home;
