
/*

Multi Service Platform - per Service Page for provider
Created: Feb. 23, 2022
Last Updated: Mar. 24, 2022
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
import DeleteServiceModal from "../../../../src/components/Modals/DeleteServiceModal";
import Calendar from "react-calendar";
import useSplitArray from "../../../../src/custom-hooks/useSplitArray";
import { formatDateToString, formatStringToDate } from "../../../../utils/formatDate";
import authorizedFetch from "../../../../utils/authorizedFetch";



const Service : NextPage = ({
    user,
    serviceInformation,
    accessToken}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();
    const [serviceInformationState] = useState<any>(serviceInformation);


    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);


    const unavailableDates = useSplitArray({
        stringToSplit: serviceInformation.unavailableDates,
        splitter: ' | ',
    });


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
            {
                openDeleteModal &&
                <DeleteServiceModal 
                    service={serviceInformationState}
                    accessToken={accessToken}
                    setOpenDeleteModal={setOpenDeleteModal}
                />
            }
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
                            <Link href={`/provider/services/${serviceInformation.serviceId}/edit`} passHref={true}>
                                <button>
                                    Edit Service
                                </button>
                            </Link>

                            <button 
                                style={{
                                    marginTop: '0.5em'
                                }}
                                onClick={() => setOpenDeleteModal(true)}
                            >
                                Delete Service
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

                    <div className='split'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <h3 style={{width: '50%', textAlign: 'center'}}>Type: </h3>
                            <input 
                                style={{width: '50%'}}    
                                value={serviceInformationState.priceType}
                                className='form-control'
                                disabled
                            />
                        </div>


                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <h3 style={{width: '50%', textAlign: 'center'}}>Starting Price: </h3>
                            <input 
                                style={{width: '50%'}}    
                                value={formattedInitial}
                                className='form-control'
                                disabled
                            />
                        </div>


                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <h3 style={{width: '50%', textAlign: 'center'}}>Last Price: </h3>
                            <input 
                                style={{width: '50%'}}    
                                value={formattedFinal}
                                className='form-control'
                                disabled
                            />
                        </div>
                    </div>
                </div>


                <div style={{
                    margin: '1em 0'
                }}>
                    <h2>Unavailable Dates</h2>
                    <Calendar 
                        calendarType="US"
                        tileDisabled={({date}) => {
                            const _date = formatDateToString(date);
                            return unavailableDates.includes(_date);
                        }}
                    />
                </div>


                <div style={{
                    margin: '1em 0'
                }}>
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


        // get service information from server 
        // send an Authorized GET Request to /provider/services/get-service-information
        const serviceInformationResponse = await authorizedFetch({
            url: `${__backend__}/provider/services/get-service-information?serviceId=${serviceID}&includedProperty=Users-Images`,
            accessToken: req.cookies.accessToken,
            method: 'GET',
        });



        if (!userInformation || !serviceInformationResponse) {
            return {
                props: {
                    user: {},
                    serviceInformation: {},
                    accessToken: req.cookies.accessToken
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                serviceInformation: serviceInformationResponse.service,
                accessToken: req.cookies.accessToken
            }
        }
    }



    return {
        props: {
            user: {},
            serviceInformation: {}, 
            accessToken: req.cookies.accessToken
        }
    }
}



export default Service;