
/*

Multi Service Platform - Main Provider Page
Created: Feb. 10, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";



import authenticatePage from "../../libs/authenticatePage";



const Provider : NextPage = () => {
    return (
        <div>

        </div>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx : GetServerSidePropsContext) => {

    const isAuthenticated = authenticatePage(ctx);

    if (isAuthenticated) {
        return {
            props: {}
        }
    }

    return {
        redirect: {
            destination: '/provider/login',
            permanent: false
        },
        props: {

        }
    }
}



export default Provider;