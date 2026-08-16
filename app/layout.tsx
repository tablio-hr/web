import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import { rootMetadata } from "@/lib/metadata";
import { TURNSTILE_SCRIPT_SRC, turnstileSiteKey } from "@/lib/turnstile";
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
  const siteKey = turnstileSiteKey();
  const nonce = siteKey ? ((await headers()).get("x-nonce") ?? undefined) : undefined;
  return (
    <html lang="hr" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        {siteKey ? (
          <Script src={TURNSTILE_SCRIPT_SRC} strategy="beforeInteractive" nonce={nonce} />
        ) : null}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={softwareApplicationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
