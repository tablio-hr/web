import type { Metadata } from "next";
import { Audience } from "@/components/landing/Audience";
import { Benefits } from "@/components/landing/Benefits";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { Faq } from "@/components/landing/Faq";
import { Flow } from "@/components/landing/Flow";
import { Handheld } from "@/components/landing/Handheld";
import { Hero } from "@/components/landing/Hero";
import { Pilot } from "@/components/landing/Pilot";
import { Platform } from "@/components/landing/Platform";
import { Reliability } from "@/components/landing/Reliability";
import { HERO } from "@/content/landing";
import { SITE_TITLE, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: SITE_TITLE,
    description: HERO.lead,
    path: "/",
  }),
  title: { absolute: SITE_TITLE },
};

export default function Home() {
  return (
    <main id="sadrzaj">
      <Hero />
      <Benefits />
      <Platform />
      <Handheld />
      <Reliability />
      <Flow />
      <Audience />
      <Pilot />
      <Faq />
      <ClosingCta />
    </main>
  );
}
