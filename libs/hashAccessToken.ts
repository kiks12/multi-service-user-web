

import sha256 from 'crypto-js/sha256';


export const generateAccessToken = ({email, username}: any) => {
    const accessToken = sha256(email + username);
    console.log(accessToken.toString());
    return accessToken.toString();
}