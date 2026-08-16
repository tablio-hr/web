import { InlineSpans } from "@/components/ui/InlineSpans";
import type { LegalPage } from "@/content/legal/types";

export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm text-muted">Zadnje ažuriranje: {page.lastUpdatedLabel}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy">{page.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{page.description}</p>
      <div className="mt-8 space-y-4">
        {page.intro.map((spans, index) => (
          <p key={index} className="leading-relaxed text-navy">
            <InlineSpans spans={spans} />
          </p>
        ))}
      </div>
      {page.sections.map((section) => (
        <section key={section.id} id={section.id} className="section-anchor mt-10">
          <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
          <div className="mt-4 space-y-3">
            {section.paragraphs.map((spans, index) => (
              <p key={index} className="leading-relaxed text-navy">
                <InlineSpans spans={spans} />
              </p>
            ))}
          </div>
          {section.bullets ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-navy">
              {section.bullets.map((spans, index) => (
                <li key={index}>
                  <InlineSpans spans={spans} />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
