/*

Multi Service Platform - Pricing Details Component for Service Page in users
Created: Feb. 23, 2022
Last Updated: Mar. 04, 2022
Author: Tolentino, Francis James S.

*/

import styles from "./PricingDetails.module.css";

import Link from "next/link";
import React, { useMemo } from "react";
import type { Service as ServiceType } from "../../../../types";

import { formatter } from "../../../../utils/formatter";

import FloatingPricingDetails from "./Floating";

interface PricingDetailsProps {
    service: ServiceType;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({ service }) => {
    const formattedPrice = useMemo(() => {
        return formatter.format(service.price);
    }, [service]);
    return (
        <>
            <FloatingPricingDetails
                formattedPrice={formattedPrice}
                serviceId={service.serviceId}
            />
            <div className={styles.pricingDetailsContainer}>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2>Price: </h2>
                    <h2>{formattedPrice}</h2>
                </div>
                <div>
                    <Link
                        href={`/service/${service.serviceId}/book`}
                        passHref={true}
                    >
                        <button className="main-button">Book Service</button>
                    </Link>
                    <button
                        className="ghost-button"
                        style={{
                            margin: "0.5em 0 0 0",
                        }}
                    >
                        Negotiate Pricing
                    </button>
                </div>
            </div>
        </>
    );
};

export default PricingDetails;
