import { Navigation } from "@/components/layout/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "@/app/Providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/tools";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "Amazing e-commerce with valves, pips and fittings",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pl">
      <body className={`${poppins.className} relative`}>
        <NextAuthProvider session={session}>
          <Navigation />
          {children}
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
