import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { env } from "./env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    redirect: ({ url, baseUrl }) => {
      // If the URL is a relative URL, make it absolute
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise, redirect to home
      return `${baseUrl}/home`;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "database",
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
});
