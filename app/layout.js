import "./globals.css";
import { Hind_Siliguri, Anek_Bangla } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const body = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const head = Anek_Bangla({ subsets: ["bengali", "latin"], variable: "--font-head", display: "swap" });

export const metadata = {
  title: "D H Medical Support | প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
  description: "ডাক্তার অ্যাপয়েন্টমেন্ট, অ্যাম্বুলেন্স বুকিং, হাসপাতাল সমন্বয় এবং প্রবাসীদের জন্য DH Family Care মেম্বারশিপ।",
};
export const viewport = { themeColor: "#12347F", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${body.variable} ${head.variable}`}>
      <body className="pb-[76px] md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
