import Image from "next/image";
import { PilotLink } from "@/components/landing/PilotLink";
import { CTA, HANDHELD } from "@/content/landing";

export function Handheld() {
  return (
    <section id={HANDHELD.id} className="section-anchor bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="/photos/handheld-service.jpg"
            alt={HANDHELD.photoAlt}
            width={1536}
            height={1024}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 36rem, 100vw"
          />
          <div className="absolute right-4 bottom-4 w-40 rounded-md bg-paper-bright/95 p-3 text-navy shadow-sm sm:w-48">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-orange-dark">
              Planirani handheld
            </p>
            <p className="mt-2 text-sm font-semibold">Narudžba · račun · kartica</p>
            <div className="mt-3 h-8 rounded-sm border border-dashed border-navy/30 bg-paper" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {HANDHELD.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{HANDHELD.lead}</p>
          <ul className="mt-6 space-y-2">
            {HANDHELD.points.map((point) => (
              <li key={point} className="flex gap-3 text-base text-navy">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted">{HANDHELD.finePrint}</p>
          <PilotLink
            interest="handheld"
            className="mt-7 inline-flex items-center justify-center rounded-sm bg-orange px-5 py-3 text-base font-bold text-navy hover:bg-orange-dark"
          >
            {CTA.handheld}
          </PilotLink>
        </div>
      </div>
    </section>
  );
}
