

/*

Multi Service Platform (User Web) - Register Page
Created: Feb. 07, 2022
Last Updated: Feb. 07, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import type { NextPage } from 'next';



import Link from 'next/link';



const Register : NextPage = () => {


    return (
        <main className='login-register-main-container'>
            

            <div className='login-register-left-container'>
                <h1>Logo</h1>
            </div>



            <div className='login-register-right-container'>

                <div>
                    <h1>Hello!</h1>
                    <p>Create an Account</p>
                </div>

                

                <form className='login-register-form'>

                    <div
                        style={{
                            flex: '1'
                        }}
                    >
                        <div>
                            <label>Username</label>
                            <input 
                                name='username'
                                type='text'
                                placeholder='Username'
                                className='form-control'
                            />
                        </div>

                        <div
                            style={{
                                margin: '1em 0 0 0'
                            }}
                        >
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
                                placeholder='Enter a strong Password'
                                className='form-control'
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            className='button main-button'
                            style={{
                                margin: '3em 0 3em 0'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                </form>



                <div className='social-media-sign-in-sign-up-container'>

                    <p className='secondary-purple-text'>Social Media Sign Up</p>

                    <div className='google-facebook-buttons-container'>
                        <button
                            className='button google-button'
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
                            display: 'flex'
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


        </main>
    )
}



export default Register;