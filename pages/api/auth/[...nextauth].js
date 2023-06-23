import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dotenv from "dotenv"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { connectDB } from '@/util/database'

dotenv.config({ path: '.env.local' });

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    //more Provider
    //...
  ],
  secret : process.env.SECRET_KEY,
  adapter : MongoDBAdapter(connectDB)
  //more Adapter (Redis..)
};
export default NextAuth(authOptions); 