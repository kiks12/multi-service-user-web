
/*

Multi Service Platform - Service Page for Users
Created: Feb. 23, 2022
Last Updated: Feb. 24, 2022
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
import useSplitArray from "../../src/custom-hooks/useSplitArray";
import Overview from "../../src/components/ServicePage/Overview";
import Link from "next/link";
import Description from "../../src/components/ServicePage/Description";





const ServicePage : NextPage = ({
    user,
    service}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();

    const categories = useSplitArray({
        stringToSplit: service.category,
        splitter: ' | ',
        dependencies: service
    })



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


                <ul style={{
                    margin: '1em 0'
                }}>
                    {
                        categories && categories.map((category, idx) => {
                            return (
                                <Link 
                                    href={`/${category.toLocaleLowerCase()}`} 
                                    passHref={true}
                                    key={idx}
                                >
                                    <li 
                                        key={idx} 
                                        className='main-purple-link'
                                        style={{
                                            listStyle: 'none'
                                        }}
                                    >
                                        {category} | 
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>


               <Overview service={service}/>


               <Description service={service}/>


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