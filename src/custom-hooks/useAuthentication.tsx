


import { createContext, useContext, useState } from "react";



import type { User } from '../../types';



interface AuthenticationProps {
    loading: boolean;
    session: User | null;
    setSession: React.Dispatch<React.SetStateAction<User | null>> | null;
    clearSession: () => void;
}



const authContext = createContext<AuthenticationProps>({
    loading: false,
    session: null,
    setSession: null,
    clearSession: () => {},
});



export const AuthProvider: React.FC = ({children}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [session, setSession] = useState<User | null>(null);
    const [error, setError] = useState<string>('');


    const clearSession = () => setSession(null);


    return (
        <authContext.Provider value={{loading, session, setSession, clearSession}}>
            {children}
        </authContext.Provider>
    )
}



export const useAuthentication = () => {
    return useContext(authContext);
}
