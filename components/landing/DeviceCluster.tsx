function Screen({
  title,
  rows,
  wide = false,
}: {
  title: string;
  rows: string[];
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-md bg-[#f4efe6] p-3 text-navy shadow-inner ${wide ? "min-h-36" : "min-h-40"}`}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-orange-dark">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <li key={row} className="flex items-center gap-2 text-[0.7rem] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeviceCluster() {
  return (
    <div className="relative">
      <p className="sr-only">Ilustracija planiranog sučelja na prijenosniku, POS-u i handheldu.</p>
      <div aria-hidden="true">
        <div className="absolute inset-x-8 top-1/2 hidden h-px bg-orange/50 lg:block" />
        <div className="relative grid gap-4 sm:grid-cols-3">
          <figure className="rounded-xl border border-white/15 bg-navy-deep p-3">
            <div className="mb-2 h-2 w-10 rounded-full bg-white/20" />
            <Screen
              wide
              title="Nadzor"
              rows={["Promet smjene", "Otvoreni stolovi", "Čekanja u kuhinji"]}
            />
          </figure>
          <figure className="rounded-xl border border-white/15 bg-navy-deep p-3 sm:translate-y-4">
            <div className="mb-2 flex justify-center">
              <span className="h-1.5 w-8 rounded-full bg-white/25" />
            </div>
            <Screen title="POS" rows={["Stol 12", "2× espresso", "Račun u pripremi"]} />
          </figure>
          <figure className="mx-auto w-40 rounded-2xl border border-white/15 bg-navy-deep p-2 sm:w-auto sm:translate-y-2">
            <div className="mb-2 flex justify-center">
              <span className="h-1 w-8 rounded-full bg-white/25" />
            </div>
            <Screen title="Handheld" rows={["Kartica", "Iznos 18,40 €", "Potvrda"]} />
          </figure>
        </div>
      </div>
    </div>
  );
}
