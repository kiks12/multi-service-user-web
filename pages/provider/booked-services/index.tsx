

/*

Multi Service Platform - Provider Booked Services Page
Created: Mar. 02, 2022
Last Updated: Mar. 03, 2022
Author: Tolentino, Francis James S.

*/



import { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../../../libs/fetchUserInformation";



import Layout from "../../../src/components/Provider/Layout/ProviderLayout";
import authorizedFetch from "../../../utils/authorizedFetch";
import { __backend__ } from "../../../src/constants";
import ProviderBookedServicesMenu from "../../../src/components/Provider/BookedServices/ProviderBookedServicesMenu";




const BookedServices: NextPage = ({
    user,
    bookedServices
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();



    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    return (
        <Layout>
            {/* <pre>{JSON.stringify(bookedServices, null, 2)}</pre> */}
            <ProviderBookedServicesMenu />

            

        </Layout>
    )
}




export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);
        const bookedServices = await authorizedFetch({
            accessToken: req.cookies.accessToken,
            method: 'GET',
            url: `${__backend__}/bookings/provider/fetch-bookings`,
        })


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    bookedServices: []
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
                bookedServices: bookedServices.bookings
            }
        }
    }



    return {
        props: {
            user: {},
            bookedServices: []
        }
    }

}




export default BookedServices;