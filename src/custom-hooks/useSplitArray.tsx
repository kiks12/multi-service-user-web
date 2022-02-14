
/*

Multi Service Platform - Custom hook to split array everytime the dependency change
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import { useMemo } from "react"



interface ArraySplitProps {
    stringToSplit: string,
    splitter: string,
    dependencies?: any[],
}


const useSplitArray = ({ stringToSplit, splitter, dependencies }: ArraySplitProps) => {
        
    const splittedArray = useMemo(() => {
        return (stringToSplit.split(splitter)).map(string => string.trim());
    }, dependencies);


    return splittedArray;
}



export default useSplitArray;