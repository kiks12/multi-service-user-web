
/*

Multi Service Platform (User Web) - Login Page
Created: Feb. 07, 2022
Last Updated: Feb. 21, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import type { NextPage } from 'next';



import Link from 'next/link';
import Head from 'next/head';



import { useAuthentication } from '../../src/custom-hooks/useAuthentication';



import BottomMenu from '../../src/components/LoginRegister/BottomMenu';


const Login : NextPage = () => {


    const { message, loginWithGoogle, loginWithFacebook } = useAuthentication();



    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <main className='login-register-main-container'>


                <div className='login-register-left-container'>
                    <h1>On Demand Handy <br/> Service App</h1>
                </div>


                <div className='login-register-right-container'>

                    <div className='login-register-right-middle-row'>

                        <div>
                            <h1>Welcome!</h1>
                            <p 
                                className='secondary-purple-text'
                                style={{
                                    letterSpacing: '0.06em',
                                }}
                            >
                                Sign in to continue
                            </p>
                        </div>
                        
                        
                        {
                            message.msg !== '' && (
                                <div className={message.status !== 200 ? 'error-message' : 'success-message'}>
                                    { message.msg }
                                </div>
                            )
                        }



                        <div className='social-media-sign-in-sign-up-container'>
                            

                            <div className='google-facebook-buttons-container'>
                                <button 
                                    className='button google-button'
                                    onClick={() => loginWithGoogle('user')}
                                >
                                    Sign In with Google
                                </button>
                                <button 
                                    className='button facebook-button'
                                    style={{margin: '0.5em 0 0 0'}}
                                    onClick={loginWithFacebook}
                                >
                                    Sign In with Facebook
                                </button>
                                <Link href='/' passHref={true}>
                                    <button 
                                        className='button guest-button'
                                        style={{margin: '0.5em 0 0 0'}}
                                        >
                                        Continue as a Guest
                                    </button>
                                </Link>
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
                                    {"Don't Have an Account?"}
                                </p>
                                <Link href="/register" passHref={true}>
                                    <p className='main-purple-link'>Sign Up</p>
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



    
export default Login;
