import { CONTROLLER } from "@/content/legal/controller";
import { FAQ, HERO, SITE } from "@/content/landing";
import { OG_IMAGE, absoluteUrl, siteOrigin } from "./site";

export function organizationJsonLd() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CONTROLLER.product,
    legalName: CONTROLLER.legalName,
    alternateName: SITE.name,
    url: origin,
    email: CONTROLLER.email,
    logo: absoluteUrl("/brand/tablio-logo.png"),
    image: absoluteUrl(OG_IMAGE.path),
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTROLLER.streetAddress,
      postalCode: CONTROLLER.postalCode,
      addressLocality: CONTROLLER.addressLocality,
      addressCountry: CONTROLLER.addressCountry,
    },
  };
}

export function softwareApplicationJsonLd() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: HERO.lead,
    url: origin,
    image: absoluteUrl(OG_IMAGE.path),
    email: CONTROLLER.email,
    publisher: {
      "@type": "Organization",
      name: CONTROLLER.legalName,
      email: CONTROLLER.email,
      url: origin,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl("/#pilot"),
    },
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
