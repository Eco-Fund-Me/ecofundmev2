import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { AuthContextProvider } from "@/context/AuthContext";
import Web3Provider from "@/components/Web3Provider";



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
  title: "EcoFundMe",
  description: "EcoFundMe is a Web3-powered, tokenized climate financing platform that connects donors with impactful carbon mitigation projects—ensuring transparency, accountability, and rewards for every contribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
  
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
            <Web3Provider>
         <AuthContextProvider>
      
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
       
        </AuthContextProvider>
        </Web3Provider>
      </body>
    
     
    </html>
  );
}
