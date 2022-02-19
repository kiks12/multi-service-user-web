
/*

Multi Services Platform - Provider Create new Service Page
Created: Feb. 14, 2022
Last Updated: Feb. 19, 2022
Author: Tolentino, Francis James S.

*/



import type { 
    GetServerSideProps, 
    GetServerSidePropsContext, 
    InferGetServerSidePropsType, 
    NextPage } from "next";




import { useEffect } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";



import Layout from "../../../../src/components/Provider/Layout/ProviderLayout";
import CreateNewServiceContent from "../../../../src/components/Provider/ContentSection/Services/Create/CreateNewServiceContent";
import fetchUserInformation from "../../../../libs/fetchUserInformation";





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



export default CreateService;