/*

Multi Service Platform - Provider Left Navbar Component
Created: Feb. 2022
Last Updated: Mar. 02, 2022
Author: Tolentino, Francis James S.

*/

import Link from "next/link";

import React from "react";

import useActivePage from "../../../custom-hooks/useActivePage";

const ACTIVE_PAGE = "left-navbar-li-active";
const INACTIVE_PAGE = "left-navbar-li";

const ProviderLeftNavbar: React.FC = () => {
    const activePage = useActivePage();

    return (
        <div>
            <ul className="left-navbar">
                <Link href="/provider" passHref={true}>
                    <li
                        className={
                            activePage === "Provider-Overview"
                                ? ACTIVE_PAGE
                                : INACTIVE_PAGE
                        }
                    >
                        Overview
                    </li>
                </Link>
                <Link href="/provider/services" passHref={true}>
                    <li
                        className={
                            activePage === "Provider-Services"
                                ? ACTIVE_PAGE
                                : INACTIVE_PAGE
                        }
                    >
                        Services
                    </li>
                </Link>
                <Link href="/provider/booked-services" passHref={true}>
                    <li
                        className={
                            activePage === "Provider-Booked-Services"
                                ? ACTIVE_PAGE
                                : INACTIVE_PAGE
                        }
                    >
                        Bookings
                    </li>
                </Link>

                <li className="left-navbar-li">Settings</li>
            </ul>
        </div>
    );
};

export default ProviderLeftNavbar;
