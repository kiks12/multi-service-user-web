
/*

Multi Service Platform - Bookmarks Page
Created: Feb. 09, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect } from "react";



import authenticatePage from "../../libs/authenticatePage";



import Layout from "../../src/components/layout/Layout";



import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



const Bookmarks: NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, []);



    return (
        <Layout/>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const [isAuthenticated, user] = authenticatePage(ctx);

    if (isAuthenticated) {
        return {
            props: {
                user
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



export default Bookmarks;