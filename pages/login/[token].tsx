
/*

Multi Service Platform - Login Callback Route
Created: Feb. 10, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType,
     NextPage } from 'next';



import { useEffect } from 'react';



import { useAuthentication } from '../../src/custom-hooks/useAuthentication';



import Router from '../../src/components/router';



import cookie from 'cookie';



const LoginCallback : NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    const { setSession } = useAuthentication();


    const router = Router();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);

    useEffect(() => {
        router.push('/');
    }, [router]);
    
    return <></>
}



export const getServerSideProps: GetServerSideProps = async ({query, res} : GetServerSidePropsContext) => {

    // const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    console.log(query);

    res.setHeader('Set-Cookie', cookie.serialize('accessToken', query.token as string, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: false,
        sameSite: "lax"
    }));


    return {
        props: {
            // user
        }
    }
}



export default LoginCallback;