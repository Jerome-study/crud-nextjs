import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongoDB from "@/libs/mongodb";
import { LoginProps } from "@/models/definitions";
import User from "@/models/register";
import bcrypt from 'bcryptjs'


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials as LoginProps
                await connectMongoDB();
                const found = await User.findOne({username})

                if (!found) {
                    return null
                };

                const comparePassword = await bcrypt.compare(password, found.password);

                if (!comparePassword) {
                    return null
                }
                const user = {
                    first_name: found.first_name,
                    last_name: found.last_name,
                    username: found.username,
                    id: found._id
                }
                return user;

            }
        })
    ],
    
    session: {
        strategy: "jwt"
    },
    
    secret: process.env.NEXTAUTH_SECRET,
    
    pages: {
        signIn: "/"
    },

    callbacks: {
        async session({ session, token, user }) {
            session.user = token.user;
            return session;
          },
        async jwt({ token, user }) {
            if (user) {
              token.user = user;
            }
            return token;
        },
      },
}