
/*

Multi Service Platform - custom hook that handles the signin/signup logic 
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import { createContext, useContext, useEffect, useState } from "react";



type SignTypes = 'Login' | 'Register';



interface SignLogicContext {
    type: SignTypes,
    setType: React.Dispatch<React.SetStateAction<SignTypes>> | null,
}



const signLogicContext = createContext<SignLogicContext>({
    type: 'Login', 
    setType: () => {},
});



export const SignLogicProvider: React.FC = ({children}) => {

    const [type, setType] = useState<SignTypes>('Login');
 

    return (
        <signLogicContext.Provider value={{type, setType}}>
            {children}
        </signLogicContext.Provider>
    )
}



export const useSignLogic = () => {
    return useContext(signLogicContext);
}