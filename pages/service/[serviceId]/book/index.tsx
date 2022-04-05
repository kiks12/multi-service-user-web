


/*

Multi Service Platform - Book Service Page for users
Created: Mar. 02, 2022
Last Updated: Apr. 05, 2022
Author: Tolentino, Francis James S.

*/


import styles from './Book.module.css';



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";
import useSplitArray from "../../../../src/custom-hooks/useSplitArray";



import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";



import Layout from "../../../../src/components/layout/Layout";
import Calendar from "react-calendar";



import { formatStartingAndLastPrice, formatter } from "../../../../utils/formatter";
import authorizedFetch from "../../../../utils/authorizedFetch";
import { formatDateToString } from "../../../../utils/formatDate";
import Link from 'next/link';
import Image from 'next/image';
import Modal from '../../../../src/components/Modals/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useClickOutsideElement from '../../../../src/custom-hooks/useClickOutsideElement';
import { useRouter } from 'next/router';



type PaymentMethods = 'Cash on Delivery' | 'E-Wallet' | 'GCash';




const BookService : NextPage = ({
    user,
    accessToken,
    service
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter();
    const { setSession } = useAuthentication();

    const { startingPrice, lastPrice } = formatStartingAndLastPrice(service);


    const [pax, setPax] = useState<string>('1');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('Cash on Delivery');
    const [date, setDate] = useState<Date>(new Date());
    const [message, setMessage] = useState<string>('');
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);


    const messageModalRef = useClickOutsideElement(() => setOpenMessageModal(false));




    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);



    const unavailableDates = useSplitArray({
        stringToSplit: service.unavailableDates,
        splitter: ' | '
    })
    

    const totalPrice = useMemo(() => {
        return formatter.format(parseInt(pax) * service.priceInitial);
    }, [pax, service.priceInitial]);


    const handlePaxButtonClick = (operation: 'addition' | 'subtraction') => {
        switch(operation) {
            case "addition":
                setPax(prev => (parseInt(prev, 10) + 1).toString());
                break;
            case "subtraction": 
                setPax(prev => (parseInt(prev, 10) - 1).toString());
                break;
            default:
                break;
        }
    }



    const bookService = async (e: any) => {
        e.preventDefault();
        try {
            const bookingResponse = await authorizedFetch({
                accessToken: accessToken,
                method: 'POST',
                url: `${__backend__}/user/bookings/book-a-service`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: service.serviceId,
                    serviceProviderId: service.Users.userId,
                    pax: parseInt(pax, 10),
                    date: formatDateToString(date),
                    price: parseInt(service.priceInitial, 10),
                    finalPrice: parseInt(service.priceInitial, 10) * parseInt(pax, 10),
                    paymentMethod: paymentMethod,
                    paid: paymentMethod !== 'Cash on Delivery'
                })
            });

            setMessage(bookingResponse.msg);
            setOpenMessageModal(true);
        } catch (e) {   
            console.error(e);
        }
    }




    return (
        <>
            <Layout accessToken={accessToken}>
                {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}
                <div className={styles.header}>
                    <h2>Book Service</h2>
                    <Link href={`/service/${service.serviceId}/`} passHref={true}>
                        <div style={{width: 'min(90%, 10em)'}}>
                            <button>
                                Go Back
                            </button>
                        </div>
                    </Link>
                </div>
                
                <div className={styles.layout}>
                    <div>
                        
                        <h3>{service.title}</h3>

                        <div className={styles.image}>
                            Image
                            {/* <Image /> */}
                        </div>

                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td>Price Type: </td>
                                    <td>{service.priceType}</td>
                                </tr>
                                <tr>
                                    <td>Price SubType: </td>
                                    <td>{service.priceSubType}</td>
                                </tr>
                                <tr>
                                    <td>Starting Price: </td>
                                    <td>{startingPrice}</td>
                                </tr>
                                <tr>
                                    <td>Last Price: </td>
                                    <td>{lastPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <form onSubmit={bookService}>
                            <div className='split'>
                                <label>Pax / Service</label>
                                <div className={styles.paxInputContainer}>
                                    <button 
                                        type="button" 
                                        onClick={() => handlePaxButtonClick('subtraction')}
                                        disabled={pax === '1'}
                                    >
                                        -
                                    </button>
                                    <input 
                                        className={styles.paxInput}
                                        type='number' 
                                        value={pax} 
                                        onChange={(e) => setPax(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => handlePaxButtonClick('addition')}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className='split'>
                                <label>Payment Method: </label>
                                <select className='form-control'>
                                    <option>Cash on Delivery</option>
                                    <option>Wallet</option>
                                    <option>GCash</option>
                                </select>
                            </div>

                            <div>
                                <Calendar 
                                    calendarType="US"
                                    value={date}
                                    onChange={setDate}
                                    tileDisabled={({date}) => {
                                        const _date = formatDateToString(date);
                                        return unavailableDates.includes(_date);
                                    }}
                                />
                            </div>


                            {/* <button className="main-button" onClick={bookService}>
                                Continue
                            </button> */}
                        </form>
                    </div>
                </div>
            </Layout>
            
            <div className={styles.floatingInformation}>
                <div className='container'>
                    <div>
                        <p>Date: </p>
                        <p>{`${date.toDateString()}`}</p>
                    </div>
                    <div>
                        <p>Unit Price: </p>
                        <p>{service.priceType === 'Flat Rate' ? startingPrice : `${startingPrice}-${lastPrice}`}</p>
                    </div>
                    <div>
                        <p>Pax/Units: </p>
                        <p>{pax}</p>
                    </div>
                    <div>
                        <p>Total Price: </p>
                        <p>{totalPrice}</p>
                    </div>
                    <div style={{ width: '25%' }}>
                        <button 
                            className='main-button'
                            onClick={bookService}
                        >
                            Book Service
                        </button>
                    </div>
                </div>
            </div>

            {
                openMessageModal && (
                    <Modal>
                        <div className='card' ref={messageModalRef}>
                            <div 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <h2>Message</h2>
                                <FontAwesomeIcon 
                                    icon={faClose}
                                    onClick={() => setOpenMessageModal(false)}
                                />
                            </div>
                            <p>{message}</p>
                            <button onClick={() => {
                                setOpenMessageModal(false);
                                router.push('/bookings');
                            }}>Okay</button>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async ({
    req, 
    query}: GetServerSidePropsContext) => {

    const { serviceId } = query;


    const res = await fetch(`${__backend__}/services/get-service-information?serviceId=${serviceId}`, {
        method: 'GET'
    });

    const jsonRes = await res.json();


    
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {},
                    service: {},
                    accessToken: ''
                }
            }
        }



        return {
            props: {
                user: userInformation.user,
                service: jsonRes.service,
                accessToken: req.cookies.accessToken
            }
        }
    }



    return {
        props: {
            user: {},
            service: {},
            accessToken: ''
        }
    }

}



export default BookService;