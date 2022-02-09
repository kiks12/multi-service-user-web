

/*

Multi Service Platform - main App file
Created: Feb. 07, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import '../styles/index.css';



import type { AppProps } from 'next/app';



import { AuthProvider } from '../src/custom-hooks/useAuthentication';



import AuthChangeLoading from '../src/components/AuthChange/AuthChangeLoading';



const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    
    return (
        <AuthProvider>
            <AuthChangeLoading>
                <Component {...pageProps} />
            </AuthChangeLoading>
        </AuthProvider>
    )
}



export default MyApp;