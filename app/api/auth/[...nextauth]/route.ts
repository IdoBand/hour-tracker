import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                const {email, password} = credentials as {email: string, password: string}
                if (email !== 'dummyuser@dumdum.com' || password !== '1234') {
                    return null
                }
                return {id: 'dummyuser@dumdum.com', name: 'dummy User', email:'dummyuser@dumdum.com'}
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
  
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}