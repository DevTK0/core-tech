import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(PrismaClient),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
    ],
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
    },
    session: {
      strategy: 'jwt',
    }

  }

export default NextAuth(authOptions)