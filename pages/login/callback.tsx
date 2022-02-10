
/*

Multi Service Platform - Login Callback Route
Created: Feb. 10, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';



import { useEffect } from 'react';



import { useAuthentication } from '../../src/custom-hooks/useAuthentication';



import Router from '../../src/components/router';



const LoginCallback : NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    const {setSession} = useAuthentication();


    const router = Router();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);

    useEffect(() => {
        router.push('/');
    }, [router]);
    
    return <></>
}



export const getServerSideProps: GetServerSideProps = async ({req} : GetServerSidePropsContext) => {

    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    return {
        props: {
            user
        }
    }
}



export default LoginCallback;