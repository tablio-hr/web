import { DeviceCluster } from "@/components/landing/DeviceCluster";
import { PilotLink } from "@/components/landing/PilotLink";
import { CTA, HERO } from "@/content/landing";

export function Hero() {
  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            {HERO.eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {HERO.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/90">{HERO.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PilotLink className="inline-flex items-center justify-center rounded-sm bg-orange px-5 py-3 text-base font-bold text-navy hover:bg-orange-dark">
              {CTA.earlyAccess}
            </PilotLink>
            <a
              href="#platforma"
              className="inline-flex items-center justify-center rounded-sm border border-paper/40 px-5 py-3 text-base font-bold text-paper hover:border-paper"
            >
              {CTA.explore}
            </a>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/75">{HERO.note}</p>
        </div>
        <DeviceCluster />
      </div>
    </section>
  );
}
