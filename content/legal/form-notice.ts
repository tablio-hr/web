import { LEGAL_PATHS } from "./controller";
import type { InlineSpan } from "./types";

/**
 * One sentence + link, visible before submit on #pilot.
 * Not a consent checkbox: legal basis is GDPR Art. 6(1)(b).
 */
export const FORM_PRIVACY_NOTICE = {
  requiredBeforeSubmit: true,
  consentCheckbox: false,
  spans: [
    {
      text: "Ime, e-mail i interes obrađujemo kako bismo odgovorili na vašu prijavu za Tablio pilot, uključujući slanje potvrde — pojedinosti su u ",
    },
    { text: "obavijesti o privatnosti", href: LEGAL_PATHS.privacy },
    { text: "." },
  ] satisfies InlineSpan[],
} as const;
