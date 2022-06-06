

/*

Multi Service Platform - Provider Booked Services Page
Created: Mar. 02, 2022
Last Updated: Apr. 9, 2022
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



import { Booking as BookingType, BookedServicesFilter} from "../../../types";
import Booking from "../../../src/components/Bookings/Booking";
import {useAccessToken} from "../../../src/custom-hooks/useAccessToken";






const BookedServices: NextPage = ({
    user,
    serverSideBookedServices,
    accessToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const { setAccessToken } = useAccessToken();

    const [bookedServices, setBookedServices] = useState<BookingType[]>([]);
    const [bookedServicesFilter, setBookedServicesFilter] = useState<BookedServicesFilter>('To be Approved');


    useEffect(() => {
        setBookedServices(serverSideBookedServices);
    }, [serverSideBookedServices])

    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);

    useEffect(() => {
        setAccessToken(accessToken);
    }, [setAccessToken, accessToken]);


    const filteredBookedServices = useMemo(() => {

        if (bookedServicesFilter === 'All') return bookedServices;

        return bookedServices.filter((booking: BookingType) => booking.status.toLocaleLowerCase() === bookedServicesFilter.toLocaleLowerCase());
    }, [bookedServices, bookedServicesFilter]);


    const acceptBooking = async (booking: BookingType) => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/bookings/accept-booking?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: 'PATCH',
        });


        if (res.status === 200) {
            setBookedServices(prev => {
                return prev.map((_booking: BookingType) => {
                    if (_booking.bookId === booking.bookId) {
                        return res.booking;
                    }

                    return _booking;
                })
            })

            return;
        } 


        alert(res.msg);
    }


    const serviceRendered = async (booking: BookingType) => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/bookings/service-rendered?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: 'PATCH',
        });

        if (res.status === 200) {
            setBookedServices(prev => {
                return prev.map((_booking: BookingType) => {
                    return _booking.bookId === booking.bookId ? res.booking : _booking;
                })
            })
        }

    }


    const buttonLogic = (booking: BookingType) => {
        return () => {
            if (bookedServicesFilter === 'To be Approved') {
                acceptBooking(booking);
            }

            if (bookedServicesFilter === 'To be Rendered') {
                serviceRendered(booking);
            }
        }
    }


    const buttonValue = useMemo(() => {
        if (bookedServicesFilter === 'To be Approved') {
            return 'Accept';
        }

        if (bookedServicesFilter === 'To be Rendered') {
            return 'Rendered';
        }
    }, [bookedServicesFilter]);




    return (
        <Layout accessToken={accessToken}>
            {/* <pre>{JSON.stringify(bookedServices, null, 2)}</pre> */}
            <ProviderBookedServicesMenu
                bookedServicesFilter={bookedServicesFilter}
                setBookedServicesFitler={setBookedServicesFilter}
            />


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '1em'
            }}>
                {
                    filteredBookedServices.length !== 0 ? filteredBookedServices.map((booking: BookingType, idx: number) => {
                        return <Booking 
                                    key={idx}
                                    accessToken={accessToken}
                                    booking={booking}
                                    perspective={(bookedServicesFilter === 'To be Approved' || bookedServicesFilter === 'To be Rendered') ? 'Provider' : 'User'}
                                    buttonValue={buttonValue}
                                    buttonOnClick={buttonLogic(booking)}
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
