import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingSidebar from "@/components/FloatingSidebar";
import ScrollProgress from "@/components/ScrollProgress";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "서울미즈병원 노승형과장 | 성형외과 전문의",
  description:
    "서울미즈병원 노승형과장 성형외과 전문의. 눈성형, 코성형, 가슴성형, 동안성형 등 맞춤 프리미엄 성형 상담.",
  keywords: [
    "노승형",
    "서울미즈병원",
    "성형외과",
    "눈성형",
    "코성형",
    "가슴성형",
    "동안성형",
  ],
  openGraph: {
    title: "서울미즈병원 노승형과장 | 성형외과 전문의",
    description:
      "서울미즈병원 노승형과장 성형외과 전문의. 프리미엄 맞춤 성형 상담.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${playfairDisplay.variable}`}
    >
      <body className={`${notoSansKR.className} bg-white text-charcoal antialiased`}>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <FloatingSidebar />
      </body>
    </html>
  );
}
