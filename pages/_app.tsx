

/*

Multi Service Platform - main App file
Created: Feb. 07, 2022
Last Updated: Feb. 08, 2022
Author: Tolentino, Francis James S.

*/


import '../styles/index.css';



import type { AppProps } from 'next/app';



import { SessionProvider } from 'next-auth/react';



const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}



export default MyApp;