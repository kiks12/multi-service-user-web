/*

Multi Service Platform - main App file
Created: Feb. 07, 2022
Last Updated: April 15, 2022
Author: Tolentino, Francis James S.

*/

import "../styles/index.css";
import "react-calendar/dist/Calendar.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

import type { AppProps } from "next/app";
import React from "react";

import { AuthProvider } from "../src/custom-hooks/useAuthentication";
import { WebSocketProvider } from "../src/custom-hooks/useWebSocket";

import Head from "next/head";
import { ConversationProvider } from "../src/custom-hooks/useConversation";
import { MessagesProvider } from "../src/custom-hooks/useMessages";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

React.useLayoutEffect = React.useEffect;

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ConversationProvider>
                    <MessagesProvider>
                        <WebSocketProvider>
                            <AuthProvider>
                                <Component {...pageProps} />
                            </AuthProvider>
                        </WebSocketProvider>
                    </MessagesProvider>
                </ConversationProvider>
            </LocalizationProvider>
        </>
    );
};

export default MyApp;
