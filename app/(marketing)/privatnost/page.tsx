import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PRIVACY_PAGE } from "@/content/legal";

export const metadata: Metadata = {
  title: `${PRIVACY_PAGE.title} · Tablio`,
  description: PRIVACY_PAGE.description,
};

export default function PrivacyPage() {
  return (
    <main id="sadrzaj" className="bg-paper-bright">
      <LegalDocument page={PRIVACY_PAGE} />
    </main>
  );
}
