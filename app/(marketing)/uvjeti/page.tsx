import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { TERMS_PAGE } from "@/content/legal";

export const metadata: Metadata = {
  title: `${TERMS_PAGE.title} · Tablio`,
  description: TERMS_PAGE.description,
};

export default function TermsPage() {
  return (
    <main id="sadrzaj" className="bg-paper-bright">
      <LegalDocument page={TERMS_PAGE} />
    </main>
  );
}
