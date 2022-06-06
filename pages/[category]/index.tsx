/*

Multi Service Platform - Category Page
Created: Feb. 22, 2022
Last Updated: Mar. 28, 2022
Author: Tolentino, Francis James S.

*/

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";

import { Key, useEffect } from "react";
import { useAuthentication } from "../../src/custom-hooks/useAuthentication";

import fetchUserInformation from "../../libs/fetchUserInformation";

import Layout from "../../src/components/layout/Layout";
import authorizedFetch from "../../utils/authorizedFetch";
import { __backend__ } from "../../src/constants";
import Service from "../../src/components/Services/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useAccessToken } from "../../src/custom-hooks/useAccessToken";

const CategoryPage: NextPage = ({
    user,
    services,
    category,
    accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { setSession } = useAuthentication();
    const { setAccessToken } = useAccessToken();
    const router = useRouter();

    useEffect(() => {
        if (typeof setSession === "function") setSession(user);
    }, [setSession, user]);

    useEffect(() => {
        setAccessToken(accessToken);
    }, [setAccessToken, accessToken]);

    return (
        <Layout accessToken={accessToken}>
            <div
                className="container"
                style={{
                    margin: "1em auto 0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <button
                        style={{
                            flexBasis: "5%",
                            margin: "0 1em 0 0",
                        }}
                        onClick={() => router.push("/")}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} style={{ margin: "0 1em" }} />
                    </button>
                    <h2 style={{ flexBasis: "95%" }}>{category.toUpperCase()}</h2>
                </div>
                {services.length > 0 ? (
                    <div className="services-grid">
                        {services.map((service: any, idx: Key | null | undefined) => {
                            return <Service key={idx} service={service} />;
                        })}
                    </div>
                ) : (
                    <p>
                        The services registered may be owned by you, so you may not see any services for this category.
                    </p>
                )}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }: GetServerSidePropsContext) => {
    const category = query.category;

    const res = await authorizedFetch({
        url: `${__backend__}/services/get-services-from-category?category=${category}`,
        method: "GET",
        accessToken: req.cookies.accessToken,
    });

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(req.cookies?.accessToken);

        if (!userInformation) {
            return {
                props: {
                    user: {},
                    services: [],
                    category: category,
                    accessToken: "",
                },
            };
        }

        return {
            props: {
                user: userInformation.user,
                services: res.services,
                category: category,
                accessToken: req.cookies.accessToken,
            },
        };
    }

    return {
        props: {
            user: {},
            services: res.services,
            category: category,
            accessToken: "",
        },
    };
};

export default CategoryPage;
