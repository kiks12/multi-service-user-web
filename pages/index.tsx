
/*

Multi Service Platform - Home Page
Created: Feb. 07, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';



import type { NextPage } from 'next'



import { useSession } from 'next-auth/react';



import Router from '../src/components/router';
import MainGrid from '../src/components/layout/MainGrid';
import LeftNavbar from '../src/components/NavigationBars/LeftNavbar';
import TopNavbar from '../src/components/NavigationBars/TopNavbar';
import ContentSection from '../src/components/ContentSection/ContentSection';



const Home: NextPage = () => { 

    const { status } = useSession();
    const router = Router();


    // useEffect(() => {
    //     if (status === 'unauthenticated') {
    //         router.push('/login');
    //     }
    // }, [status]);
    

    if (status === 'loading') {
        return <p>loading...</p>
    }


    return (
        <>
            <MainGrid 
                leftNavbar={<LeftNavbar />}
                topNavbar={<TopNavbar />}
                contentSection={<ContentSection />}
            />
        </>
    )
}


export default Home;
