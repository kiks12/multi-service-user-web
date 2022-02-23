
/*

Multi Service Platform - per Service Page for provider
Created: Feb. 23, 2022
Last Updated: Feb. 23, 2022
Author: Tolentino, Francis James S.

*/



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';



import { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Link from "next/link";


    
import { useEffect, useMemo, useState } from "react";



import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";
import { formatter } from "../../../../utils/formatter";



import Layout from "../../../../src/components/Provider/Layout/ProviderLayout";



import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";



const Service : NextPage = ({
    user,
    serviceInformation}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const [serviceInformationState, setServiceInformationState] = useState<any>(serviceInformation);


    const formattedInitial = useMemo(() => {
        return formatter.format(serviceInformationState.priceInitial);
    }, [serviceInformationState])


    const formattedFinal = useMemo(() => {
        return formatter.format(serviceInformationState.priceFinal);
    }, [serviceInformationState])


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);

    

    return (
        <>
            <Layout>
                <div style={{margin: '0 0 1em 0'}}>
                    <Link href='/provider/services' passHref={true}>
                        <div 
                            className='account-circle'
                            style={{
                                backgroundColor: 'var(--white)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '0.3px solid var(--gray)',
                                cursor: 'pointer'
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={faArrowLeft}
                            />
                        </div>
                    </Link>
                </div>
                {/* <pre>{JSON.stringify(serviceInformationState, null, 2)}</pre> */}

                <div className=''>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h2>{serviceInformationState.title}</h2>
                            <p>Status: {serviceInformationState.status}</p>
                        </div>

                        <div>
                            <button>
                                Edit Service
                            </button>
                        </div>
                    </div>

                    <div style={{
                        margin: '1em 0',
                        width: '100%',
                        height: '50vh',
                        backgroundColor: 'var(--gray)'
                    }}>
                        Carousel
                    </div>
                </div>


                <div className=''>
                    <h2>About this Service</h2>
                    <textarea 
                        style={{
                            border: 'none',
                            resize: 'none',
                            width: '100%',
                            minHeight: '20vh',
                            overflow: 'auto',
                            outline: 'none',
                            cursor: 'default'
                        }}
                        readOnly={true}
                        defaultValue={serviceInformationState.serviceDetails}
                    />
                </div>


                <div>
                    <h2>Pricing</h2>

                    <div>
                        <h3>Type: </h3>
                        <p>{serviceInformationState.priceType}</p>
                    </div>


                    <div>
                        <h3>Starting Price: </h3>
                        <p>{formattedInitial}</p>
                    </div>


                    <div>
                        <h3>Last Price: </h3>
                        <p>{formattedFinal}</p>
                    </div>
                </div>


                <div>
                    <h2>Related Tags</h2>
                    <p>{serviceInformationState.category}</p>
                </div>

            </Layout>
        </>
    )
}





export const getServerSideProps: GetServerSideProps = async ({req, query}: GetServerSidePropsContext) => {
    
    const { serviceID } = query;


    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        const serviceInformationResponse = await fetch(`${__backend__}/services/service-information?serviceID=${serviceID}`, {
            method: 'GET',
        })
        const serviceInformationJson = await serviceInformationResponse.json(); 


        if (!userInformation || !serviceInformationJson) {
            return {
                props: {
                    user: {},
                    serviceInformation: {}
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                serviceInformation: serviceInformationJson.service
            }
        }
    }



    return {
        props: {
            user: {},
            serviceInformation: {} 
        }
    }
}



export default Service;