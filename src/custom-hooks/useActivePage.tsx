
/*

Multi Service Platform - custom hook that handles active li in left navigation bar
Created: Feb. 09, 2022
Last Updated: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import { useEffect, useState } from "react";



import Router from "../components/router";



type ActivePage = 'Home' | 'Explore' | 'Bookings' | 'Bookmarks' | 'Liked Services' | '';



const useActivePage = () => {

    const router = Router();

    const [activePage, setActivePage] = useState<ActivePage>('');


    
    useEffect(() => {


        switch ((router.pathname).split('/')[1]){
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


    }, []);


    return activePage;
}



export default useActivePage;