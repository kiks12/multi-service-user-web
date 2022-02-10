

/*

Multi Service Platform - Auth Change Loading Component
Created: Feb. 09, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import { getRedirectResult } from 'firebase/auth';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';



import { auth } from '../../../scripts/firebase';



const AuthChangeLoading : React.FC = ({children}) => {


    // const [loading, setLoading] = useState<boolean>(false);

    
    // if (loading) {
    //     return <p>Loading....</p>
    // }



    return <>{children}</>
}



export default AuthChangeLoading;