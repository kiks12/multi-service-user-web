
/*

Multi Service Platform - Service Page for Users
Created: Feb. 23, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import { 
    GetServerSideProps,
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import fetchUserInformation from "../../libs/fetchUserInformation";
import { __backend__ } from "../../src/constants";



import { useEffect } from "react";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



import Layout from "../../src/components/layout/Layout";
import MenuBar from "../../src/components/ServicePage/MenuBar";





const ServicePage : NextPage = ({
    user,
    service}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();


    useEffect(() =>{
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);





    return (
        <>
            <Layout>
                {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}
                
                <MenuBar />
            </Layout>
        </>
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
                    service: {}
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                service: jsonRes.service
            }
        }
    }



    return {
        props: {
            user: {},
            service: {}
        }
    }
}




export default ServicePage;