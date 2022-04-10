

import { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage 
} from "next";



import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";



import Layout from "../../../../src/components/layout/Layout";


import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";




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
            <pre>{JSON.stringify(provider, null, 2)}</pre>
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
    const serviceProviderInformation = await serviceProviderInformationJSON.provider;

    
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies.accessToken);

        if (userInformation) {
            return {
                props: {
                    user: userInformation.user,
                    accessToken: req.cookies.accessToken,
                    provider: serviceProviderInformation
                }
            }
        }
    }

    return {
        props: {
            user: '',
            accessToken: '',
            provider: serviceProviderInformation,
        }
    }
}



export default ProviderPage;