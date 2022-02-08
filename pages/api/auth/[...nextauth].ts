


import NextAuth from "next-auth/next";


import CredentialsProvider from "next-auth/providers/credentials";



import prisma from "../../../prisma/prisma";



export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 15
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                Email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                Password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                console.log('Credentials: ', credentials);


                return null
            }
        }),
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if (user){
                token.id = user.id;
            }

            return token;
        },
        session: ({session, token}) => {
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