


/*

Multi Service Platform - Book Service Page for users
Created: Mar. 02, 2022
Last Updated: Mar. 02, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import { useEffect, useState } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import fetchUserInformation from "../../../libs/fetchUserInformation";
import { __backend__ } from "../../../src/constants";



import Layout from "../../../src/components/layout/Layout";
import { formatStartingAndLastPrice } from "../../../utils/formatter";
import authorizedFetch from "../../../utils/authorizedFetch";
import Calendar from "react-calendar";
import useSplitArray from "../../../src/custom-hooks/useSplitArray";
import { formatDateToString } from "../../../utils/formatDate";



type PaymentMethods = 'Cash on Delivery' | 'E-Wallet' | 'GCash';




const BookService : NextPage = ({
    user,
    accessToken,
    service
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();

    const { startingPrice, lastPrice } = formatStartingAndLastPrice(service);


    const [pax, setPax] = useState<string>('1');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('Cash on Delivery');
    const [date, setDate] = useState<Date>(new Date());




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



    const bookService = async () => {
        try {
            authorizedFetch({
                accessToken: accessToken,
                method: 'POST',
                url: `${__backend__}/bookings/book-a-service`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: service.serviceId,
                    serviceProviderId: service.Users.userId,
                    pax: parseInt(pax, 10),
                    date: formatDateToString(date),
                    price: parseInt(service.priceInitial, 10) * parseInt(pax, 10),
                    paymentMethod: paymentMethod,
                    paid: paymentMethod !== 'Cash on Delivery'
                })
            })
        } catch (e) {   
            console.error(e);
        }
    }




    return (
        <Layout accessToken={accessToken}>
            {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}
            <h2>Book Service</h2>

            <h2>{service.title}</h2>


            <div>
                <p>Price Type: </p>
                <p>{service.priceType}</p>
            </div>


            <div className="">
                <p>Starting Price: </p>
                <p>{startingPrice}</p>
            </div>


            <div className="">
                <p>Last Price: </p>
                <p>{lastPrice}</p>
            </div>


            <div>
                <form>
                    <div>
                        <label>Pax / Service</label>
                        <div>
                            <button 
                                type="button" 
                                onClick={() => handlePaxButtonClick('subtraction')}
                                disabled={pax === '1'}
                            >
                                -
                            </button>
                            <input type='number' value={pax} onChange={(e) => setPax(e.target.value)}/>
                            <button 
                                type="button"
                                onClick={() => handlePaxButtonClick('addition')}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label>Payment Method: </label>
                        <select>
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


                    <button className="main-button" onClick={bookService}>
                        Continue
                    </button>
                </form>
            </div>

        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({
    req, 
    query}: GetServerSidePropsContext) => {

    const { serviceId } = query;


    const res = await fetch(`${__backend__}/services/service-information?serviceID=${serviceId}`, {
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