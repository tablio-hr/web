import type { InlineSpan, LegalPage } from "./types";

export function plainSpans(spans: readonly InlineSpan[]): string {
  return spans.map((span) => span.text).join("");
}

export function plainPage(page: LegalPage): string {
  const parts = [page.title, page.description, ...page.intro.map(plainSpans)];
  for (const section of page.sections) {
    parts.push(section.title);
    for (const paragraph of section.paragraphs) {
      parts.push(plainSpans(paragraph));
    }
    for (const item of section.bullets ?? []) {
      parts.push(plainSpans(item));
    }
  }
  return parts.join("\n");
}
