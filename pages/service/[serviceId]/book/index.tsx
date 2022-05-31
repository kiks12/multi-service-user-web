/*

Multi Service Platform - Book Service Page for users
Created: Mar. 02, 2022
Last Updated: Apr. 05, 2022
Author: Tolentino, Francis James S.

*/

import styles from "./Book.module.css";

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";

import { useEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";
import useSplitArray from "../../../../src/custom-hooks/useSplitArray";

import fetchUserInformation from "../../../../libs/fetchUserInformation";
import { __backend__ } from "../../../../src/constants";

import Layout from "../../../../src/components/layout/Layout";
import Calendar from "react-calendar";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import { formatter } from "../../../../utils/formatter";
import authorizedFetch from "../../../../utils/authorizedFetch";
import { formatDateToString } from "../../../../utils/formatDate";
import Link from "next/link";
//import Image from "next/image";
import Modal from "../../../../src/components/Modals/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useClickOutsideElement from "../../../../src/custom-hooks/useClickOutsideElement";
import { useRouter } from "next/router";

type PaymentMethods = "Cash on Delivery" | "E-Wallet" | "GCash";

const BookService: NextPage = ({
    user,
    accessToken,
    service,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { setSession } = useAuthentication();

    const [pax, setPax] = useState<string>("1");
    const [paymentMethod] = useState<PaymentMethods>("Cash on Delivery");
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date | null>(new Date());
    const [message, setMessage] = useState<string>("");
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);

    useEffect(() => {
        if (typeof setSession === "function") setSession(user);

        return () => {
            if (typeof setSession === "function") setSession(null);
        };
    }, [setSession, user]);

    const messageModalRef = useClickOutsideElement(() =>
        setOpenMessageModal(false)
    );

    const unavailableDates = useSplitArray({
        stringToSplit: service.unavailableDates,
        splitter: " | ",
    });

    const totalPrice = useMemo(() => {
        return formatter.format(parseInt(pax) * service.price);
    }, [pax, service.price]);

    const formattedPrice = useMemo(() => {
        return formatter.format(service.price);
    }, [formatter, service.price]);

    const handlePaxButtonClick = (operation: "addition" | "subtraction") => {
        switch (operation) {
            case "addition":
                setPax((prev) => (parseInt(prev, 10) + 1).toString());
                break;
            case "subtraction":
                setPax((prev) => (parseInt(prev, 10) - 1).toString());
                break;
            default:
                break;
        }
    };

    const bookService = async (e: any) => {
        e.preventDefault();
        try {
            const bookingResponse = await authorizedFetch({
                accessToken: accessToken,
                method: "POST",
                url: `${__backend__}/user/bookings/book-a-service`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId: service.serviceId,
                    serviceProviderId: service.Users.userId,
                    pax: parseInt(pax, 10),
                    date: formatDateToString(date),
                    time: time?.toLocaleTimeString(),
                    price: parseInt(service.price, 10),
                    finalPrice:
                        parseInt(service.price, 10) * parseInt(pax, 10),
                    paymentMethod: paymentMethod,
                    paid: paymentMethod !== "Cash on Delivery",
                }),
            });

            setMessage(bookingResponse.msg);
            setOpenMessageModal(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Layout accessToken={accessToken}>
                {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}
                <div className={styles.header}>
                    <h2>Book Service</h2>
                    <Link
                        href={`/service/${service.serviceId}/`}
                        passHref={true}
                    >
                        <div style={{ width: "min(90%, 10em)" }}>
                            <button>Go Back</button>
                        </div>
                    </Link>
                </div>

                <div className={styles.layout}>
                    <div>
                        <h3>{service.title}</h3>

                        <div className={styles.image}>
                            Image
                            {/* <Image /> */}
                        </div>

                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td>Price: </td>
                                    <td>{formattedPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{margin: "1em 0"}} className="split">
                            <label>Pax / Service</label>
                            <div className={styles.paxInputContainer}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePaxButtonClick("subtraction")
                                    }
                                    disabled={pax === "1"}
                                >
                                    -
                                </button>
                                <input
                                    className={styles.paxInput}
                                    type="number"
                                    value={pax}
                                    onChange={(e) => setPax(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePaxButtonClick("addition")
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="split">
                            <label>Payment Method: </label>
                            <select className="form-control">
                                <option>Cash on Delivery</option>
                                <option>Wallet</option>
                                <option>GCash</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>Select Date: </label>
                            <Calendar
                                calendarType="US"
                                value={date}
                                onChange={setDate}
                                tileDisabled={({ date }) => {
                                    const _date = formatDateToString(date);
                                    return unavailableDates.includes(_date);
                                }}
                            />
                        </div>

                        <label>Select Time: </label>
                        <TimePicker
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </div>
                </div>
            </Layout>

            <div className={styles.floatingInformation}>
                <div className="container">
                    <div>
                        <p>Date: </p>
                        <p>{`${date.toDateString()}`}</p>
                    </div>
                    <div>
                        <p>Time: </p>
                        <p>{`${time?.toLocaleTimeString()}`}</p>
                    </div>
                    <div>
                        <p>Unit Price: </p>
                        <p>{formattedPrice}</p>
                    </div>
                    <div>
                        <p>Pax/Units: </p>
                        <p>{pax}</p>
                    </div>
                    <div>
                        <p>Total Price: </p>
                        <p>{totalPrice}</p>
                    </div>
                    <div style={{ width: "25%" }}>
                        <button className="main-button" onClick={bookService}>
                            Book Service
                        </button>
                    </div>
                </div>
            </div>

            {openMessageModal && (
                <Modal>
                    <div className="card" ref={messageModalRef}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h2>Message</h2>
                            <FontAwesomeIcon
                                icon={faClose}
                                onClick={() => setOpenMessageModal(false)}
                            />
                        </div>
                        <p>{message}</p>
                        <button
                            onClick={() => {
                                setOpenMessageModal(false);
                                router.push("/bookings");
                            }}
                        >
                            Okay
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    req,
    query,
}: GetServerSidePropsContext) => {
    const { serviceId } = query;

    const res = await fetch(
        `${__backend__}/services/get-service-information?serviceId=${serviceId}`,
        {
            method: "GET",
        }
    );

    const jsonRes = await res.json();

    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(
            req.cookies?.accessToken
        );

        if (!userInformation) {
            return {
                props: {
                    user: {},
                    service: {},
                    accessToken: "",
                },
            };
        }

        return {
            props: {
                user: userInformation.user,
                service: jsonRes.service,
                accessToken: req.cookies.accessToken,
            },
        };
    }

    return {
        props: {
            user: {},
            service: {},
            accessToken: "",
        },
    };
};
export default BookService;
