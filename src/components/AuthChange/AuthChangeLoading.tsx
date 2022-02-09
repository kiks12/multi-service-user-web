

/*

Multi Service Platform - Auth Change Loading Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import React, { useEffect, useState } from 'react';



import { auth } from '../../../scripts/firebase';
import { useAuthentication } from '../../custom-hooks/useAuthentication';



import Router from '../router';



const AuthChangeLoading : React.FC = ({children}) => {

    const [loading, setLoading] = useState<boolean>(true);
    const {setSession} = useAuthentication();

    const router = Router();


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const res = await fetch('http://localhost:3000/api/auth/signin/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: user.email})
                })

                const json = await res.json();


                if (typeof setSession === 'function'){
                    setSession(json.user);
                }

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