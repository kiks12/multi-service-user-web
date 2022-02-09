


import NextAuth from "next-auth/next";



import GoogleProvider from "next-auth/providers/google";



export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 15
    },
    providers: [
        GoogleProvider({
            clientId: '917044662078-ogpm52qrmdnhkkbc2tv249ugofo3ddh1.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if (user){
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {

            const { email } = session;

            const res = await fetch('http://localhost:3000/api/auth/signin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            })

            const json = await res.json();

            session.status = json.status;
            session.msg = json.msg;
            

            if (token) {
                session.id = token.id;
            }

            return session;
        }
    },
    secret: "MultiServicePlatformSecret",
    jwt: {
        secret: "MultiServicePlatformSecret",
    },
})