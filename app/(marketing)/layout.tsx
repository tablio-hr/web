import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#sadrzaj" className="skip-link">
        Preskoči na sadržaj
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
