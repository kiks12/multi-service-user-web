
/*

Multi Service Platform - Main Provider Page
Created: Feb. 10, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType,
    NextPage } from "next";



import { useEffect } from "react";



import fetchUserInformation from "../../libs/fetchUserInformation";



import ProviderLayout from "../../src/components/Provider/Layout/ProviderLayout";



import { useAuthentication } from "../../src/custom-hooks/useAuthentication";



const Provider : NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);


    
    return (
        <>
            <ProviderLayout>
                asdfasfsdf
            </ProviderLayout>
        </>
    )
}



export const getServerSideProps: GetServerSideProps = async ({req}: GetServerSidePropsContext) => {

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);


        if (!userInformation) {
            return {
                props: {
                    user: {}
                }
            }
        }



        if (userInformation.user.firstProviderLogin) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/provider/get-started'
                }
            }
        }



        return {
            props: {
                user: userInformation.user
            }
        }
    }



    return {
        props: {
            user: {}
        }
    }

}



export default Provider;