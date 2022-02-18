
/*

Multi Service Platform - Main Provider Page
Created: Feb. 10, 2022
Last Updated: Feb. 18, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType,
    NextPage } from "next";



import { useEffect } from "react";



import fetchUserInformation from "../../libs/fetchUserInformation";



import ProviderLayout from "../../src/components/Provider/Layout/ProviderLayout";



import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



const Provider : NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();

    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, []);


    return (
        <>
            <ProviderLayout />
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);

        return {
            props: {
                user: userInformation.user
            }
        }
    }
    return {
        props: {}
    }
}



export default Provider;