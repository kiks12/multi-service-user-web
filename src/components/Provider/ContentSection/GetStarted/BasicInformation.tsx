
/*

Multi Service Platform - Provider Get Started Basic Information Content
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';





const BasicInformation: React.FC = () => {

    const { session, setSession } = useAuthentication();


    
    const handleInputChange = (e:any) => {
        if (typeof setSession === 'function') {
            setSession((prev: any) => {
                prev = {
                    ...prev, 
                    [e.target.name]: e.target.value
                }
                return prev
            })
        }
    }



    return (
        <div style={{
            margin: '2em 0 0 0'
        }}>
            <form>


                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <label>Email</label>
                    <input
                        className='form-control' 
                        value={session?.email as string}
                        style={{
                            cursor: 'not-allowed'
                        }}
                        disabled
                    />
                </div>


                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1em 0 0 0'
                    }}
                >
                    <label>Username</label>
                    <input
                        className='form-control' 
                        value={session?.username as string}
                        style={{
                            cursor: 'not-allowed'
                        }}
                        disabled
                    />
                </div>



                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1em 0 0 0'
                    }}
                >
                    <label>Shop Name</label>
                    <input
                        name='shopName'
                        className='form-control' 
                        placeholder='Enter your shop Name'
                        value={session?.shopName as string}
                        onChange={handleInputChange}
                    />
                </div>


                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1em 0 0 0'
                    }}
                >
                    <label>Address</label>
                    <input
                        name='address'
                        placeholder='Address'
                        className='form-control' 
                        value={session?.address as string}
                        onChange={handleInputChange}
                    />
                </div>


                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '1em 0 0 0'
                    }}
                >
                    <label>Contact</label>
                    <input
                        name='contact'
                        placeholder='0000 000 0000'
                        className='form-control' 
                        value={session?.contact as string}
                        onChange={handleInputChange}
                    />
                </div>


            </form>
        </div>
    )
}



export default BasicInformation;