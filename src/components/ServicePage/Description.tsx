
/*

Multi Service Platform - Service Page Description Component
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/


import React from 'react';



interface DescriptionProps {
    service: any
}



const Description = React.forwardRef<HTMLDivElement, DescriptionProps>(({service}, ref) => {
    return (
        <div 
            ref={ref}
            style={{
                margin: '1em 0'
            }}
        >
            <h3>About this Service</h3>

            <textarea
                style={{
                    width: '100%',
                    minHeight: '30vh',
                    fontSize: 'var(--normalFontSize)',
                    outline: 'none',
                    resize: 'none',
                    border: 'none'
                }}
                value={service.serviceDetails} 
                readOnly
            />
        </div>
    )
});

Description.displayName = 'Description'



export default Description;