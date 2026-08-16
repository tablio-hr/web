import Image from "next/image";
import { AUDIENCE } from "@/content/landing";

export function Audience() {
  return (
    <section id={AUDIENCE.id} className="section-anchor bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {AUDIENCE.title}
        </h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {AUDIENCE.cards.map((card) => (
            <li key={card.title} className="overflow-hidden border border-line bg-paper-bright">
              <Image
                src={card.image}
                alt={card.alt}
                width={1536}
                height={1024}
                className="h-52 w-full object-cover"
                sizes="(min-width: 1024px) 20rem, 100vw"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">{AUDIENCE.lead}</p>
      </div>
    </section>
  );
}
