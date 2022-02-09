
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect } from 'react';



import type { NextPage } from 'next'



import Router from '../src/components/router';
import Layout from '../src/components/layout/Layout';



import { useAuthentication } from '../src/custom-hooks/useAuthentication';



const Home: NextPage = () => { 

    const router = Router();

    const {session} = useAuthentication();


    useEffect(() => {
        console.log(session);
    }, []);



    return (
        <>
            <Layout />
        </>
    )
}



export default Home;
