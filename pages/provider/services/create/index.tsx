
/*

Multi Services Platform - Provider Create new Service Page
Created: Feb. 14, 2022
Last Updated: Feb. 15, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";



import authenticatePage from "../../../../libs/authenticatePage";



import { useEffect } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";



import Layout from "../../../../src/components/Provider/Layout/ProviderLayout";
import CreateNewServiceContent from "../../../../src/components/Provider/ContentSection/Services/Create/CreateNewServiceContent";





const CreateService: NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();

    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, [setSession, user]);



    return (
        <>
            <Layout contentSection={<CreateNewServiceContent />}/>
        </>
    )
}




export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const [isAuthenticated, user] = authenticatePage(ctx);


    if (isAuthenticated) {
        return {
            props: {
                user: user
            }
        }
    }


    return {
        redirect: {
            permanent: false,
            destination: '/provider/login'
        },
        props: {}
    }
}



export default CreateService;