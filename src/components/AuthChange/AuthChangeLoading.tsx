

/*

Multi Service Platform - Auth Change Loading Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React, { useEffect, useState } from 'react';



import { auth } from '../../../scripts/firebase';



import Router from '../router';



const AuthChangeLoading : React.FC = ({children}) => {

    const [loading, setLoading] = useState<boolean>(true);

    const router = Router();


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await router.push('/');
            }
            if (!user) {
                await router.push('/login');
            }
            setLoading(false)
        })
    }, []);


    if (loading) {
        return <p>Loading....</p>
    }



    return <>{children}</>
}



export default AuthChangeLoading;