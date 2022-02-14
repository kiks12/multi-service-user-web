
/*

Multi Service Platform - custom hook that handles active li in left navigation bar
Created: Feb. 09, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import { useEffect, useState } from "react";



import Router from "../components/router";



type ActivePage = 
    'Home' | 
    'Explore' | 
    'Bookings' | 
    'Bookmarks' | 
    'Liked Services' | 
    '' | 
    'Provider-Overview' | 
    'Provider-Profile' | 
    'Provider-Services' |
    'Provider-Settings';



const useActivePage = () => {

    const router = Router();

    const [activePage, setActivePage] = useState<ActivePage>('');



    const pathname = (router.pathname).split('/');


    
    useEffect(() => {

        // Check if the route is connected to provider
        // every route that has provider as its index 1 is a page within providers
        // In this line we are checking if it is a provider page
        if (pathname[1] !== 'provider'){
            switch (pathname[1]){
                case '':
                    setActivePage('Home');
                    break;
                case 'explore':
                    setActivePage('Explore');
                    break;
                case 'bookings':
                    setActivePage('Bookings');
                    break;
                case 'bookmarks':
                    setActivePage('Bookmarks');
                    break;
                case 'liked-services':
                    setActivePage('Liked Services');
                    break;
                default:
                    setActivePage('');
                    break;
            }
        } else {
            // Check if it is a provider page and also if it has no 
            // preceeding pathname. If no preceeding pathname 
            // set the active page to Provider-Overview
            if (pathname[1] === 'provider' && typeof pathname[2] === 'undefined') {
                setActivePage('Provider-Overview');
                return;
            }
            // If otherwise has preceeding pathname then execute switch case 
            else {

                switch (pathname[2]){
                    case 'services':
                        setActivePage('Provider-Services');
                        break;
                    default:
                        setActivePage('');
                        break;
                }

            }
        }


    }, [pathname]);



    return activePage;
}



export default useActivePage;