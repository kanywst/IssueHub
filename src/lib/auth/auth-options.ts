import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.DEBUG_AUTH === "true",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        if (process.env.DEBUG_AUTH === "true") {
          console.log("GitHub profile:", profile);
        }
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (process.env.DEBUG_AUTH === "true") {
        console.log("Session callback called with:", { session, token, user });
      }
      if (token) {
        session.user.id = token.sub as string;
      } else if (user) {
        session.user.id = user.id;
      }
      if (process.env.DEBUG_AUTH === "true") {
        console.log("Updated session:", session);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (process.env.DEBUG_AUTH === "true") {
        console.log("JWT callback called with:", { token, user });
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
