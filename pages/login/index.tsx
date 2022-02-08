
/*

Multi Service Platform (User Web) - Login Page
Created: Feb. 07, 2022
Last Updated: Feb. 07, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';


import type { NextPage } from 'next';


import Link from 'next/link';



const Login : NextPage = () => {


    return (
        <main className='login-register-main-container'>


            <div className='login-register-left-container'>
                <h1>Logo</h1>
            </div>


            <div className='login-register-right-container'>

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
           

                <form className='login-register-form'>

                    <div
                        style={{
                            flex: '1'
                        }}
                    >
                        <div>
                            <label>Email</label>
                            <input 
                                name='email'
                                type='email'
                                placeholder='example@gmail.com'
                                className='form-control'
                            />
                        </div>


                        <div 
                            style={{
                                margin: '1em 0 0 0'
                            }}
                        >
                            <label>Password</label>
                            <input 
                                name='password'
                                type='password'
                                placeholder='Enter your password'
                                className='form-control' 
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            className='button main-button'
                            style={{
                                margin: '0 0 3em 0'
                            }}
                        >
                            Login
                        </button>
                    </div>

                </form>



                <div className='social-media-sign-in-sign-up-container'>
                    <div>
                        <p className='secondary-purple-text'>Social Media Sign In</p>
                    </div>
                    

                    <div className='google-facebook-buttons-container'>
                        <button 
                            className='button google-button'
                        >
                            Sign in with Google
                        </button>
                        <button 
                            className='button facebook-button'
                            style={{margin: '0.5em 0 0 0'}}
                        >
                            Sign in with Facebook
                        </button>
                    </div>

                    
                    <div
                        style={{
                            display: 'flex'
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



        </main>
    )
}



export default Login;