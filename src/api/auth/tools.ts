import { signIn } from "@/api/auth";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: { signIn: "/auth/signin" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { success, data } = await signIn({
          email: credentials.email,
          password: credentials.password,
        });

        if (!success) {
          return null;
        }

        return data;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    // @ts-ignore
    async session(params) {
      return { ...params.token };
    },
    async jwt({ user, token }) {
      return { ...token, ...user };
    },
  },

  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
};
