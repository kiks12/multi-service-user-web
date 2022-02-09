

import { useEffect } from 'react';



import { useSession } from 'next-auth/react';



import Router from "../components/router";



const useAuthenticated = () => {

    const router = Router();
    const {data: session, status } = useSession();


    useEffect(() => {

        if (!session && status === 'unauthenticated'){
            router.push('/login');
        }

    }, []);
}



export default useAuthenticated;