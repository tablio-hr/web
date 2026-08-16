import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Tablio",
  description: "Povezana platforma za hrvatsko ugostiteljstvo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="hr" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased`}>{children}</body>
    </html>
  );
}
