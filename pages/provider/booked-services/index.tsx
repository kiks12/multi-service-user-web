/*

Multi Service Platform - Provider Booked Services Page
Created: Mar. 02, 2022
Last Updated: Apr. 9, 2022
Author: Tolentino, Francis James S.

*/

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";

import { useEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";

import fetchUserInformation from "../../../libs/fetchUserInformation";

import Layout from "../../../src/components/Provider/Layout/ProviderLayout";
import authorizedFetch from "../../../utils/authorizedFetch";
import { __backend__ } from "../../../src/constants";
import ProviderBookedServicesMenu from "../../../src/components/Provider/BookedServices/ProviderBookedServicesMenu";

import { Booking as BookingType, BookedServicesFilter } from "../../../types";
import Booking from "../../../src/components/Bookings/Booking";
import { useAccessToken } from "../../../src/custom-hooks/useAccessToken";
import { useProviderBookings } from "../../../src/custom-hooks/useProviderBookings";


const BookedServices: NextPage = ({
    user,
    serverSideBookedServices,
    accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { setSession } = useAuthentication();
    const { setAccessToken } = useAccessToken();
    const { bookedServices, setBookedServices } = useProviderBookings();
    const [_currentBooking, setCurrentBooking] = useState<BookingType | null>(null);

    const [bookedServicesFilter, setBookedServicesFilter] = useState<BookedServicesFilter>("To be Approved");

    useEffect(() => {
        setBookedServices(serverSideBookedServices);
    }, [serverSideBookedServices]);

    useEffect(() => {
        if (typeof setSession === "function") setSession(user);

        return () => {
            if (typeof setSession === "function") setSession(null);
        };
    }, [setSession, user]);

    useEffect(() => {
        setAccessToken(accessToken);
    }, [setAccessToken, accessToken]);

    const filteredBookedServices = useMemo(() => {
        if (bookedServicesFilter === "All") return bookedServices;

        return bookedServices.filter(
            (booking: BookingType) => booking.status.toLocaleLowerCase() === bookedServicesFilter.toLocaleLowerCase()
        );
    }, [bookedServices, bookedServicesFilter]);

    /* 
    const acceptBooking = async (booking: BookingType) => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/bookings/accept-booking?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: "PATCH",
        });

        if (res.status === 200) {
            setBookedServices((prev) => {
                return prev.map((_booking: BookingType) => {
                    if (_booking.bookId === booking.bookId) {
                        return res.booking;
                    }

                    return _booking;
                });
            });

            return;
        }

        alert(res.msg);
    };

    const serviceRendered = async (booking: BookingType) => {
        const res = await authorizedFetch({
            url: `${__backend__}/provider/bookings/service-rendered?bookId=${booking.bookId}`,
            accessToken: accessToken,
            method: "PATCH",
        });

        if (res.status === 200) {
            setBookedServices((prev) => {
                return prev.map((_booking: BookingType) => {
                    return _booking.bookId === booking.bookId ? res.booking : _booking;
                });
            });
        }
    };
     */

    return (
        <Layout accessToken={accessToken}>
            <ProviderBookedServicesMenu
                bookedServicesFilter={bookedServicesFilter}
                setBookedServicesFitler={setBookedServicesFilter}
            />
                {
                    filteredBookedServices.length !== 0 ? (
                    <table style={{width: '100%', padding: '0 0.5em'}}>
                        <thead>
                            <tr
                                style={{
                                    border: "0.3px solid var(--gray)",
                                    margin: "0 0 1em 0",
                                }}
                            >
                                <td>Service</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Service Price</td>
                                <td>Quantity</td>
                                <td>Total Price</td>
                                {
                                    bookedServicesFilter === 'To be Approved' || bookedServicesFilter === 'To be Rendered' ?
                                        <td>Action</td>
                                        : 
                                        <></>
                                }
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            filteredBookedServices.map((booking: BookingType, idx: number) => {
                                return (
                                    <Booking
                                        key={idx}
                                        accessToken={accessToken}
                                        booking={booking}
                                        setCurrentBooking={setCurrentBooking}
                                        perspective={
                                            bookedServicesFilter === "To be Approved" ||
                                            bookedServicesFilter === "To be Rendered"
                                                ? "Provider"
                                                : "User"
                                        }
                                    />
                                );
                            })
                        }
                        </tbody>
                    </table>
                ) : (
                        <p>No {bookedServicesFilter} bookings yet.</p>
                    )
                }
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);

        // get provider bookings from server
        // create an Authorized GET Request to endpoint
        // /provider/bookings/get-bookings?includedProperties={}
        const bookedServices = await authorizedFetch({
            accessToken: req.cookies.accessToken,
            method: "GET",
            url: `${__backend__}/provider/bookings/get-bookings?includedProperties=Services-Users`,
        });

        if (!userInformation) {
            return {
                props: {
                    user: {},
                    serverSideBookedServices: [],
                    accessToken: "",
                },
            };
        }

        if (userInformation.user.firstProviderLogin) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/provider/get-started",
                },
            };
        }

        return {
            props: {
                user: userInformation.user,
                serverSideBookedServices: bookedServices.bookings,
                accessToken: req.cookies.accessToken,
            },
        };
    }

    return {
        props: {
            user: {},
            serverSideBookedServices: [],
            accessToken: "",
        },
    };
};

export default BookedServices;
