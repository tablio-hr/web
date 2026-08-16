import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { TERMS_PAGE } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: TERMS_PAGE.title,
  description: TERMS_PAGE.description,
  path: TERMS_PAGE.path,
});

export default function TermsPage() {
  return (
    <main id="sadrzaj" className="bg-paper-bright">
      <LegalDocument page={TERMS_PAGE} />
    </main>
  );
}
