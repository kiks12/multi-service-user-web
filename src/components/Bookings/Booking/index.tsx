import React, { useMemo, useState, useEffect } from "react";

import { Booking } from "../../../../types";
import { formatter } from "../../../../utils/formatter";
import styles from "./Booking.module.css";
import Link from "next/link";
import Image from "next/image";
import CancelModal from "./CancelModal";
import MessageModal from "./MessageModal";
import InformationModal from "./InformationModal";
import {__backend__} from "../../../constants";

interface BookingProps {
    booking: Booking;
    accessToken: string;
    updateBookingState?: (cancellationRes: { msg: string; status: number; booking: Booking }) => void;
    perspective?: "User" | "Provider";
    buttonValue?: string;
    buttonOnClick?: any;
    setCurrentBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
}

const TO_BE_APPROVED = "0.3em solid var(--mainBlue)";
const TO_BE_RENDERED = "0.3em solid var(--mainPurple)";
const TO_BE_RATED = "0.3em solid var(--secondaryPurple)";
const COMPLETED = "0.3em solid var(--lightGreen)";
const CANCELLED = "0.3em solid var(--errorRed)";

const Booking: React.FC<BookingProps> = ({
    booking,
    accessToken,
    updateBookingState,
    perspective,
    buttonValue,
    buttonOnClick,
    setCurrentBooking,
}) => {
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [openMessageModal, setOpenMessageModal] = useState<boolean>(false);
    const [openInformationModal, setOpenInformationModal] = useState<boolean>(false);
    const [cancellationResponse, setCancellationResponse] = useState<{
        msg: string;
        status: number;
        booking: Booking;
    }>({ msg: "", status: 400, booking });
    const [message, setMessage] = useState<string>("");

    const formattedPrice = useMemo(() => {
        return formatter.format(booking.price);
    }, [booking.price]);

    const formattedFinalPrice = useMemo(() => {
        return formatter.format(booking.finalPrice);
    }, [booking.finalPrice]);

    return (
        <>
            <tr 
                className={styles.tr}
                style={{
                    borderLeft:
                        booking.status === "To be Approved"
                            ? TO_BE_APPROVED
                            : booking.status === "To be Rendered"
                            ? TO_BE_RENDERED
                            : booking.status === "To be Rated"
                            ? TO_BE_RATED
                            : booking.status === "Cancelled"
                            ? CANCELLED
                            : COMPLETED,
                }}
                onClick={() => setOpenInformationModal(true)}
            >
                <td
                    className={styles.td}
                >
                    <div
                        style={{
                            backgroundColor: "var(--gray)",
                            height: "5em",
                            width: "5em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {
                            booking.Service.Images.length > 0 ? 
                                <div 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image 
                                        src={`${__backend__}/public/${booking.Service.Images[0].path}`}
                                        height={100}
                                        width={150}
                                        layout='fixed'
                                    />
                                </div>
                                : <p></p>
                        } 
                    </div>
                    <Link href={`/service/${booking.serviceId}`} passHref={true}>
                        <p style={{ margin: "0 0.5em" }}>{booking.Service.title}</p>
                    </Link>
                </td>
                <td className={styles.td}>{booking.date}</td>
                <td className={styles.td}>{booking.time}</td>
                <td className={styles.td}>{formattedPrice}</td>
                <td className={styles.td}>{booking.pax}</td>
                <td className={styles.td}>{formattedFinalPrice}</td>
                {(perspective === "Provider" || buttonValue) && (
                    <td>
                        <button
                            className="main-button"
                            onClick={() => {
                                buttonOnClick();
                                if (typeof setCurrentBooking === "function") {
                                    setCurrentBooking(booking);
                                }
                            }}
                        >
                            {buttonValue}
                        </button>
                    </td>
                )}
            </tr>

            {openCancelModal && (
                <CancelModal
                    setCancellationResponse={setCancellationResponse}
                    setMessage={setMessage}
                    setOpenMessageModal={setOpenMessageModal}
                    setOpenCancelModal={setOpenCancelModal}
                    accessToken={accessToken}
                    bookId={booking.bookId}
                />
            )}
            {openMessageModal && (
                <MessageModal
                    updateBookingState={updateBookingState}
                    cancellationResponse={cancellationResponse}
                    message={message}
                    setOpenMessageModal={setOpenMessageModal}
                />
            )}
            {openInformationModal && (
                <InformationModal
                    setOpenInformationModal={setOpenInformationModal}
                    booking={booking}
                    setOpenCancelModal={setOpenCancelModal}
                />
            )}
        </>
    );
};

export default Booking;
