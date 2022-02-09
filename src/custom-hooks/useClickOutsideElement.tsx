
/*

Multi Service Platform - custom hook that handles on outside click of modal/popup components
Created: Feb. 09, 2022
Last Update: Feb. 09, 2022
Author: Tolentino, Francis James S.

*/



import { useEffect, useRef } from "react";



type ElementRef = HTMLDivElement | null;



const useClickOutsideElement = (handler: () => void) => {

    const elementRef = useRef<ElementRef>(null);


    useEffect(() => {

        const mainHandler = (e: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(e.target as Node)){
                handler();
            }
        }


        document.addEventListener('click', mainHandler);


        return () => {
            document.removeEventListener('click', mainHandler);
        }


    }, []);



    return elementRef;

}



export default useClickOutsideElement;