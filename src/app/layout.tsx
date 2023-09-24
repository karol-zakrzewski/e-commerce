import { Navigation } from "@/app/components/layout/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "Amazing e-commerce with valves, pips and fittings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={poppins.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export const Footer = () => {
  return <div className="h-11 bg-red-300">footer</div>;
};
