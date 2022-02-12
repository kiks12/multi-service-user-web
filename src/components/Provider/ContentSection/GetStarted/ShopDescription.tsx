
/*

Multi Service Platform - Provider Get Started Shop Description Content
Created: Feb. 12, 2022
Last Updated: Feb. 12, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



const ShopDescription: React.FC = () => {

    const { session, setSession } = useAuthentication();

    return (
        <div>
            <p>Write a short description about your shop.</p>
            <input
                name='description'
                className='form-control'
                value={session?.description as string}
                onChange={(e:any) => {
                    if (typeof setSession === 'function') {
                        setSession((prev: any) => {
                            prev = {
                                ...prev,
                                [e.target.name]: e.target.value,
                            }
                            return prev;
                        })
                    }
                }}
            />
        </div>
    )
}



export default ShopDescription;