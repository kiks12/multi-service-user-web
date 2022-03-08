

/*

Multi Service Platform (User Web) - Register Page
Created: Feb. 07, 2022
Last Updated: Mar. 08, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import type { NextPage } from 'next';



import Link from 'next/link';
import Head from 'next/head';



import { useAuthentication } from '../../src/custom-hooks/useAuthentication';



import Logo from '../../src/components/LoginRegister/Logo';
import BottomMenu from '../../src/components/LoginRegister/BottomMenu';



const Register : NextPage = () => {


    const {registerWithGoogle, message} = useAuthentication();



    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <main className='login-register-main-container'>
                

                <div className='login-register-left-container'>
                <Logo /> 
                </div>



                <div className='login-register-right-container'>

                    <div className='login-register-right-middle-row'>

                        <div>
                            <h1>Hello!</h1>
                            <p
                                className='secondary-purple-text'
                                style={{
                                    letterSpacing: '0.06em'
                                }}
                            >
                                Create an Account
                            </p>
                        </div>



                        <div className='social-media-sign-in-sign-up-container'>

                            <div className='google-facebook-buttons-container'>
                                <button
                                    className='button google-button'
                                    onClick={registerWithGoogle}
                                >
                                    Sign Up with Google
                                </button>
                                <button
                                    className='button facebook-button'
                                    style={{
                                        margin: '0.5em 0 0 0'
                                    }}
                                >
                                    Sign Up with Facebook
                                </button>
                            </div>


                            <div
                                style={{
                                    display: 'flex',
                                    margin: '3em 0 0 0'
                                }}
                            >
                                <p 
                                    className='secondary-purple-text'
                                    style={{
                                        margin: '0 0.4em 0 0'
                                    }}
                                >
                                    Already have an Account?
                                </p>
                                <Link href="/login" passHref={true}>
                                    <p className='main-purple-link'>Sign In</p>
                                </Link>
                            </div>

                        </div>
                    </div>


                    <BottomMenu type='LoginUser'/>



                </div>


            </main>
        </>
    )
}



export default Register;