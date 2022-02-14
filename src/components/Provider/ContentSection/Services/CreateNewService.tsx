
/*

Multi Service Platform - Provider Services Create new Service Component
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import React from 'react';



const CreateNewService: React.FC = () => {

    return (
        <div 
            style={{
                backgroundColor: 'var(--gray)',
                height: '30vh',
                borderRadius: '0.5em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
            }}
        >
            <div 
                style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--white)',
                    borderRadius: '50%',

                }}
            >
                +
            </div>
            <p>Create new Service</p>
        </div>
    )
}



export default CreateNewService;