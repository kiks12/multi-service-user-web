
/*

Multi Service Platform - Service Provider Login Page
Created: Feb. 10, 2022
Last Updated: Feb. 11, 2022
Author: Tolentino, Francis James S.

*/



import type { NextPage } from "next";



import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



import BottomMenu from "../../../src/components/LoginRegister/BottomMenu";
import Link from "next/link";



const ProviderLogin : NextPage = () => {

    const { loginWithGoogle, loginWithFacebook, message } = useAuthentication();

    return (
        <main className="provider-login-main-container">
            <div className="card">



                <h1>Be a Provider</h1>


                <div style={{display: 'flex'}}>
                    <small>You can use your main user account or </small>
                    <Link href='/register' passHref={true}>
                        <small 
                            className='main-purple-link'
                            style={{
                                margin: '0 0 0 0.4em'
                            }}
                        >
                            Register new account
                        </small>
                    </Link>
                </div>


                {
                    message.msg !== '' && (
                        <div className={message.status === 500 ? 'error-message' : 'success-message'}>
                            { message.msg }
                        </div>
                    )
                }



                <button
                    className="button google-button"
                    style={{
                        margin: '3em 0 0 0'
                    }}
                    onClick={() => loginWithGoogle("provider")}
                >
                    Sign in with Google
                </button>
                <button
                    className="button facebook-button"
                    style={{
                        margin: '0.3em 0 0 0',
                    }}
                    onClick={loginWithFacebook}
                >
                    Sign in with Facebook
                </button>

                <div style={{margin: '3em 0 0 0'}}>
                    <BottomMenu type='LoginProvider' />
                </div>

            </div>
        </main>
    )
}



export default ProviderLogin;