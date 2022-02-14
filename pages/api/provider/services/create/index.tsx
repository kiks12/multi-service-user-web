
/*

Multi Services Platform - Provider Create new Service Page
Created: Feb. 14, 2022
Last Updated: Feb. 14, 2022
Author: Tolentino, Francis James S.

*/



import type { NextPage } from "next";



import Layout from "../../../../../src/components/Provider/Layout/ProviderLayout";
import CreateNewServiceContent from "../../../../../src/components/Provider/ContentSection/Services/Create/CreateNewServiceContent";



const CreateService: NextPage = () => {
    return (
        <>
            <Layout contentSection={<CreateNewServiceContent />}/>
        </>
    )
}



export default CreateService;