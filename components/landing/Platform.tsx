import { PLATFORM_ICONS } from "@/components/ui/Icons";
import { PLATFORM } from "@/content/landing";

export function Platform() {
  return (
    <section id={PLATFORM.id} className="section-anchor bg-paper-bright">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {PLATFORM.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{PLATFORM.lead}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM.cards.map((card, index) => {
            const Icon = PLATFORM_ICONS[index];
            return (
              <li
                key={card.title}
                className="border border-line bg-paper px-4 py-5 transition-[border-color] hover:border-orange"
              >
                <Icon className="h-6 w-6 text-orange-dark" />
                <h3 className="mt-4 text-base font-bold text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
