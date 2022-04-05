
/*

Multi Service Platform - Service Page Recommended Component
Created: Feb. 24, 2022
Last Updated: Feb. 24, 2022
Author: Tolentino, Francis James S.

*/



import React, { useMemo } from 'react';
import Service from '../../Services/Service';



interface RecommendedProps {
    services: any[];
    currentServiceID: number;
}



const Recommended: React.FC<RecommendedProps> = ({services, currentServiceID}) => {


    const recommendeds = useMemo(() => {
        return services.length !== 0 ? services.filter((service) => service.serviceId !== currentServiceID) : []
    }, [services, currentServiceID]) 



    return (
        <div>
            <h3>Recommendeds</h3>
            <div className='services-grid'>
                {
                    recommendeds.length !== 0 && recommendeds.map((service, idx) => {
                        return <Service service={service} key={idx}/>
                    })
                }
            </div>
        </div>
    )
}



export default Recommended;