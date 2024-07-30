import { db } from "@/src/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth"
import type { Adapter } from "next-auth/adapters"

const handler = NextAuth({
  // setting up adaptor to tell next auth it can connect to drizzle db
  adapter: DrizzleAdapter(db) as Adapter,
  // some issue without Adapter type hence specified
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
],
})

export { handler as GET, handler as POST }