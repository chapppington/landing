import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ForumNavbar from "@/components/ForumNavbar";
import CustomScrollbar from "@/components/CustomScrollbar";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VII Встреча главных энергетиков Сибири | СибКомплект",
  description: "VII Встреча главных энергетиков Сибири. 24 апреля 2026 года, г. Барнаул. Ключевое отраслевое событие года.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <BackgroundGradient />
          <CustomScrollbar />
          <ForumNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
