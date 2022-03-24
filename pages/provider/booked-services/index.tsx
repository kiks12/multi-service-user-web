

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



import { useEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../../../libs/fetchUserInformation";



import Layout from "../../../src/components/Provider/Layout/ProviderLayout";
import authorizedFetch from "../../../utils/authorizedFetch";
import { __backend__ } from "../../../src/constants";
import ProviderBookedServicesMenu from "../../../src/components/Provider/BookedServices/ProviderBookedServicesMenu";
import ProviderBookedService from "../../../src/components/Provider/BookedServices/ProviderBookedService";



import { Booking, BookedServicesFilter} from "../../../types";






const BookedServices: NextPage = ({
    user,
    serverSideBookedServices,
    accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();

    const [bookedServices, setBookedServices] = useState<Booking[]>([]);
    const [bookedServicesFilter, setBookedServicesFilter] = useState<BookedServicesFilter>('To be Approved');



    useEffect(() => {
        setBookedServices(serverSideBookedServices);
    }, [serverSideBookedServices])



    const filteredBookedServices = useMemo(() => {

        if (bookedServicesFilter === 'All') return bookedServices;

        return bookedServices.filter((booking: Booking) => booking.status.toLocaleLowerCase() === bookedServicesFilter.toLocaleLowerCase());
    }, [bookedServices, bookedServicesFilter]);




    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);




    return (
        <Layout>
            {/* <pre>{JSON.stringify(bookedServices, null, 2)}</pre> */}
            <ProviderBookedServicesMenu
                bookedServicesFilter={bookedServicesFilter}
                setBookedServicesFitler={setBookedServicesFilter}
            />


            <div style={{
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fit, minmax(3.5em, 5em))',
                gridRowGap: '0.5em',
                margin: '1em 0'
            }}>
                {
                    filteredBookedServices.length !== 0 ? filteredBookedServices.map((booking: Booking, idx: number) => {
                        return <ProviderBookedService
                                    setBookedServices={setBookedServices}
                                    booking={booking} 
                                    key={idx}
                                    accessToken={accessToken}
                                />
                    }) : <p>No {bookedServicesFilter} bookings yet.</p>
                }
            </div>

        </Layout>
    )
}




export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);

        // get provider bookings from server
        // create an Authorized GET Request to endpoint 
        // /provider/bookings/get-bookings?includedProperties={}
        const bookedServices = await authorizedFetch({
            accessToken: req.cookies.accessToken,
            method: 'GET',
            url: `${__backend__}/provider/bookings/get-bookings?includedProperties=Services-Users`,
        })


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    serverSideBookedServices: [],
                    accessToken: ''
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
                serverSideBookedServices: bookedServices.bookings,
                accessToken: req.cookies.accessToken
            }
        }
    }



    return {
        props: {
            user: {},
            serverSideBookedServices: [],
            accessToken: ''
        }
    }

}




export default BookedServices;