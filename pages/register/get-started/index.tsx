


import { NextPage } from "next";
import Image from 'next/image';



import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../../src/custom-hooks/useAuthentication";



interface userInformation {
    email: string;
    username: string;
    provider: string;
    image: string;
    address: string;
    contact: string;
}



const RegisterGetStarted: NextPage = () => {

    const { completeRegistration, message } = useAuthentication();
    const router = useRouter();
    const [userInformation, setUserInformation] = useState<userInformation>({
        email: '',
        address: '',
        contact: '',
        image: '',
        provider: '',
        username: ''
    });



    useEffect(() => {
        const persistedLoggedInInformation = JSON.parse(localStorage.getItem('loggedIn') as string);
        setUserInformation(prev => {
            return {
                ...prev,
                email: persistedLoggedInInformation.email,
                image: persistedLoggedInInformation.image,
                provider: persistedLoggedInInformation.provider
            }
        })
    }, [setUserInformation]);



    const handleInputOnChange = (e: any) => {
        setUserInformation(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }



    const completeAccountRegistration = (e: any) => {
        e.preventDefault();
        completeRegistration(JSON.stringify(userInformation));
    }



    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>

            <div style={{
                position: 'absolute',
                left: 20,
                top: 20,
            }}>
                <button onClick={() => {
                    router.push('/register');
                }}>
                    Go Back
                </button>
            </div>


            <h1>Multi Service Platform</h1>
            <h3>Registration - Get Started</h3>
            <div
                className=''
                style={{
                    width: 'min(90%, 25em)',
                    margin: '0 auto',
                    padding: '2em',
                    borderRadius: '0.5em'
                }}
            >
                {
                    userInformation.image !== '' &&
                    <div 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <div 
                            className='account-circle'
                            style={{
                                height: '6em',
                                width: '6em'
                            }}
                        >
                            <Image 
                                src={userInformation.image}
                                alt={userInformation.email}
                                width={500}
                                height={500}
                                objectFit='fill'
                            />
                        </div>
                        <h4>{userInformation.provider}</h4>
                        <input 
                            className='form-control'
                            defaultValue={userInformation.email}
                            disabled={true}
                        />
                    </div>
                }



                <form onSubmit={completeAccountRegistration}>

                    <div>
                        <label>Username</label>
                        <input
                            name='username'
                            className='form-control'
                            value={userInformation.username} 
                            onChange={handleInputOnChange}
                            required
                        />
                    </div>

                    
                    <div>
                        <label>Address</label>
                        <input 
                            name='address'
                            className='form-control'
                            value={userInformation.address}
                            onChange={handleInputOnChange}
                            required
                        />
                    </div>


                    <div>
                        <label>Contact</label>
                        <input 
                            name='contact'
                            className='form-control'
                            value={userInformation.contact}
                            onChange={handleInputOnChange}
                            required
                        />
                    </div>

                    {
                        message.msg !== '' &&
                            <div className={message.status === 200 ? 'success-message' : 'error-message'}>
                                {message.msg}
                            </div>
                    }


                    <button onSubmit={completeAccountRegistration} className='main-button'>
                        Continue
                    </button>

                </form>

            </div>
        </div>
    )
}



export default RegisterGetStarted;