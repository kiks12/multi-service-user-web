
/*

Multi Service Platform - Provider Get Started Page Finalization Content
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import React, { useMemo } from 'react';



import { User } from '../../../../types';



import { useAuthentication } from '../../../custom-hooks/useAuthentication';




const sessionCopyCreator = (session: User) => {
    const {
        email, 
        username, 
        shopName,
        address, 
        contact,
        description, 
        skills,
        verifiedProvider,
    } = session;

    return {
        email,
        username,
        shopName, 
        address,
        contact, 
        description,
        skills,
        verifiedProvider
    }
}




const Finalization: React.FC = () => {

    const { session } = useAuthentication();


    const sessionCopy = useMemo(() => {
        if (session) {
            return sessionCopyCreator(session);
        }
        
        return {};
    }, [session]);



    const sessionValues = useMemo(() => {
        return Object.values(sessionCopy);
    }, [sessionCopy]);



    const sessionKeys = useMemo(() => {
        return Object.keys(sessionCopy);
    }, [sessionCopy]);



    return (
        <div>
            <table>
                <tbody>
                    {
                        sessionValues.map((sessionProperty, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{sessionKeys[idx]}</td>
                                    <td>
                                        {
                                            typeof sessionProperty === 'boolean' ? (
                                                    sessionProperty ? 'True' : 'False'
                                            ) : sessionProperty as string
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}



export default Finalization;