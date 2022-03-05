
/*

Multi Service Platform - Provider Services Create new Service Component
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import styles from './CreateNewServiceButton.module.css';



import Link from 'next/link';



import React from 'react';



const CreateNewService: React.FC = () => {

    return (
        <Link href='/provider/services/create' passHref={true}>
            <div className={styles.createNewServiceButtonContainer}>
                <div className={styles.createNewServiceButtonCircle}>
                    +
                </div>
                <p>Create new Service</p>
            </div>
        </Link>
    )
}



export default CreateNewService;