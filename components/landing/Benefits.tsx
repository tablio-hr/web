import { BENEFIT_ICONS } from "@/components/ui/Icons";
import { BENEFITS } from "@/content/landing";

export function Benefits() {
  return (
    <section id={BENEFITS.id} className="section-anchor border-b border-line bg-paper">
      <h2 className="sr-only">Prednosti</h2>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {BENEFITS.items.map((item, index) => {
          const Icon = BENEFIT_ICONS[index];
          return (
            <article key={item.title} className="space-y-3">
              <Icon className="h-7 w-7 text-orange-dark" />
              <h3 className="text-base font-bold text-navy">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
