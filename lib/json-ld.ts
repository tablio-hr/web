import { CONTROLLER } from "@/content/legal/controller";
import { FAQ, HERO, SITE } from "@/content/landing";
import { OG_IMAGE, PRODUCTION_ORIGIN } from "./site";

const logoUrl = new URL("/brand/tablio-logo.png", PRODUCTION_ORIGIN).toString();
const imageUrl = new URL(OG_IMAGE.path, PRODUCTION_ORIGIN).toString();

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CONTROLLER.product,
    legalName: CONTROLLER.legalName,
    alternateName: SITE.name,
    url: PRODUCTION_ORIGIN,
    email: CONTROLLER.email,
    logo: logoUrl,
    image: imageUrl,
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
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: HERO.lead,
    url: PRODUCTION_ORIGIN,
    image: imageUrl,
    email: CONTROLLER.email,
    publisher: {
      "@type": "Organization",
      name: CONTROLLER.legalName,
      email: CONTROLLER.email,
      url: PRODUCTION_ORIGIN,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      url: `${PRODUCTION_ORIGIN}/#pilot`,
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
