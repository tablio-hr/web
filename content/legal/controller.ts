/** Controller identity shown on /privatnost, /uvjeti, footer, and JSON-LD. */
export const CONTROLLER = {
  legalName: "FINE STAR d.o.o.",
  product: "Tablio",
  streetAddress: "Bana Josipa Jelačića 58",
  postalCode: "22000",
  addressLocality: "Šibenik",
  addressCountry: "HR",
  email: "info@tablio.hr",
  mailto: "mailto:info@tablio.hr",
} as const;

export const LEGAL_PATHS = {
  privacy: "/privatnost",
  terms: "/uvjeti",
} as const;

export const LEGAL_LAST_UPDATED = "2026-08-16";
export const LEGAL_LAST_UPDATED_LABEL = "16. kolovoza 2026.";
