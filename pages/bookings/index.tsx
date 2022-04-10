
/*

Multi Service Platform - Bookings Page
Created: Feb. 09, 2022
Last Updated: Apr. 10, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";
import Link from "next/link";
import styles from './Bookings.module.css';



import { useCallback, useEffect, useMemo, useState } from "react";



import fetchUserInformation from "../../libs/fetchUserInformation";
import Booking from "../../src/components/Bookings/Booking";
import BookingsMenu from "../../src/components/Bookings/Menu";



import Layout from "../../src/components/layout/Layout";
import { __backend__ } from "../../src/constants";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";
import { BookedServicesFilter, Booking as BookingType } from "../../types";
import authorizedFetch from "../../utils/authorizedFetch";
import RateServiceModal from "../../src/components/Bookings/Booking/RateServiceModal";
import MessageModal from "../../src/components/Bookings/Booking/MessageModal";
import Modal from "../../src/components/Modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useClickOutsideElement from "../../src/custom-hooks/useClickOutsideElement";




const Bookings: NextPage = ({ 
    user, accessToken, bookings }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();
    const [bookingsState, setBookingsState] = useState<BookingType[]>([]);
    const [currentBooking, setCurrentBooking] = useState<BookingType | null>(null);
    const [bookedServicesFilter, setBookedServicesFilter] = useState<BookedServicesFilter>('To be Approved');
    const [openRateServiceModal, setOpenRateServiceModal] = useState<boolean>(false);
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');


    const messageModalRef = useClickOutsideElement(() => setOpenMessageModal(false));



    const updateBookingsState = (cancellationRes: 
        {msg: string, status: number, booking: BookingType}) => {
        setBookingsState(prev => prev.map((booking: BookingType, idx: number) => {
            if (cancellationRes.booking.bookId === booking.bookId) {
                return cancellationRes.booking;
            }
            return booking;
        }));
    }


    useEffect(() => {
        setBookingsState(bookings);

        return () => setBookingsState([]);
    }, [bookings]);


    
    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);



    const filteredBookings = useMemo(() => {
        if (bookedServicesFilter === 'All') return bookings;

        return bookingsState.filter((booking: BookingType) => booking.status.toLocaleLowerCase() === bookedServicesFilter.toLocaleLowerCase());
    }, [bookedServicesFilter, bookings, bookingsState]);



    const buttonValue = useMemo(() => {
        if (bookedServicesFilter === 'To be Rated') {
            return 'Rate';
        }

        return undefined;
    }, [bookedServicesFilter]);


    const buttonLogic = useCallback(() => {
        if (bookedServicesFilter === 'To be Rated') {
            setOpenRateServiceModal(true);
        }
    }, [bookedServicesFilter]);



    return (
        <Layout accessToken={accessToken}>
            <div>
                <BookingsMenu 
                    bookedServicesFilter={bookedServicesFilter}
                    setBookedServicesFilter={setBookedServicesFilter}
                />
            </div>

            <small style={{
                margin: '1.5em',
                color: 'var(--errorRed)'
            }}>
                <i>
                    {"Note: Cancellation is only applicable to bookings that are currently 'To be Approved'"}
                </i>
            </small>

            {
                accessToken && (       
                    filteredBookings.length !== 0 ? (
                        <div className={styles.containerGrid}>

                            <table style={{
                                border: '0.3px solid var(--gray)',
                                margin: '0 0 1em 0',
                            }}>
                                <thead>
                                    <tr className={styles.tr}>
                                        <td className={styles.td}>Service</td>
                                        <td className={styles.td}>Date</td>
                                        <td className={styles.td}>Service Price</td>
                                        <td className={styles.td}>Quantity</td>
                                        <td className={styles.td}>Total Price</td>
                                        {
                                            buttonValue === 'Rate' && 
                                            <td className={styles.td}>Action</td>
                                        }
                                    </tr>
                                </thead>
                            </table>

                            {
                            filteredBookings.map((booking: BookingType, idx: number) => {
                                return (
                                    <Booking 
                                        updateBookingState={updateBookingsState}
                                        key={idx}
                                        perspective='User'
                                        booking={booking}
                                        accessToken={accessToken}
                                        buttonValue={buttonValue}
                                        buttonOnClick={buttonLogic}
                                        setCurrentBooking={setCurrentBooking}
                                    />
                                )
                            }) 
                            }
                        </div>
                        )
                        : 
                        <p className={styles.message}>No {bookedServicesFilter} Bookings Found!</p>
                )
            }

            {
                openRateServiceModal && 
                    <RateServiceModal 
                        updateBookingState={updateBookingsState}
                        setOpenRateServiceModal={setOpenRateServiceModal}     
                        setOpenMessageModal={setOpenMessageModal}
                        setMessage={setMessage}
                        accessToken={accessToken}
                        bookId={currentBooking ? currentBooking?.bookId : 0}
                    />
            }

            {
                openMessageModal && 
                    <Modal>
                        <div className="card" ref={messageModalRef}>
                            <div className="">
                                <h2>Message</h2>
                                <FontAwesomeIcon
                                    icon={faClose}
                                    onClick={() => setOpenMessageModal(false)}
                                />
                            </div>
                            <p>
                                {message}
                            </p>

                            <button onClick={() => setOpenMessageModal(false)}>
                                Okay
                            </button>
                        </div>
                    </Modal>
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