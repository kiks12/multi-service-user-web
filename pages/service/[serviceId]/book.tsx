


/*

Multi Service Platform - Book Service Page for users
Created: Mar. 02, 2022
Last Updated: Mar. 02, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../../../libs/fetchUserInformation";
import { __backend__ } from "../../../src/constants";



import Layout from "../../../src/components/layout/Layout";



const BookService : NextPage = ({
    user,
    accessToken,
    service
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const {setSession} = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, []);


    
    return (
        <Layout accessToken={accessToken}>

        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({
    req, 
    query}: GetServerSidePropsContext) => {

    const { serviceId } = query;


    const res = await fetch(`${__backend__}/services/service-information?serviceID=${serviceId}`, {
        method: 'GET'
    });

    const jsonRes = await res.json();


    
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    service: {},
                    accessToken: ''
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                service: jsonRes.service,
                accessToken: req.cookies.accessToken
            }
        }
    }



    return {
        props: {
            user: {},
            service: {},
            accessToken: ''
        }
    }

}



export default BookService;