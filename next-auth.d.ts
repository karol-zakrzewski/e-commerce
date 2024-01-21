import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    token: string;
  }
}
