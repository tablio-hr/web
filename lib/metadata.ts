import type { Metadata } from "next";
import { HERO, SITE } from "@/content/landing";
import { OG_IMAGE, absoluteUrl, canonicalUrl, isProductionSite, robotsDirective, siteOrigin } from "./site";

export const SITE_TITLE = `${SITE.name} — ${SITE.tagline}`;

function openGraphImage() {
  return [
    {
      url: OG_IMAGE.path,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      alt: OG_IMAGE.alt,
    },
  ];
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteOrigin()),
    title: {
      default: SITE_TITLE,
      template: `%s · ${SITE.name}`,
    },
    description: HERO.lead,
    applicationName: SITE.name,
    robots: robotsDirective(),
    alternates: {
      canonical: canonicalUrl("/"),
    },
    openGraph: {
      type: "website",
      locale: "hr_HR",
      siteName: SITE.name,
      title: SITE_TITLE,
      description: HERO.lead,
      url: isProductionSite() ? canonicalUrl("/") : absoluteUrl("/"),
      images: openGraphImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: HERO.lead,
      images: [OG_IMAGE.path],
    },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
  };
}

export function pageMetadata(input: { title: string; description: string; path: string }): Metadata {
  const canonical = canonicalUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical ?? absoluteUrl(input.path),
      images: openGraphImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [OG_IMAGE.path],
    },
  };
}
