
/*

Multi Service Platform (User Web) - Login Page
Created: Feb. 07, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import type { NextPage } from 'next';



import Link from 'next/link';



import { useAuthentication } from '../../src/custom-hooks/useAuthentication';



import BottomMenu from '../../src/components/LoginRegister/BottomMenu';
import Logo from '../../src/components/LoginRegister/Logo';
import authenticatePage from '../../libs/authenticatePage';



const Login : NextPage = () => {


    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');


    const { message, loginWithGoogle, loginWithFacebook } = useAuthentication();




    return (
        <main className='login-register-main-container'>


            <div className='login-register-left-container'>
               <Logo /> 
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
                            <div className={message.status === 500 ? 'error-message' : 'success-message'}>
                                { message.msg }
                            </div>
                        )
                    }
            

                    {/* <form 
                        className='login-register-form'
                    >

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>


                            <div 
                                style={{
                                    margin: '1em 0 0 0'
                                }}
                            >
                                <label>Password</label>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <input 
                                        name='password'
                                        type='password'
                                        placeholder='Enter your password'
                                        className='form-control'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div
                                        style={{
                                            height: '100%',
                                            padding: '0.2em',
                                            border: '0.3px solid var(--secondaryPurple)',
                                            backgroundColor: 'var(--secondaryPurple)',
                                            color: 'var(--white)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <small>see</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button 
                                className='button main-button'
                                style={{
                                    margin: '0 0 3em 0'
                                }}
                                type='submit'
                            >
                                Login
                            </button>
                        </div>

                    </form> */}



                    <div className='social-media-sign-in-sign-up-container'>
                        

                        <div className='google-facebook-buttons-container'>
                            <button 
                                className='button google-button'
                                onClick={loginWithGoogle}
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


               <BottomMenu /> 



            </div>



        </main>
    )
}



    
export default Login;