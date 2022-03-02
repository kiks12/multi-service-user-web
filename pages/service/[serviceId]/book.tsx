


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



const BookService : NextPage = ({
    user,
    accessToken,
    service
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const { setSession } = useAuthentication();

    const { startingPrice, lastPrice } = formatStartingAndLastPrice(service);


    const [pax, setPax] = useState<string>('1');


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);


        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, []);



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




    return (
        <Layout accessToken={accessToken}>
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