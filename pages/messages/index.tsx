

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import fetchUserInformation from "../../libs/fetchUserInformation";
import Layout from "../../src/components/layout/Layout";
import MessagesLayout from "../../src/components/Messages/Layout";
import ListOfConvos from "../../src/components/Messages/ListOfConvos";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";
import useWebSocket from "../../src/custom-hooks/useWebSocket";


import MessagesComponent from "../../src/components/Messages";



const Messages : NextPage = (
    { accessToken, user }: InferGetServerSidePropsType<typeof getServerSideProps>
) => {

    const { setSession } = useAuthentication();
    const socket = useWebSocket();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);

        return () => {
            if (typeof setSession === 'function') setSession(null);
        }
    }, [setSession, user]);


    return (
        <Layout accessToken={accessToken}>
            <MessagesLayout>
                <ListOfConvos accessToken={accessToken}/>
                <MessagesComponent accessToken={accessToken}/>
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



export default Messages;