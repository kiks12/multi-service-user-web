

/*

Multi Service Platform (User Web) - Register Page
Created: Feb. 07, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import React, { useState } from 'react';



import type { NextPage } from 'next';



import Link from 'next/link';



import Router from '../../src/components/router';



const Register : NextPage = () => {


    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    const router = Router();



    const submitRegistrationForm = async (e: any) => {
        e.preventDefault();

        const res = await fetch('/api/auth/signup/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                type: 'default'
            })
        });

        const jsonRes = await res.json();


        setMessage(jsonRes.msg);


        if(jsonRes.status === 100){
            router.push('/login');
        }
    }




    return (
        <main className='login-register-main-container'>
            

            <div className='login-register-left-container'>
                <h1>Logo</h1>
                <div>
                    {message}
                </div>
            </div>



            <div className='login-register-right-container'>

                <div>
                    <h1>Hello!</h1>
                    <p>Create an Account</p>
                </div>

                

                <form  
                    className='login-register-form'
                    onSubmit={submitRegistrationForm}
                >

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
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
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
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
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
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
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