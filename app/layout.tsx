import type { Metadata } from "next";
import { Anton, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-worksans",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tuistech Fitness & Wellness | Strength, Weight Loss & Coaching — Nairobi",
  description:
    "Coached strength training, weight-loss programs and family fitness in Nairobi. Follow-along video workouts, downloadable training guides, 1:1 consulting, and equipment for home training.",
  keywords: [
    "fitness Nairobi",
    "personal trainer Nairobi",
    "weight loss coaching Kenya",
    "strength training",
    "kids fitness Nairobi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${workSans.variable} ${jbMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
