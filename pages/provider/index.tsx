/*

Multi Service Platform - Main Provider Page
Created: Feb. 10, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/

import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";

import { useEffect } from "react";

import fetchUserInformation from "../../libs/fetchUserInformation";

import ProviderLayout from "../../src/components/Provider/Layout/ProviderLayout";
import { useAccessToken } from "../../src/custom-hooks/useAccessToken";

import { useAuthentication } from "../../src/custom-hooks/useAuthentication";

const Provider: NextPage = ({ user, accessToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { setSession } = useAuthentication();
    const { setAccessToken } = useAccessToken();

    useEffect(() => {
        if (typeof setSession === "function") setSession(user);

        return () => {
            if (typeof setSession === "function") setSession(null);
        };
    }, [setSession, user]);

    useEffect(() => {
        setAccessToken(accessToken);
    }, [setAccessToken, accessToken]);

    return (
        <>
            <ProviderLayout accessToken="">asdfasfsdf</ProviderLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);

        if (!userInformation) {
            return {
                props: {
                    user: {},
                    accessToken: req.cookies.accessToken,
                },
            };
        }

        if (userInformation.user.firstProviderLogin) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/provider/get-started",
                },
            };
        }

        return {
            props: {
                user: userInformation.user,
                accessToken: req.cookies.accessToken,
            },
        };
    }

    return {
        props: {
            user: {},
            accessToken: req.cookies.accessToken,
        },
    };
};

export default Provider;
