import { RELIABILITY } from "@/content/landing";

export function Reliability() {
  return (
    <section id={RELIABILITY.id} className="section-anchor bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          {RELIABILITY.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/85">{RELIABILITY.lead}</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {RELIABILITY.steps.map((step, index) => (
            <li key={step.title} className="border border-white/15 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">
                Korak {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/80">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="border border-white/15 p-5">
            <h3 className="text-xl font-bold">{RELIABILITY.roamkitTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/80">{RELIABILITY.roamkitBody}</p>
          </div>
          <ReliabilityDiagram />
        </div>
      </div>
    </section>
  );
}

function ReliabilityDiagram() {
  return (
    <svg viewBox="0 0 520 180" className="h-auto w-full" role="img">
      <title>POS i handheld povezani s oblakom preko primarnog interneta i rezervnog RoamKita</title>
      <rect x="8" y="58" width="110" height="64" rx="6" fill="#001536" stroke="#f86000" />
      <text x="63" y="95" textAnchor="middle" fill="#f7f3ec" fontSize="14" fontWeight="700">
        POS
      </text>
      <rect x="132" y="58" width="110" height="64" rx="6" fill="#001536" stroke="#f86000" />
      <text x="187" y="95" textAnchor="middle" fill="#f7f3ec" fontSize="14" fontWeight="700">
        Handheld
      </text>
      <path d="M242 90 H300" stroke="#f7f3ec" strokeWidth="2" />
      <ellipse cx="360" cy="90" rx="46" ry="28" fill="#001536" stroke="#f7f3ec" />
      <text x="360" y="95" textAnchor="middle" fill="#f7f3ec" fontSize="13" fontWeight="700">
        Oblak
      </text>
      <path d="M406 78 H470" stroke="#f7f3ec" strokeWidth="2" />
      <path d="M406 102 H470" stroke="#f86000" strokeWidth="2" strokeDasharray="6 5" />
      <text x="496" y="74" textAnchor="middle" fill="#f7f3ec" fontSize="11">
        Internet
      </text>
      <text x="496" y="112" textAnchor="middle" fill="#f86000" fontSize="11">
        RoamKit
      </text>
    </svg>
  );
}
