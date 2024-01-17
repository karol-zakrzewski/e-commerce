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
    async session({ token, session }) {
      // @ts-ignore
      // const user = token.token.token.token.token.user;
      session.user = token;

      return session;
    },
    async jwt(params) {
      console.log("🚀  token:", params);
      // @ts-ignore
      // const user = token.token.token.token.user;
      // const email = user.email;
      // const name = `${user.firstName} ${user.lastName}`;
      return token;
    },
  },

  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
};
