
/*

Multi Service Platform - Bookings Page
Created: Feb. 09, 2022
Last Updated: Mar. 30, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Link from "next/link";
import styles from './Bookings.module.css';



import { useEffect, useMemo, useState } from "react";



import fetchUserInformation from "../../libs/fetchUserInformation";
import Booking from "../../src/components/Bookings/Booking";
import BookingsMenu from "../../src/components/Bookings/Menu";



import Layout from "../../src/components/layout/Layout";
import { __backend__ } from "../../src/constants";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";
import { BookedServicesFilter, Booking as BookingType } from "../../types";
import authorizedFetch from "../../utils/authorizedFetch";




const Bookings: NextPage = ({ 
    user, accessToken, bookings }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const [bookedServicesFilter, setBookedServicesFilter] = useState<BookedServicesFilter>('To be Approved');




    const filteredBookings = useMemo(() => {
        if (bookedServicesFilter === 'All') return bookings;

        return bookings.filter((booking: BookingType) => booking.status.toLocaleLowerCase() === bookedServicesFilter.toLocaleLowerCase());
    }, [bookings, bookedServicesFilter]);


    
    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user])



    return (
        <Layout accessToken={accessToken}>
            <BookingsMenu 
                bookedServicesFilter={bookedServicesFilter}
                setBookedServicesFilter={setBookedServicesFilter}
            />
            {
                accessToken && (       
                    filteredBookings.length !== 0 ? (
                        <div className={styles.containerGrid}>
                            {
                            filteredBookings.map((booking: BookingType, idx: number) => {
                                return (
                                    <Booking key={idx} booking={booking}/>
                                )
                            }) 
                            }
                        </div>
                        )
                        : 
                        <p>No {bookedServicesFilter} Bookings Found!</p>
                )
            }

            {
                !accessToken && (
                    <>
                        <p>Please Login first to see bookings.</p>
                        <p>{"Don't have an account?"}</p>
                        <Link passHref={true} href='/register'>
                            <a>Sign Up.</a>
                        </Link>
                    </>
                )
            }
        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        const bookingsResponse = await authorizedFetch({
            url: `${__backend__}/user/bookings/get-all-bookings?includedProperty=Service-Provider`,
            accessToken: req.cookies.accessToken as string,
            method: 'GET',
        })


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    accessToken: '',
                    bookings: [],
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                accessToken: req.cookies.accessToken,
                bookings: bookingsResponse.bookings
            }
        }
    }



    return {
        props: {
            user: {},
            accessToken: '',
            bookings: []
        }
    }

}



export default Bookings;