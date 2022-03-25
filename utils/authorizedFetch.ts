

interface AuthorizedFetchParameters {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',  
    body?: any, 
    accessToken: string,
    headers?: any
}


type AuthorizedFetch = ({
    url,
    method,
    body, 
    accessToken,
    headers
}: AuthorizedFetchParameters) => any



const authorizedFetch: AuthorizedFetch = async ({ url, accessToken, method, body, headers }) => {

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                ...headers,
                'Authorization': 'Bearer ' + accessToken,
            },
            body: body,
        })

        const resJson = await res.json();

        return resJson;

    } catch (e) {
        console.error(e);
    }

}



export default authorizedFetch;