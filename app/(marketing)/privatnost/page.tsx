import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { PRIVACY_PAGE } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: PRIVACY_PAGE.title,
  description: PRIVACY_PAGE.description,
  path: PRIVACY_PAGE.path,
});

export default function PrivacyPage() {
  return (
    <main id="sadrzaj" className="bg-paper-bright">
      <LegalDocument page={PRIVACY_PAGE} />
    </main>
  );
}
