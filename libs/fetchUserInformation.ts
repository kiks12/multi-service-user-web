import authorizedFetch from "../utils/authorizedFetch";



const fetchUserInformation = async (accessToken: string) => {
    const userInformation = await authorizedFetch({
        url: 'http://localhost:4000/user/fetch',
        accessToken: accessToken,
        method: 'GET'
    })



    return userInformation;
}



export default fetchUserInformation;