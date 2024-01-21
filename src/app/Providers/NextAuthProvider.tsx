"use client";
import { SessionProvider } from "next-auth/react";

type NextAuthProps = {
  children: React.ReactNode;
  session: any;
};

export function NextAuthProvider({
  children,
  session,
}: NextAuthProps): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
