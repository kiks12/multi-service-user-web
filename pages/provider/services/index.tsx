
/*

Multi Service Platform - Provider Services Page
Created: Feb. 12, 2022
Last Updated: Mar. 25, 2022
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

    


    // this useMemo function handles the filtering of the service based on 
    // status, i.e. active, inactive, or all
    const filteredServices = useMemo(() => {
        if (activePrompt === 'active') {
            // if active prompt from menu is active then filter to services that are active
            return myServices.filter(service => service.status === 'active');
        }

        if (activePrompt === 'inactive') {
            // if active prompt from menu is inactive then filter to services that are inactive
            return myServices.filter(service => service.status === 'inactive');
        }
 
        // otherwise return unfiltered services
        return myServices;
    }, [activePrompt, myServices]);




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

    // server side fetch the services from the external server
    // using authorized fetch utility function
    const servicesFetchResults = await authorizedFetch({
        url: `${__backend__}/provider/services/get-services?includedProperty=Users-Images`,
        accessToken: req.cookies.accessToken as string,
        method: 'GET',
    })





    if (req.cookies.accessToken) {
        // fetch user information if accesstoken is not null/undefined
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation.user) {
            // if user information not fetched properly
            // return only accesstoken
            return {
                props: {
                    user: {},
                    services: [],
                    accessToken: req.cookies.accessToken,
                }
            }
        }



        if (userInformation.user.firstProviderLogin) {
            // redirect to /provider/get-started if user firstProviderLogin 
            // property is set to true
            return {
                redirect: {
                    permanent: false,
                    destination: '/provider/get-started'
                }
            }
        }


        // if all conditions are inapplicable 
        // then return user, services, and accessToken
        return {
            props: {
                user: userInformation.user,
                services: servicesFetchResults.services,
                accessToken: req.cookies.accessToken,
            }
        }
    }


    
    // otherwise return all except user information
    return {
        props: {
            user: {},
            services: servicesFetchResults.services,
            accessToken: req.cookies.accessToken,
        }
    }

}



export default ProviderServices;