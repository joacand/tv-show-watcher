import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import SideBar from "./SideBar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Providers from "./Providers";

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
  description: "Subscribe to your favorite TV shows, track upcoming episodes, and stay updated with the latest releases.",
  keywords: [
    "TV shows",
    "track TV series",
    "favorite shows",
    "TV show tracker",
    "upcoming episodes",
    "TV series subscriptions"
  ],
  authors: [{ name: "joacand" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col items-stretch p-[10px] w-full h-screen relative">
            <Header />
            <div className="flex flex-1 w-full">
              <SideBar className="" />
              <main className="flex-1 p-6 max-w-300" role="main">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
