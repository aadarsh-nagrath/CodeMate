// to validate the user session 
// best to use next session built in session retriver

import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GoogleProvider from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters"
import { db } from "@/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
      } & DefaultSession["user"];
    }
}

export const authConfig = {
    // setting up adaptor to tell next auth it can connect to drizzle db
    adapter: DrizzleAdapter(db) as Adapter,
    // some issue without Adapter type hence specified
    session: {
        strategy: "jwt",
    },
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],

    callbacks: {
        async jwt({ token, user }) {
          const dbUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, token.email!),
          });
    
          if (!dbUser) {
            throw new Error("no user with email found");
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          };
        },
        async session({ token, session }) {
          if (token) {
            session.user = {
              id: token.id as string,
              name: token.name,
              email: token.email,
              image: token.picture,
            };
          }
    
          return session;
        },
    },
} satisfies AuthOptions;

// retrieves session status using getServerSession with authConfig to recognise the drizzle adaptr, and google provider
export function getSession(){
    return getServerSession(authConfig);
}