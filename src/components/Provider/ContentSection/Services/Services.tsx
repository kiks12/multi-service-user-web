
/*

Multi Service Platform - Provider Services Content
Created: Feb. 14, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



import React, { useEffect, useMemo, useState } from 'react';



import { useAuthentication } from '../../../../custom-hooks/useAuthentication';



import CreateNewServiceComponent from './Create/CreateNewServiceComponent';
import Service from './Service';
import ServicesMenu from './ServicesMenu';



type Prompts = 'active' | 'inactive' | 'all'



const Services: React.FC = () => {


    const [services, setServices] = useState<any[]>([]);
    const [activePrompt, setActivePrompt] = useState<Prompts>('active');



    const filteredServices = useMemo(() => {
        if (activePrompt === 'active') {
            return services.filter(service => service.status === 'active');
        }

        if (activePrompt === 'inactive') {
            return services.filter(service => service.status === 'inactive');
        }

        return services;
    }, [services, activePrompt]);




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



    // if (services.length === 0) {
    //     return <p>Loading..</p>
    // }



    return (
        <div>
            <ServicesMenu 
                activePrompt={activePrompt} 
                onClick={(value: Prompts) => {
                    setActivePrompt(value);
                }}
            />
            <div 
                style={{
                    margin: '1.5em 0 0 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(10em, 1fr))',
                    gridGap: '0.5em'
                }}
            >
                {
                    (filteredServices && filteredServices.length !== 0) && filteredServices.map((service, idx) => {
                        return <Service service={service} key={idx}/>
                    })
                }

                <CreateNewServiceComponent />
            </div>
        </div>
    )
}



export default Services;