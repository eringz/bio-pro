import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bio PRo - Smart Attendance & Analytics System",
  description: "Bio Pro is a smart attendance system that leverage Face Recognition (mock-up via laptop camera) and is designed to evolve with Fingerprint/IOT hardware integration in the future. It provides an end-to-end solution from attendance logging to payroll-ready reporting.",
  viewport: {
    width: "device-with",
    initialScale: 1,
  },
  icons: {
    icon: "/bio-pro.ico"
  }
};



export default function RootLayout({
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}