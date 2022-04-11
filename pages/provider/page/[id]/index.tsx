

import { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage 
} from "next";



import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";



import styles from '../../../../src/components/Provider/Page/Header/Header.module.css';



import Layout from "../../../../src/components/layout/Layout";


import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";
import ProviderPageHeader from "../../../../src/components/Provider/Page/Header";
import ProviderPageInformation from "../../../../src/components/Provider/Page/Information";
import Service from "../../../../src/components/Services/Service";




const ProviderPage : NextPage = (
    { user, accessToken, provider }: InferGetServerSidePropsType<typeof getServerSideProps>
) => {

    const { setSession } = useAuthentication();

 
    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    return (
        <Layout accessToken={accessToken}>
            {/* <pre>{JSON.stringify(provider, null, 2)}</pre> */}
            <ProviderPageHeader provider={provider}/>

            <div className={styles.container}>
                <ProviderPageInformation provider={provider}/>

                <div>
                    <h3>Services</h3>
                    <div className="services-grid">
                        {
                            provider.Services.length !== 0 ? (
                                provider.Services.map((service: any, idx: number) => {
                                    return <Service key={idx} service={service}/>
                                })
                            ) : (
                                <p>No Services Yet</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async (
    {req, query}: GetServerSidePropsContext) => {

    const { id } = query;


    const serviceProviderInformationResponse = await fetch(`${__backend__}/unauthorized/provider-information?serviceProviderId=${id}`, {
        method: 'GET',
    });
    const serviceProviderInformationJSON = await serviceProviderInformationResponse.json();

    
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies.accessToken);

        if (userInformation) {
            return {
                props: {
                    user: userInformation.user,
                    accessToken: req.cookies.accessToken,
                    provider: serviceProviderInformationJSON.provider
                }
            }
        }
    }

    return {
        props: {
            user: '',
            accessToken: '',
            provider: serviceProviderInformationJSON.provider,
        }
    }
}



export default ProviderPage;