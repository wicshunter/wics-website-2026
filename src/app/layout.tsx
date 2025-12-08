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
  title: "Womxn in Computer Science",
  description: "Hunter College WiCS Club",
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
