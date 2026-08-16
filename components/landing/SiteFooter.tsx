import { Logo } from "@/components/brand/Logo";
import { CONTROLLER } from "@/content/legal/controller";
import { FOOTER } from "@/content/landing";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="max-w-sm text-base font-medium text-paper">{FOOTER.tagline}</p>
          <p className="text-sm text-paper/80">{FOOTER.productLine}</p>
        </div>
        <div className="space-y-5">
          <nav aria-label="Podnožje">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="text-sm font-semibold text-paper underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            <a
              href={CONTROLLER.mailto}
              className="font-semibold text-paper underline decoration-orange underline-offset-4"
            >
              {CONTROLLER.email}
            </a>
          </p>
          <p className="text-sm text-paper/80">{FOOTER.address}</p>
          <p className="text-sm text-paper/70">{FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
