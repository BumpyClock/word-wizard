import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/ui/header";
import { SiteColorSchemeProvider } from "@/components/theme/SiteColorSchemeProvider";
import 'overlayscrollbars/overlayscrollbars.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Games Hub - Educational Games for Children",
  description: "Interactive educational games for children to learn language, math, and science while having fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SiteColorSchemeProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <div 
                className="flex-1"
                data-scrollbars-auto-hide="move"
              >
                <main className="flex-1 min-h-[calc(100vh-8rem)]">
                  {children}
                </main>
                <footer className="border-t py-6 bg-background">
                  <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                    <p className="text-center text-sm text-muted-foreground">
                      &copy; {new Date().getFullYear()} Learning Games Hub. All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </div>
          </SiteColorSchemeProvider>
        </Providers>
      </body>
    </html>
  );
}