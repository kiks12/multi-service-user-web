


import React, { useMemo } from 'react';



import { formatter } from '../../../utils/formatter';




interface PricingDetailsProps {
    service: any;
}






const PricingDetails: React.FC<PricingDetailsProps> = ({ service }) => {

    const formattedInitial = useMemo(() => {
        return formatter.format(parseInt(service.priceInitial, 10));
    }, [service]);
    
    
    const formattedFinal = useMemo(() => {
        return formatter.format(parseInt(service.priceFinal, 10));
    }, [service]);



    return (
        <div
            style={{
                width: '100%',
                position: 'sticky',
                top: '6.2em',
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--boxShadow)'
            }}
            className='card'
        >
            <h2>Pricing</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Type: </td>
                        <td>{service.priceType}</td>
                    </tr>
                    <tr>
                        <td>Starting Price: </td>
                        <td>{formattedInitial}</td>
                    </tr>
                    <tr>
                        <td>Last Price: </td>
                        <td>{formattedFinal}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button className='main-button'>
                    Book Service
                </button>
                <button 
                    className='ghost-button'
                    style={{
                        margin: '0.5em 0 0 0'
                    }}
                >
                    Negotiate Pricing
                </button>
            </div>
        </div>
    )
}




export default PricingDetails;