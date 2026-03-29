import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { GoogleTagManager } from "@next/third-parties/google";
import { AuthProvider } from "../context/AuthContenxt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WiCS Hunter College | Women in Computer Science",
  description: "Women in Computer Science (WiCS) at Hunter College, CUNY. Join our community for workshops, networking events, and resources for women and non-binary people in tech.",
  keywords: "WiCS, Hunter College, Women in Computer Science, Hunter WiCS, CUNY, women in tech, computer science club",
  verification: {
    google: "zwz7fl44YuhUk9vZodGIB6sxBY5YGy8HjT_ZiUFtmU8",
  },
  openGraph: {
    title: "WiCS Hunter College | Women in Computer Science",
    description: "Women in Computer Science (WiCS) at Hunter College, CUNY. Join our community for workshops, networking events, and resources for women and non-binary people in tech.",
    url: "https://hunterwics.com",
    siteName: "Hunter WiCS",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
  <body className={`${inter.className} bg-gradient-to-r from-[#fdf2f8] via-white to-[#fdf2f8] min-h-screen`}>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </body>
        <GoogleTagManager gtmId={String(process.env.NEXT_PUBLIC_GA_ID)} />
      </html>
    </ClerkProvider>
  );
}
