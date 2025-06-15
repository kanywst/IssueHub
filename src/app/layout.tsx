import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiProvider from "@/components/layout/MuiProvider";
import AuthProvider from "@/components/layout/AuthProvider";
import TrpcProvider from "@/components/layout/TrpcProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IssueHub - OSS Good First Issues",
  description: "OSS初心者向けにgood first issueラベルが付いた課題をすぐに見つけられるプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <MuiProvider>
            <TrpcProvider>
              {children}
            </TrpcProvider>
          </MuiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
