

/*

Multi Service Platform - main App file
Created: Feb. 07, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/


import '../styles/index.css';



import type { AppProps } from 'next/app';



import { AuthProvider } from '../src/custom-hooks/useAuthentication';
import Head from 'next/head';




const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    
    return (
        <>  
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}



export default MyApp;