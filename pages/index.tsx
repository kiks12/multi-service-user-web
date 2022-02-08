
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Feb. 08, 2022
Author: Tolentino, Francis James S.

*/


import React, { useEffect } from 'react';



import type { NextPage } from 'next'



import { useSession } from 'next-auth/react';



import Router from '../components/router';



const Home: NextPage = () => { 

    const {data: session, status} = useSession();
    const router = Router();


    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }

        console.log('status: ', status)
    }, [status]);
    

    if (status === 'loading') {
        return <p>loading...</p>
    }


    return (
        <div>
            <p>Hello</p>
        </div>
    )
}


export default Home;
