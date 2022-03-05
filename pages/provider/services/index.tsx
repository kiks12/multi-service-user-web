
/*

Multi Service Platform - Provider Services Page
Created: Feb. 12, 2022
Last Updated: Mar. 05, 2022
Author: Tolentino, Francis James S.

*/



import styles from './Services.module.css';



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from 'next';



import { useEffect, useMemo, useState } from 'react';
import { useAuthentication } from '../../../src/custom-hooks/useAuthentication';



import fetchUserInformation from '../../../libs/fetchUserInformation';
import authorizedFetch from '../../../utils/authorizedFetch';
import { __backend__ } from '../../../src/constants';



import Layout from '../../../src/components/Provider/Layout/ProviderLayout';
import ServicesMenu from '../../../src/components/Provider/Services/ServicesMenu';
import Service from '../../../src/components/Provider/Services/Service';
import CreateNewServiceComponent from '../../../src/components/Provider/Services/CreateNewServiceButton';
import type { Service as _services } from '../../../types';



type Prompts = 'active' | 'inactive' | 'all'



const ProviderServices : NextPage = ({
    user,
    services,
    accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();
    const [activePrompt, setActivePrompt] = useState<Prompts>('active');
    const [myServices, setMyServices] = useState<_services[]>(() => services);


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);

    

    const filteredServices = useMemo(() => {
        if (activePrompt === 'active') {
            return myServices.filter(service => service.status === 'active');
        }

        if (activePrompt === 'inactive') {
            return myServices.filter(service => service.status === 'inactive');
        }

        return myServices;
    }, [activePrompt, myServices]);



    useEffect(() => {
        console.log(filteredServices);
    }, [filteredServices]);




    return (
        <>
            <Layout>
                <ServicesMenu 
                    activePrompt={activePrompt}
                    onClick={(value: Prompts) => {
                    setActivePrompt(value);
                }}
                />
                <div className={styles.servicesContainer}>
                    
                    {
                        (filteredServices.length !== 0) && filteredServices.map((service, idx) => {
                            return (
                                <Service 
                                    accessToken={accessToken}
                                    service={service}
                                    key={idx}
                                    setServices={setMyServices}
                                />
                            )
                        }) 
                    }



                    {
                        (activePrompt === 'active' || activePrompt === 'all') && <CreateNewServiceComponent />
                    }

                </div>
            </Layout>
        </>
    )
}




export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    const servicesFetchResults = await authorizedFetch({
        url: `${__backend__}/provider/services/fetch`,
        accessToken: req.cookies.accessToken as string,
        method: 'GET',
    })



    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    services: [],
                    accessToken: req.cookies.accessToken,
                }
            }
        }



        if (userInformation.user.firstProviderLogin) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/provider/get-started'
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                services: servicesFetchResults.services,
                accessToken: req.cookies.accessToken,
            }
        }
    }



    return {
        props: {
            user: {},
            services: servicesFetchResults.services,
            accessToken: req.cookies.accessToken,
        }
    }

}



export default ProviderServices;