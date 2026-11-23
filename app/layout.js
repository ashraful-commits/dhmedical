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
      <body className="pb-[76px] md:pb-0 relative overflow-x-hidden">
        {/* ── Global Side-Gutter Background Patterns ── */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Left side blobs */}
          <div className="absolute -left-32 top-[10%] h-[380px] w-[280px] rounded-full bg-gradient-to-br from-brand/8 via-care/5 to-transparent blur-3xl" />
          <div className="absolute -left-20 top-[48%] h-[260px] w-[200px] rounded-full bg-gradient-to-tr from-brand/6 to-transparent blur-2xl" />
          <div className="absolute -left-28 bottom-[12%] h-[300px] w-[240px] rounded-full bg-gradient-to-tr from-care/7 via-brand/4 to-transparent blur-3xl" />

          {/* Right side blobs */}
          <div className="absolute -right-32 top-[8%] h-[360px] w-[280px] rounded-full bg-gradient-to-bl from-care/8 via-brand/5 to-transparent blur-3xl" />
          <div className="absolute -right-20 top-[42%] h-[280px] w-[220px] rounded-full bg-gradient-to-tl from-brand/6 to-transparent blur-2xl" />
          <div className="absolute -right-24 bottom-[15%] h-[320px] w-[260px] rounded-full bg-gradient-to-tl from-brand/7 via-care/4 to-transparent blur-3xl" />

          {/* Subtle diagonal line grid overlay on sides */}
          <svg className="absolute left-0 top-0 h-full w-40 opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="leftGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40 L40 0 M-10 10 L10 -10 M30 50 L50 30" stroke="#0F52BA" strokeWidth="0.6" fill="none"/>
                <circle cx="20" cy="20" r="1.2" fill="#0F52BA" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leftGrid)" />
          </svg>
          <svg className="absolute right-0 top-0 h-full w-40 opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="rightGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40 L40 0 M-10 10 L10 -10 M30 50 L50 30" stroke="#FF5E7E" strokeWidth="0.6" fill="none"/>
                <circle cx="20" cy="20" r="1.2" fill="#FF5E7E" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rightGrid)" />
          </svg>

          {/* Left curved wave line */}
          <svg className="absolute left-0 top-0 h-full w-48 opacity-[0.06]" viewBox="0 0 190 1200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M20 0 C80 200, -40 400, 60 600 C150 800, -30 1000, 40 1200" stroke="url(#lWave)" strokeWidth="1.5"/>
            <path d="M50 0 C120 200, 10 400, 100 600 C180 800, 10 1000, 70 1200" stroke="url(#lWave)" strokeWidth="1"/>
            <defs>
              <linearGradient id="lWave" x1="0" y1="0" x2="0" y2="1200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0F52BA" offset="0%"/>
                <stop stopColor="#FF5E7E" offset="50%"/>
                <stop stopColor="#0F52BA" offset="100%"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Right curved wave line */}
          <svg className="absolute right-0 top-0 h-full w-48 opacity-[0.06]" viewBox="0 0 190 1200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M170 0 C110 200, 230 400, 130 600 C40 800, 220 1000, 150 1200" stroke="url(#rWave)" strokeWidth="1.5"/>
            <path d="M140 0 C70 200, 180 400, 90 600 C10 800, 180 1000, 120 1200" stroke="url(#rWave)" strokeWidth="1"/>
            <defs>
              <linearGradient id="rWave" x1="0" y1="0" x2="0" y2="1200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5E7E" offset="0%"/>
                <stop stopColor="#0F52BA" offset="50%"/>
                <stop stopColor="#FF5E7E" offset="100%"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <PageLoader />
        <LanguageProvider>
          <Header />
          <main className="relative z-[1]">{children}</main>
          <Footer />
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
