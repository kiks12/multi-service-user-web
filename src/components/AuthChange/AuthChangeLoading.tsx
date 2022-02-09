

/*

Multi Service Platform - Auth Change Loading Component
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useState } from 'react';



import { auth } from '../../../scripts/firebase';
import { useAuthentication } from '../../custom-hooks/useAuthentication';
import { useSignLogic } from '../../custom-hooks/useSignLogic';



import Router from '../router';



const AuthChangeLoading : React.FC = ({children}) => {


    const [loading, setLoading] = useState<boolean>(true);
    const {session, setSession, setError} = useAuthentication();
    const { type } = useSignLogic();

    

    const router = Router();

    
    
    
    //This is the login logic handler/function
    const loginHandler = async (user:any) => {
        
        // Check if there is a return user from google/facebook sign in
        if (user) {
            
            // Check if user is in databse
            const res = await fetch(`${process.env.SITE_URL}/api/auth/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: user.email})
            })
            

            const json = await res.json();


            // If User not found or status is not equal to 100 then create error message
            if (typeof setError === 'function' && json?.status !== 100) {
                setError(json?.msg);
            }


            // If user is in database set user session data to fetched user
            if (typeof setSession === 'function' && json?.user){
                setSession(json.user);
                await router.push('/');
            } 
        }

    }



    useEffect(() => {


        auth.onAuthStateChanged(async (user) => {

            if (type === 'Login'){
                await loginHandler(user);
            }



            if (!user && !session && router.pathname !== '/register') {
                await router.push('/login');
            }
    
            setLoading(false);
        })

        
    }, []);


    
    if (loading) {
        return <p>Loading....</p>
    }



    return <>{children}</>
}



export default AuthChangeLoading;