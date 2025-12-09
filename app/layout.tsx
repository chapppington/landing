import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ForumNavbar from "@/components/ForumNavbar";
import CustomScrollbar from "@/components/CustomScrollbar";
import ReactLenis from "lenis/react";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VII Встреча главных энергетиков Сибири | СибКомплект",
  description: "VII Встреча главных энергетиков Сибири. 24 апреля 2026 года, г. Барнаул. Ключевое отраслевое событие года.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <ReactLenis
          root
          options={{
            lerp: 0.16,
            wheelMultiplier: 1,
            smoothWheel: true,
            orientation: "vertical",
            gestureOrientation: "vertical",
            infinite: false,
            syncTouch: true,
          }}
        >
          <CustomScrollbar />
          <ForumNavbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
