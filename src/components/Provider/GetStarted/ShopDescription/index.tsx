
/*

Multi Service Platform - Provider Get Started Shop Description Content
Created: Feb. 12, 2022
Last Updated: Mar. 16, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



import styles from './ShopDescription.module.css';



const ShopDescription: React.FC = () => {

    const { session, setSession } = useAuthentication();

    return (
        <div className={styles.container}>
            <p className={styles.text}>Write a short description about your shop.</p>
            <textarea
                name='description'
                className={styles.textarea}
                value={!session?.description ? '' : session?.description as string}
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