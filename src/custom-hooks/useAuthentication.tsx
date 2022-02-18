
/*

Multi Service Platform - custom hook to handle user information
Created: Feb. 09, 2022
Last Updated: Feb. 11, 2022
Author: Tolentino, Francis James S.

*/


import { createContext, useCallback, useContext, useEffect, useState } from "react";



import { signInWithPopup } from "firebase/auth";
import { auth, FacebookProvider, GoogleProvider } from "../../scripts/firebase";



import type { User } from '../../types';



import Router from "../components/router";



interface Message {
    msg: string;
    status: 100 | 500 | 0;
}


type LoginType = 'user' | 'provider'



interface AuthenticationProps {
    session: User | null;
    setSession: React.Dispatch<React.SetStateAction<User | null>> | null;
    clearSession: () => void;
    message: Message;
    setMessage: React.Dispatch<React.SetStateAction<Message>> | null;
    loginWithGoogle: (type: LoginType) => void;
    registerWithGoogle: () => void;
    loginWithFacebook: () => void;
    logout: () => void;
}



const authContext = createContext<AuthenticationProps>({
    session: null,
    setSession: null,
    clearSession: () => {},
    message: {
        msg: '',
        status: 0
    },
    setMessage: null,
    loginWithGoogle: () => {},
    registerWithGoogle: () => {},
    loginWithFacebook: () => {},
    logout: () => {}
});



export const AuthProvider: React.FC = ({ children }) => {

    const [session, setSession] = useState<User | null>(null);
    const [message, setMessage] = useState<Message>({
        msg: '',
        status: 0,
    });



    const router = Router();
    

    const clearSession = () => setSession(null);


    // this callback hook resets the error/success messages on router change to /login, /register
    const resetMessage = useCallback(() => {
        if (router.pathname === '/login' || router.pathname === '/register'){
            setMessage({
                msg: '',
                status: 0
            })
        }
    }, [router]);




    // Pop up sign in to provider handler - returns UserCredentials
    const openPopup = async (provider: any) => {
        let result;
        
        try {
            // get user with sign in with pop up
            result = await signInWithPopup(auth, provider);
        } catch (e) {
            // handle popup closed by user error
            console.error(e);
        }

        return result;
    }




    // This function handles the whole login wih google flow
    const loginWithGoogle = async (type: LoginType) => {
        const result = await openPopup(GoogleProvider);
        
        if (typeof result === 'undefined') return;

        // get the email from the result.user
        const { email } = result.user;


        const res = await fetch('http://localhost:4000/auth/signin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
            credentials: "include"
        })
        
        const resJson = await res.json();
        console.log(resJson);


        // try {
        //     // find user through API fetching
        //     const findUser = await fetch(`${process.env.SITE_URL}/api/auth/signin/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({email})
        //     });
    
        //     // convert the fetch result into json
        //     const jsonFoundUser = await findUser.json();


        //     // check if status is 100 and user is found
        //     if (jsonFoundUser.status === 100){
        //         if (type === 'user') router.push('/login/callback');
        //         if (type === 'provider') router.push('/provider/login/callback');
        //     } else {
        //         // set the error message to payload message
        //         setMessage({msg: jsonFoundUser.msg, status: jsonFoundUser.status});
        //         // console.log(jsonFoundUser);
        //     }
        
        // } catch (e) {
        //     setMessage({msg: e as string, status: 500});
        // }
        
    }




    // This function handles the register with google flow 
    const registerWithGoogle = async () => {
        // get UserCredentials from popup sign in with google
        const result = await openPopup(GoogleProvider);

        if (typeof result === 'undefined') return;


        // get needed information from signed in account
        const { providerId, user } = result;
        const { email, photoURL, displayName } = user;


        try {
            // register account using API POST fetching to /api/auth/signup/ 
            const res = await fetch('/api/auth/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, 
                    image: photoURL, 
                    provider: providerId,
                    username: displayName,
                })
            })


            const jsonRes = await res.json();


            setMessage({msg: jsonRes.msg, status: jsonRes.status});
        } catch (e) {
            console.error(e);
        }
    }



    const loginWithFacebook = async () => {
        const result = await openPopup(FacebookProvider);
    }



    const logout = async () => {
        await fetch(`/api/auth/signout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        await router.push('/login');
        clearSession();
    }



    useEffect(() => {
        resetMessage();
    }, [resetMessage]);



    return (
        <authContext.Provider value={{
                session, 
                setSession, 
                clearSession, 
                message,
                setMessage,
                loginWithGoogle,
                loginWithFacebook,
                registerWithGoogle,
                logout
            }}
        >
            {children}
        </authContext.Provider>
    )
}



export const useAuthentication = () => {
    return useContext(authContext);
}
