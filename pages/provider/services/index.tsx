
/*

Multi Service Platform - Provider Services Page
Created: Feb. 12, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from 'next';



import { useEffect } from 'react';
import { useAuthentication } from '../../../src/custom-hooks/useAuthentication';



import authenticatePage from '../../../libs/authenticatePage';



import Layout from '../../../src/components/Provider/Layout/ProviderLayout';



const ProviderServices : NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();

    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    return (
        <>
            <Layout />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const [isAuthenticated, user] = authenticatePage(ctx);

    if (isAuthenticated) {
        return {
            props: {
                user: user,
            }
        }
    }


    return {
        redirect: {
            permanent: false,
            destination: '/provider/login'
        },
        props: {}
    }
}



export default ProviderServices;