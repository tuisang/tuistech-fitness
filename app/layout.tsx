import type { Metadata } from "next";
import { Anton, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

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
  metadataBase: new URL("https://fitness.tuistech.co.ke"),
  title: {
    default: "Tuistech Fitness & Wellness | Strength, Weight Loss & Coaching - Nairobi",
    template: "%s | Tuistech Fitness & Wellness",
  },
  description:
    "Coached strength training, weight-loss programs and family fitness in Nairobi. Follow-along video workouts, downloadable training guides, 1:1 consulting, and equipment for home training.",
  keywords: [
    "fitness Nairobi",
    "personal trainer Nairobi",
    "weight loss coaching Kenya",
    "strength training",
    "kids fitness Nairobi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tuistech Fitness & Wellness | Strength, Weight Loss & Coaching - Nairobi",
    description:
      "Coached strength training, weight-loss programs and family fitness in Nairobi. Follow-along video workouts, downloadable training guides, 1:1 consulting, and equipment for home training.",
    url: "https://fitness.tuistech.co.ke",
    siteName: "Tuistech Fitness & Wellness",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuistech Fitness & Wellness | Strength, Weight Loss & Coaching - Nairobi",
    description:
      "Coached strength training, weight-loss programs and family fitness in Nairobi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Tuistech Fitness & Wellness",
  description:
    "Coached strength training, weight-loss programs, youth athletics, and children's fitness in Nairobi, Kenya.",
  url: "https://fitness.tuistech.co.ke",
  telephone: "+254726461196",
  email: "fitness@tuistech.co.ke",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: "Nairobi, Kenya",
  priceRange: "KES 900 - KES 14,500",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${workSans.variable} ${jbMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}