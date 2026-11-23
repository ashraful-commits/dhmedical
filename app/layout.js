import "./globals.css";
import { Hind_Siliguri, Anek_Bangla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PageLoader from "@/components/PageLoader";
import { LanguageProvider } from "@/context/LanguageContext";
import { BASE_URL, MASTER_SEO_KEYWORDS, getOrganizationSchema } from "@/lib/seoHelper";

const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const head = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-head",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "D H Medical Support | জরুরি অ্যাম্বুলেন্স, ডাক্তার সিরিয়াল ও হাসপাতাল সমন্বয় বাংলাদেশ",
    template: "%s | D H Medical Support",
  },
  description:
    "সারাদেশে ২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স (সাধারণ, অক্সিজেন, ICU, NICU), বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট সিরিয়াল, হাসপাতাল ভর্তি ও প্রবাসী ফ্যামিলি কেয়ার। হটলাইন: 01625-268462।",
  keywords: MASTER_SEO_KEYWORDS,
  authors: [{ name: "D H Medical Support Team", url: BASE_URL }],
  creator: "D H Medical Support",
  publisher: "D H Medical Support",
  applicationName: "D H Medical Support",
  category: "health",
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    title: "D H Medical Support — প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
    description:
      "২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স, ডাক্তার সিরিয়াল ও হাসপাতাল ভর্তি সেবা। হটলাইন: 01625-268462। সারা বাংলাদেশে দ্রুততম মেডিকেল সহায়তা।",
    url: BASE_URL,
    siteName: "D H Medical Support",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "D H Medical Support Emergency Healthcare Bangladesh",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D H Medical Support | 24/7 Medical Care & Ambulance Bangladesh",
    description:
      "Emergency Ambulance, Specialist Doctor Appointments, and Hospital Coordination in Bangladesh. Call 01625-268462.",
    images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=630&fit=crop&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0F52BA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = getOrganizationSchema();

  return (
    <html lang="bn" className={`${body.variable} ${head.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="geo.region" content="BD-13" />
        <meta name="geo.placename" content="Dhaka, Bangladesh" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="pb-[76px] md:pb-0">
        <PageLoader />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
