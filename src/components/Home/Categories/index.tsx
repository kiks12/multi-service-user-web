/*

Multi Services Platform - Users Home Content Categories Component
Created: Feb. 17, 2022
Last Updated: Feb. 22, 2022
Author: Tolentino, Francis James S.

*/

import React from "react";
import Link from "next/link";
import useCategories from "../../../custom-hooks/useCategories";

// Computer Servicing <FontAwesomeIcon icon="fa-solid fa-computer-classic" />
// AC Maintanence <FontAwesomeIcon icon="fa-solid fa-air-conditioner" />
// Plumbing <FontAwesomeIcon icon="fa-solid fa-pipe-valve" />
// Home Cleaning <FontAwesomeIcon icon="fa-solid fa-vacuum" />
// Laundry <FontAwesomeIcon icon="fa-solid fa-washing-machine" />
// Salons <FontAwesomeIcon icon="fa-solid fa-user-hair" />
// Spas <FontAwesomeIcon icon="fa-solid fa-spa" />
// Electrician <FontAwesomeIcon icon="fa-solid fa-plug" />
// Moving Services <FontAwesomeIcon icon="fa-solid fa-truck" />

const Categories: React.FC = () => {

    const { loading, categories } = useCategories();


    if (loading) {
        return (
            <div className="categories-grid-container">
                <p>Loading....</p>
            </div>
        )
    }

    return (
        <div className="categories-grid-container">
            <h2>Categories</h2>

            {
                categories ? 
                (
                    <div className="categories-container">
                         {
                            categories.map((category: string, idx: number) => {
                                return (
                                    <div key={idx} className="categories-container">
                                        <Link href={`/${category.toLowerCase()}`} passHref={true}>
                                            <div className="category">
                                                <p>{category}</p>
                                            </div>
                                        </Link>
                                    </div>        
                                )
                            }) 
                        }
                    </div>
                ) : (
                    <div style={{
                        margin: '1em',
                        textAlign: 'center',
                    }}>
                        <p>No Registered Services</p>
                    </div>
                )
            }
        </div>
    );
};

export default Categories;
