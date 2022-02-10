
/*

Multi Service Platform - Server Side Authenticate page function
Created: Feb. 10, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/


import { GetServerSidePropsContext } from "next";


const authenticatePage = ({req}: GetServerSidePropsContext) => {
    
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    return user !== null;
}


export default authenticatePage;