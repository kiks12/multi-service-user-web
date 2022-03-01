
/*

Multi Service Platform - Category Page
Created: Feb. 22, 2022
Last Updated: Mar. 01, 2022
Author: Tolentino, Francis James S.

*/




import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";



import { Key, useEffect } from "react";
import { useAuthentication } from "../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../libs/fetchUserInformation";



import Layout from "../src/components/layout/Layout";
import authorizedFetch from "../utils/authorizedFetch";
import { __backend__ } from "../src/constants";
import Service from "../src/components/Services/Service";




const CategoryPage: NextPage = ({
    user,
    services,
    category, 
    accessToken}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);



    return (
        <Layout accessToken={accessToken}>
            <h2>{category}</h2>

            <div className='services-grid'>
                {
                    services.length !== 0 && services.map((service: any, idx: Key | null | undefined) => {
                        return (
                            <Service key={idx} service={service}/>
                        )
                    })
                }
            </div>
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
                    services: [],
                    category: category,
                    accessToken: '',
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                services: res.services,
                category: category,
                accessToken: req.cookies.accessToken,
            }
        }
    }



    return {
        props: {
            user: {},
            services: [],
            category: category,
            accessToken: '',
        }
    }
}




export default CategoryPage;