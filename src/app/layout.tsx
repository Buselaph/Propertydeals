import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase-server";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property Deals — South Africa's Most Affordable Property Portal",
  description:
    "Buy, sell and rent property across South Africa. Lower fees than Property24 — only R99 per successful sale. Browse thousands of listings.",
  keywords: "property, real estate, south africa, buy, sell, rent, houses, apartments",
  openGraph: {
    title: "Property Deals",
    description: "South Africa's most affordable property portal",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white">
        <Navbar user={user ? { name: user.user_metadata?.full_name ?? user.email ?? '', email: user.email ?? '' } : null} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
