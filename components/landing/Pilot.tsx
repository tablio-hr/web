import { Suspense } from "react";
import { FocusPilotHeading } from "@/components/landing/FocusPilotHeading";
import { PilotForm } from "@/components/landing/PilotForm";
import { PILOT } from "@/content/landing";
import { turnstileSiteKey } from "@/lib/turnstile";

export function Pilot() {
  const siteKey = turnstileSiteKey();
  return (
    <section id={PILOT.id} className="section-anchor bg-paper-bright">
      <FocusPilotHeading />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="inline-block border border-orange bg-paper px-3 py-1 text-sm font-bold text-navy">
            {PILOT.badge}
          </p>
          <h2
            id="pilot-heading"
            tabIndex={-1}
            className="mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl"
          >
            {PILOT.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{PILOT.lead}</p>
          <p className="mt-6 text-sm font-bold text-navy">{PILOT.partnersIntro}</p>
          <ul className="mt-3 space-y-2">
            {PILOT.partners.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-navy">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted">
            {PILOT.terms.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-orange-dark">
            {PILOT.heading}
          </p>
          <Suspense fallback={<div className="min-h-72 border border-line bg-paper" />}>
            <PilotForm turnstileSiteKey={siteKey} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
