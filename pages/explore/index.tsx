
/*

Multi Service Platform - Explore Page
Created: Feb. 09, 2022
Last Updated: Feb. 19, 2022
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



const Explore: NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    
    return (
        <Layout />
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



export default Explore;