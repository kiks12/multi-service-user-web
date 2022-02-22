
/*

Multi Service Platform - Provider Services Page
Created: Feb. 12, 2022
Last Updated: Feb. 22, 2022
Author: Tolentino, Francis James S.

*/



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
import CreateNewServiceComponent from '../../../src/components/Provider/Services/Create/CreateNewServiceComponent';



type Prompts = 'active' | 'inactive' | 'all'



const ProviderServices : NextPage = ({
    user,
    services
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();
    const [activePrompt, setActivePrompt] = useState<Prompts>('active');
    const [myServices, setMyServices] = useState<any[]>(services);


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




    return (
        <>
            <Layout>
                <ServicesMenu 
                    activePrompt={activePrompt}
                    onClick={(value: Prompts) => {
                    setActivePrompt(value);
                }}
                />
                <div style={{
                    padding: '2em 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(10em , 20em))'
                }}>
                    {
                        filteredServices.length !== 0 && filteredServices.map((service, idx) => {
                            <Service 
                                service={service}
                                key={idx}
                            />
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
                    services: []
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
            }
        }
    }



    return {
        props: {
            user: {},
            services: servicesFetchResults.services
        }
    }

}



export default ProviderServices;