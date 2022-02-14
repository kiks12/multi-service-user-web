



import React, { useEffect } from 'react';
import { useAuthentication } from '../../../../custom-hooks/useAuthentication';





const Services: React.FC = () => {

    const { session } = useAuthentication();

    useEffect(() => {
        const handler = async () => {
            await fetch(`/api/provider/services/fetch?id=${session?.userId}&accessToken=${session?.accessToken}`, {
                method: 'POST',
            });
        }


        if (session) {
            console.log('fetching id: ', session?.userId);
            handler();
        }
        // console.log(session);
    }, [session]);

    return (
        <div>
            <h2>Active Services</h2>
        </div>
    )
}



export default Services;