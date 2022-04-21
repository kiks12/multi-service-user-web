
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";
import fetchUserInformation from "../../../libs/fetchUserInformation";
import Messages from "../../../src/components/Messages";
import MessagesLayout from "../../../src/components/Messages/Layout";
import ListOfConvos from "../../../src/components/Messages/ListOfConvos";
import Layout from "../../../src/components/Provider/Layout/ProviderLayout";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";


const ProviderMessages : NextPage = ({ user, accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession } = useAuthentication();

    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    return (
        <Layout>
            <MessagesLayout>
                <ListOfConvos accessToken={accessToken} role='PROVIDER' />
                <Messages accessToken={accessToken}/>
            </MessagesLayout>
        </Layout>
    )
}



export const getServerSideProps : GetServerSideProps = async ({req}: GetServerSidePropsContext) => {
    
     if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies.accessToken);

        if (userInformation) {
            return {
                props: {
                    user: userInformation.user,
                    accessToken: req.cookies.accessToken,
                }
            }
        }

    }

    return {
        props: {
            user: '',
            accessToken: req.cookies.accessToken,
        }
    }
}




export default ProviderMessages;