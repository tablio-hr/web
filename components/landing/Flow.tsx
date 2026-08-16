import { FLOW } from "@/content/landing";

export function Flow() {
  return (
    <section id={FLOW.id} className="section-anchor bg-paper-bright">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {FLOW.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{FLOW.lead}</p>
        <ol className="mt-10 grid gap-0 sm:grid-cols-5">
          {FLOW.steps.map((step, index) => (
            <li
              key={step}
              className="flow-step relative border-t border-line py-5 pr-4 sm:border-t-0 sm:border-l sm:pl-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-dark">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-base font-semibold text-navy">{step}</p>
            </li>
          ))}
        </ol>
        <aside className="mt-10 max-w-2xl border border-line bg-paper p-5">
          <h3 className="text-lg font-bold text-navy">{FLOW.openTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{FLOW.openBody}</p>
        </aside>
      </div>
    </section>
  );
}
