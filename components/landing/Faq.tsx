import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/content/landing";
import { faqPageJsonLd } from "@/lib/json-ld";

export function Faq() {
  return (
    <section id={FAQ.id} className="section-anchor bg-paper">
      <JsonLd data={faqPageJsonLd()} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {FAQ.title}
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQ.items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none text-lg font-bold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span aria-hidden="true" className="text-orange-dark group-open:hidden">
                    +
                  </span>
                  <span aria-hidden="true" className="hidden text-orange-dark group-open:inline">
                    −
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
