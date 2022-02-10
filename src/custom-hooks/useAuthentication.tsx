
/*

Multi Service Platform - custom hook to handle user information
Created: Feb. 09, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/


import { createContext, useContext, useState } from "react";



import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider } from "../../scripts/firebase";



import type { User } from '../../types';



import Router from "../components/router";



interface AuthenticationProps {
    loading: boolean;
    session: User | null;
    setSession: React.Dispatch<React.SetStateAction<User | null>> | null;
    clearSession: () => void;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>> | null;
    loginWithGoogle: () => void;
}



const authContext = createContext<AuthenticationProps>({
    loading: false,
    session: null,
    setSession: null,
    clearSession: () => {},
    error: '',
    setError: null,
    loginWithGoogle: () => {}
});



export const AuthProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [session, setSession] = useState<User | null>(null);
    const [error, setError] = useState<string>('');


    const clearSession = () => setSession(null);


    const router = Router();


    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, GoogleProvider);
        const { user } = result;
        const { email } = user;

        try {
            const findUser = await fetch(`${process.env.SITE_URL}/api/auth/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            });
    
    
            const jsonFoundUser = await findUser.json();
    
            if (jsonFoundUser.status === 100){
                router.push('/login/callback');
            } else {
                setError(jsonFoundUser.msg);
            }
        } catch (e) {
            setError(e as string);
        }
    }



    return (
        <authContext.Provider value={{
                loading, 
                session, 
                setSession, 
                clearSession, 
                error,
                setError,
                loginWithGoogle
            }}
        >
            {children}
        </authContext.Provider>
    )
}



export const useAuthentication = () => {
    return useContext(authContext);
}
