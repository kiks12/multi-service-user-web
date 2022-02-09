
/*

Multi Service Platform - custom hook to handle user information
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/


import { createContext, useContext, useState } from "react";



import type { User } from '../../types';



interface AuthenticationProps {
    loading: boolean;
    session: User | null;
    setSession: React.Dispatch<React.SetStateAction<User | null>> | null;
    clearSession: () => void;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>> | null;
}



const authContext = createContext<AuthenticationProps>({
    loading: false,
    session: null,
    setSession: null,
    clearSession: () => {},
    error: '',
    setError: null
});



export const AuthProvider: React.FC = ({children}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [session, setSession] = useState<User | null>(null);
    const [error, setError] = useState<string>('');


    const clearSession = () => setSession(null);


    return (
        <authContext.Provider value={{loading, session, setSession, clearSession, error, setError}}>
            {children}
        </authContext.Provider>
    )
}



export const useAuthentication = () => {
    return useContext(authContext);
}
