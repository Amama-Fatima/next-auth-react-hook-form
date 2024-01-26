import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          id: 'credentials',
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
        async authorize(credentials: Record<"email" | "password", string> | undefined) {
            console.log("Inside authorize function")
            if(!credentials?.email || !credentials?.password){
                return null
            }

            const existingUser = await db.user.findUnique({
                where: {email: credentials.email}
            })

            if(!existingUser){
                return null
            }

            const passwordMatches = await compare(credentials.password, existingUser.password)
            
            if(!passwordMatches){
                return null
            }

            return {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            }
        }
        })
    ],
    
}
// useSecureCookies: process.env.NEXTAUTH_URL?.startsWith("https") ?? false