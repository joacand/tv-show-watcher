import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
import SideBar from "./sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TV Show Watcher",
  description: "Keep track of your favorite TV shows",
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
        <div className="flex flex-col h-screen">
          <Header className="h-16 bg-blue-600 text-white flex items-center px-4" />
          <div className="flex flex-1">
            <SideBar className="" />
            <main className="flex-1 p-6 bg-black-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
