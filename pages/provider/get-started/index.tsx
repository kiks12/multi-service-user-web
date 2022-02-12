
/*

Multi Service Platform - Get Started Provider Page
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useEffect } from "react";
import authenticatePage from "../../../libs/authenticatePage";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



const GetStarted: NextPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setSession, session } = useAuthentication();


    useEffect(() => {
        if (typeof setSession === 'function') setSession(user);
    }, []);



    const handleInputOnChange = (e: any) => {
        if (typeof setSession === 'function') {
            setSession((prev: any) => {
                prev = {
                    ...prev,
                    [e.target.name]: e.target.value,
                }

                return prev
            })
        } 
    }



    return (
        <main>
            <div>
                <form>
                    <input 
                        name='email' 
                        value={session?.email as string}
                        className='form-control'
                        disabled
                    />
                    <input 
                        name='username' 
                        value={session?.username as string}
                        onChange={handleInputOnChange}
                        className='form-control'
                    />
                    <input 
                        name='address' 
                        value={session?.address as string}
                        onChange={handleInputOnChange}
                        className='form-control'
                    />
                    <input 
                        name='contact' 
                        value={session?.contact as string}
                        onChange={handleInputOnChange}
                        className='form-control'
                    />
                </form>
            </div>
        </main>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const [isAuthenticated, user] = authenticatePage(ctx);


    if (isAuthenticated) {
        return {
            props: {
                user
            }
        }
    }


    return {
        redirect: {
            permanent: false,
            destination: '/provider/login'
        },
        props: {}
    }
}



export default GetStarted;