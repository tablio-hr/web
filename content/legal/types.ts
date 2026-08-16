export type InlineSpan = {
  text: string;
  href?: string;
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: InlineSpan[][];
  bullets?: InlineSpan[][];
};

export type LegalPage = {
  path: string;
  title: string;
  description: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  intro: InlineSpan[][];
  sections: LegalSection[];
};
