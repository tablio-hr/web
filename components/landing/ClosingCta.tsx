import { PilotLink } from "@/components/landing/PilotLink";
import { CLOSING, CTA } from "@/content/landing";

export function ClosingCta() {
  return (
    <section className="bg-paper-bright">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {CLOSING.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">{CLOSING.lead}</p>
        <PilotLink className="mt-8 inline-flex items-center justify-center rounded-sm bg-orange px-6 py-3 text-base font-bold text-navy hover:bg-orange-dark">
          {CTA.earlyAccess}
        </PilotLink>
      </div>
    </section>
  );
}
