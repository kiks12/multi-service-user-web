
/*

Multi Service Platform - Service Page About the Provider Component
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



import Image from 'next/image';



interface AboutProviderProps {
    user: any
}



const AboutProvider: React.FC<AboutProviderProps> = ({user}) => {



    return (
        <div style={{
            margin: '1em 0'
        }}>
            <h3>About the Provider</h3>

            <div style={{
                margin: '1em 0',
                display: 'flex',

            }}>
                <div 
                    className='account-circle'
                    style={{
                        width: '7em',
                        height: '7em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyItems: 'center'
                    }}
                >
                    <Image
                        src={user.image} 
                        alt={user.username}
                        height={120}
                        width={120}
                        objectFit='fill'
                    />
                </div>
                <div style={{
                    width: '25%',
                    marginInline: '1em'
                }}>
                    <h4>{user.username}</h4>
                    <p>How can I help you today?</p>
                    <div className='split'>
                        <button className='ghost-button'>
                            Message
                        </button>
                        <button className='ghost-button'>
                            View Shop
                        </button>
                    </div>
                </div>
            </div>


            <div>
                <small className='secondary-purple-text'>Shop Description</small>
                <p>{user.description}</p>
            </div>

        </div>
    )
}



export default AboutProvider;