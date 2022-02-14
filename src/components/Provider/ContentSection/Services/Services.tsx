
/*

Multi Service Platform - Provider Services Content
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useState } from 'react';



import { useAuthentication } from '../../../../custom-hooks/useAuthentication';
import CreateNewServiceComponent from './Create/CreateNewServiceComponent';



import Service from './Service';



const Services: React.FC = () => {


    const [activePrompt, setActivePrompt] = useState<string>('');
    const [services, setServices] = useState<any[]>([]);
    const { session } = useAuthentication();



    useEffect(() => {
        const handler = async () => {
            const res = await fetch(`/api/provider/services/fetch?id=${session?.userId}&accessToken=${session?.accessToken}`, {
                method: 'POST',
            });

            const jsonRes = await res.json();


            const services = jsonRes.services;

            setServices(services);
        }


        if (session) {
            handler();
        }

    }, [session]);



    return (
        <div>
            <p>Active Services</p>
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(15em, 1fr))',
                    gridGap: '0.5em'
                }}
            >
                {
                    (services && services.length !== 0) && services.map((service, idx) => {
                        return <Service service={service} key={idx}/>
                    })
                }

                <CreateNewServiceComponent />
            </div>
        </div>
    )
}



export default Services;