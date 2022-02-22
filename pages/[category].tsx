
/*

Multi Service Platform - Category Page
Created: Feb. 22, 2022
Last Updated: Feb. 22, 2022
Author: Tolentino, Francis James S.

*/




import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";



import { Key, useEffect } from "react";
import { useAuthentication } from "../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../libs/fetchUserInformation";



import Layout from "../src/components/layout/Layout";
import authorizedFetch from "../utils/authorizedFetch";
import { __backend__ } from "../src/constants";




const CategoryPage: NextPage = ({
    user,
    services}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);



    return (
        <Layout>
            {
                services.length !== 0 && services.map((service: any, idx: Key | null | undefined) => {
                    return (
                        <p key={idx}>{JSON.stringify(service)}</p>
                    )
                })
            }
        </Layout>
    )    
}




export const getServerSideProps: GetServerSideProps = async ({
    req, 
    query}: GetServerSidePropsContext) => {


    const category = query.category;


    const res = await authorizedFetch({
        url: `${__backend__}/services?category=${category}`,
        method: 'GET',
        accessToken: req.cookies?.accessToken,
    })


    
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    services: res.services,
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                services: res.services,
            }
        }
    }



    return {
        props: {
            user: {},
            services: res.services,
        }
    }
}




export default CategoryPage;