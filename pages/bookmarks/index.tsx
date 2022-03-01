
/*

Multi Service Platform - Bookmarks Page
Created: Feb. 09, 2022
Last Updated: Mar. 01, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect } from "react";



import fetchUserInformation from "../../libs/fetchUserInformation";



import Layout from "../../src/components/layout/Layout";



import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



const Bookmarks: NextPage = ({ user, accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);



    return (
        <Layout accessToken={accessToken}/>
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



export default Bookmarks;