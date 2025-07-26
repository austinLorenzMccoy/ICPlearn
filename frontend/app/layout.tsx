import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import AuthWrapper from "@/components/Auth/AuthWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ICPlearn - Decentralized AI-Powered Learning Platform",
  description: "Transform your education with AI-powered courses, Bitcoin rewards, and decentralized learning on the Internet Computer Protocol. Earn while you learn with ICPlearn.",
  keywords: "ICP, Internet Computer, blockchain education, AI learning, Bitcoin rewards, decentralized education, Web3 learning",
  authors: [{ name: "Theophilus & Austin" }],
  openGraph: {
    title: "ICPlearn - Decentralized AI-Powered Learning Platform",
    description: "Transform your education with AI-powered courses, Bitcoin rewards, and decentralized learning on the Internet Computer Protocol.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICPlearn - Decentralized AI-Powered Learning Platform",
    description: "Transform your education with AI-powered courses, Bitcoin rewards, and decentralized learning on the Internet Computer Protocol.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthWrapper> */}
          <Navbar />
          {children}
          <Footer />
        {/* </AuthWrapper> */}
      </body>
    </html>
  );
}
