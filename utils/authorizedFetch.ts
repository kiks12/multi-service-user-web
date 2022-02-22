

interface AuthorizedFetchParameters {
    url: string,
    method: 'GET' | 'POST' | 'PUT',
    body?: any, 
    accessToken: string,
    options?: any
}


type AuthorizedFetch = ({
    url,
    method,
    body, 
    accessToken,
    options
}: AuthorizedFetchParameters) => any



const authorizedFetch: AuthorizedFetch = async ({ url, accessToken, method, body, options }) => {

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: body,
            ...options
        })

        const resJson = await res.json();

        return resJson;

    } catch (e) {
        console.error(e);
    }

}



export default authorizedFetch;