
/*

Multi Service Platform - Fetch Services Reusable function lib
Created: Feb. 17, 2022
Last Updated: Feb. 17, 2022
Author: Tolentino, Francis James S.

*/



interface FetchServicesProps {
    userId: number;
    accessToken: string;
}



const fetchServices = async ({userId, accessToken}: FetchServicesProps) => {
    const servicesResponse = await fetch(`${process.env.SITE_URL}/api/services/fetch?id=${userId}&accessToken=${accessToken}`, {
        method: 'POST',
    })

    const servicesJson = await servicesResponse.json();
    const services = servicesJson.services;


    return services;
} 



export default fetchServices; 