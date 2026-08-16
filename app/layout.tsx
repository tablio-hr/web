import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = rootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Intentional: per-request nonce CSP in proxy.ts only applies on dynamic
  // renders. This does not restore static generation.
  await connection();
  return (
    <html lang="hr" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={softwareApplicationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
