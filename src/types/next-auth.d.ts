import NextAuth, {DefaultSession} from "next-auth/next";

declare module "next-auth" {
    interface Session {
      user: {
        username: string,
        first_name: string,
        last_name: string,
      } & DefaultSession["user"]
    }
  }