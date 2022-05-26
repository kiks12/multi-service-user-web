/*

Multi Services Platform - Provider Create new Service Page
Created: Feb. 14, 2022
Last Updated: Mar. 21, 2022
Author: Tolentino, Francis James S.

*/

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Image from "next/image";

import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import { useAuthentication } from "../../../../src/custom-hooks/useAuthentication";
import useSplitArray from "../../../../src/custom-hooks/useSplitArray";

import Layout from "../../../../src/components/Provider/Layout/ProviderLayout";
import Calendar from "react-calendar";
import Modal from "../../../../src/components/Modals/Modal";

import { __backend__ } from "../../../../src/constants";
import fetchUserInformation from "../../../../libs/fetchUserInformation";
import authorizedFetch from "../../../../utils/authorizedFetch";
import {
    formatDateToString,
    formatStringToDate,
} from "../../../../utils/formatDate";
import { formatter } from "../../../../utils/formatter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreateService: NextPage = ({
    user,
    accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { session, setSession } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (typeof setSession === "function") setSession(user);
    }, [setSession, user]);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [serviceDetails, setServiceDetails] = useState<string>("");
    const [priceInitial, setPriceInitial] = useState<string>("0");
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);

    const [dateType, setDateType] = useState<"Single" | "Range">("Single");
    const [date, setDate] = useState<Date>(new Date());
    const [unavailableDates, setUnavailableDates] = useState<string[]>([]);


    // this is the skills array that will be used in categories later
    // in the user interface.
    const [skillsArrayIndex, setSkillsArrayIndex] = useState<number>(0);
    const skillsArray = useSplitArray({
        stringToSplit: session?.skills ? (session.skills as string) : "",
        splitter: "|",
    });

    const memoizedUploadedImages = useMemo(() => {
        return uploadedImages.map((image) => URL.createObjectURL(image));
    }, [uploadedImages]);

    const formattedStartingPrice = useMemo(() => {
        return formatter.format(parseInt(priceInitial, 10));
    }, [priceInitial]);

    // this function will be used to send a POST request to the server
    // at route /provider/services/create-new-service
    // this will be used in the main logic function - publishServiceToDatabase
    // return a promise with value of the response of the request
    const sendCreateNewServiceRequest = async () => {
        try {
            // send an authorized POST request
            // with JSON body of title, serviceDetails, category,
            // priceType, priceSubType, priceInitial, priceFinal, and unavailableDates
            const res = await authorizedFetch({
                url: `${__backend__}/provider/services/create-new-service`,
                method: "POST",
                accessToken: accessToken,
                body: JSON.stringify({
                    title,
                    serviceDetails,
                    category: category.join("|"),
                    priceInitial: parseInt(priceInitial, 10),
                    unavailableDates: unavailableDates.join("|"),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return Promise.resolve(res);
        } catch (e) {
            // handle errors
            console.error(e);
        }
    };

    // this function creates the images form data
    // that will be send to the server through post request
    // form data will consist of uploadedImages files
    // returns the created form data
    const imagesFormData = () => {
        const formData = new FormData();

        if (uploadedImages) {
            for (let i = 0; i < uploadedImages.length; i++) {
                // append each uploadedImages file to form data with key files
                // each file will be inside an array called files
                // i.e [file, file, file]
                formData.append("files", uploadedImages[i]);
            }
        }

        return formData;
    };

    // this function creates a POST request to the server in the route
    // /provider/servies/upload-images-to-new-service with request parameter of serviceId - which
    // we will get later as we call create service function
    // this function takes serviceId as a parameter
    const uploadImagesToServerAndDatabase = async (serviceId: number) => {
        // prepare the form data
        const formData = imagesFormData();
        try {
            // send an authorized POST request to the server
            // route: /provider/services/upload/images-to-new-service?serviceId=
            const res = await authorizedFetch({
                url: `${__backend__}/provider/services/upload-images-to-new-service?serviceId=${serviceId}/`,
                accessToken: accessToken,
                body: formData,
                method: "POST",
            });

            return Promise.resolve(res);
        } catch (e) {
            // handle errors
            console.error(e);
        }
    };

    // this is the main logic function that will be called in the
    // on click event of the submit button of the form
    // takes an mouse click event as a parameter
    const publishServiceToDatabase = async (e: any) => {
        e.preventDefault();
        // invoke sendCreateNewServiceRequest function
        // get the message and serviceId from the response
        const { serviceId, msg } = await sendCreateNewServiceRequest();
        // use the serviceId to invoke uploadImagesToServerAndDatabase
        // destructure the message and set to msg2 variable
        const { msg: msg2 } = await uploadImagesToServerAndDatabase(serviceId);
        // set the message to both messages
        setMessage(msg + " and " + msg2);
        setOpenModal(true);
    };

    // this function handles the changes in the input(Images) type file in the
    // User Interface, this will set the uploadedImages state to files found in the
    // input
    const imageInputOnchangeHandler = (e: any) => {
        e.preventDefault();
        // validation
        if (e.target.files) {
            for (let i = 0; i < e.target.files?.length; i++) {
                // add each file from input to uploadedImages state
                setUploadedImages((prev) => {
                    if (e.target.files) {
                        return [...prev, e.target.files[i]];
                    }

                    return prev;
                });
            }
        }
    };

    return (
        <>
            <Layout>
                <div
                    style={{
                        backgroundColor: "var(--lightGray)",
                        padding: "1em",
                    }}
                >
                    <div
                        style={{
                            margin: "0 auto",
                            width: "min(95%, 55em)",
                        }}
                    >
                        <div className="card">
                            <h2>Create new Service</h2>
                        </div>
                        <div>
                            <form>
                                <div
                                    className="card"
                                    style={{
                                        margin: "1em 0",
                                    }}
                                >
                                    <h2>Title and Description</h2>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            margin: "1em 0",
                                        }}
                                    >
                                        <label>Title</label>
                                        <input
                                            className="form-control"
                                            placeholder="Ultimate Laundry Wow"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            margin: "1em 0",
                                        }}
                                    >
                                        <label>Details</label>
                                        <textarea
                                            className="form-control"
                                            style={{
                                                height: "30vh",
                                                resize: "none",
                                            }}
                                            value={serviceDetails}
                                            onChange={(e) =>
                                                setServiceDetails(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card">
                                    <h2>Category</h2>
                                    <div
                                        style={{
                                            margin: "1em 0",
                                        }}
                                    >
                                        {category.length !== 0 &&
                                            category.map((category, idx) => {
                                                return (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            display: "flex",
                                                            margin: "1em 0",
                                                        }}
                                                    >
                                                        <select
                                                            className="form-control"
                                                            style={{
                                                                width: "90%",
                                                            }}
                                                            onChange={(e) => {
                                                                setCategory((prev) => {
                                                                    return prev.map((cat: string, _idx: number) => {
                                                                        if (idx === _idx) return e.target.value
                                                                        return cat;
                                                                    })
                                                                });
                                                            }}
                                                        >
                                                            {skillsArray.length !==
                                                                0 &&
                                                                skillsArray.map(
                                                                    (
                                                                        skill,
                                                                        idx2
                                                                    ) => {
                                                                        if (
                                                                            skill ===
                                                                            ""
                                                                        )
                                                                            return (
                                                                                <React.Fragment key={idx2}>
                                                                                    { skill }
                                                                                </React.Fragment>
                                                                            );
                                                                        return (
                                                                            <option 
                                                                                key={idx2}
                                                                                value={skill}
                                                                            >
                                                                                { skill }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            style={{
                                                                width: "10%",
                                                                marginLeft:
                                                                    "1em",
                                                            }}
                                                            onClick={() => {
                                                                setCategory(
                                                                    (prev) => {
                                                                        return prev.filter(
                                                                            (
                                                                                _cat,
                                                                                idxCat
                                                                            ) =>
                                                                                idx !==
                                                                                idxCat
                                                                        );
                                                                    }
                                                                );
                                                                setSkillsArrayIndex(
                                                                    (prev) =>
                                                                        (prev -= 1)
                                                                );
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                );
                                            })}

                                        <div
                                            style={{
                                                display: "flex",
                                            }}
                                        >
                                            <div style={{ width: "90%" }}>
                                                <input
                                                    className="form-control"
                                                    disabled
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                style={{
                                                    marginLeft: "1em",
                                                    width: "10%",
                                                }}
                                                onClick={() => {
                                                    setCategory((prev) => [
                                                        ...prev,
                                                        skillsArray[
                                                            skillsArrayIndex
                                                        ],
                                                    ]);
                                                    setSkillsArrayIndex(
                                                        (prev) => (prev += 1)
                                                    );
                                                }}
                                                disabled={
                                                    skillsArrayIndex ===
                                                    skillsArray.length
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        margin: "1em 0",
                                    }}
                                >
                                    <h2>Pricing</h2>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            margin: "1em 0",
                                        }}
                                    >
                                        <label>Service Price</label>
                                        <div
                                            style={{
                                                display: "flex",
                                            }}
                                        >
                                            <input
                                                className="form-control"
                                                type="number"
                                                value={priceInitial}
                                                onChange={(e) =>
                                                    setPriceInitial(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <div
                                                style={{
                                                    margin: "0 1em",
                                                    padding: "0 1em",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <h3>
                                                    {formattedStartingPrice}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h2>Unavailable Dates</h2>
                                    <div
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "70%",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                }}
                                            >
                                                <select
                                                    value={dateType}
                                                    onChange={(e) => {
                                                        setDateType(
                                                            e.target.value as
                                                                | "Single"
                                                                | "Range"
                                                        );
                                                    }}
                                                    className="form-control"
                                                >
                                                    <option value="Single">
                                                        Single
                                                    </option>
                                                    <option value="Range">
                                                        Range
                                                    </option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUnavailableDates(
                                                            (prev) => [
                                                                ...prev,
                                                                formatDateToString(
                                                                    date
                                                                ),
                                                            ]
                                                        );
                                                        setDate(new Date());
                                                    }}
                                                >
                                                    Set Unavailable Date
                                                </button>
                                            </div>
                                            <Calendar
                                                value={date}
                                                onChange={setDate}
                                                selectRange={
                                                    dateType === "Single"
                                                        ? false
                                                        : true
                                                }
                                                calendarType="US"
                                                tileDisabled={({ date }) => {
                                                    const _date =
                                                        formatDateToString(
                                                            date
                                                        );
                                                    return unavailableDates.includes(
                                                        _date
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                width: "30%",
                                            }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUnavailableDates(
                                                        (prev) => {
                                                            return prev.filter(
                                                                (_date) => {
                                                                    return (
                                                                        _date !==
                                                                        formatDateToString(
                                                                            date
                                                                        )
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                    setDate(new Date());
                                                }}
                                            >
                                                Remove Date
                                            </button>
                                            <ul>
                                                {unavailableDates.length !==
                                                0 ? (
                                                    unavailableDates.map(
                                                        (date, idx) => {
                                                            return (
                                                                <li
                                                                    key={idx}
                                                                    onClick={() => {
                                                                        const _date =
                                                                            formatStringToDate(
                                                                                date
                                                                            );
                                                                        console.log(
                                                                            _date
                                                                        );
                                                                        setDate(
                                                                            _date
                                                                        );
                                                                    }}
                                                                >
                                                                    {date}
                                                                </li>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <p>No Unavailable Dates</p>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="card"
                                    style={{
                                        margin: "1em 0",
                                    }}
                                >
                                    <h2>Gallery</h2>
                                    <div
                                        style={{
                                            margin: "1em 0",
                                            display: "flex",
                                        }}
                                    >
                                        {memoizedUploadedImages.length !== 0 &&
                                            memoizedUploadedImages.map(
                                                (file, idx) => {
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                height: "22.5vh",
                                                                width: "22.5vh",
                                                                overflow:
                                                                    "hidden",
                                                                borderRadius:
                                                                    "0.5em",
                                                                marginRight:
                                                                    "1em",
                                                            }}
                                                        >
                                                            <Image
                                                                alt=""
                                                                src={file}
                                                                width={500}
                                                                height={500}
                                                                objectFit="fill"
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                        <input
                                            name="files"
                                            id="files"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            onChange={imageInputOnchangeHandler}
                                            multiple={true}
                                            className="upload-images-input-button"
                                        />
                                        <label htmlFor="files">
                                            Upload Images
                                        </label>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        padding: "1em 0 2em 0",
                                    }}
                                >
                                    <button
                                        className="main-button"
                                        type="submit"
                                        onClick={publishServiceToDatabase}
                                    >
                                        Publish Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {openModal && (
                    <Modal>
                        <div
                            className="card"
                            style={{
                                width: "min(30em , 90%)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    margin: "0 0 1em 0",
                                }}
                            >
                                <h2>Message</h2>
                                <FontAwesomeIcon
                                    onClick={() => setOpenModal(false)}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    icon={faXmark}
                                />
                            </div>
                            <p>{message}</p>
                            <div
                                style={{
                                    margin: "2em 0 0 0",
                                }}
                            >
                                <button
                                    onClick={() => {
                                        setOpenModal(false);
                                        router.push("/provider/services");
                                    }}
                                >
                                    Okay
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    req,
}: GetServerSidePropsContext) => {
    if (req.cookies.accessToken) {
        const userInformation = await fetchUserInformation(
            req.cookies?.accessToken
        );

        if (!userInformation) {
            return {
                props: {
                    user: {},
                    accessToken: req.cookies.accessToken,
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

export default CreateService;
