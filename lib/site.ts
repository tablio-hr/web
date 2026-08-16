export const PRODUCTION_ORIGIN = "https://tablio.hr";
export const STAGE_ORIGIN = "https://stage.tablio.hr";
export const PRODUCTION_HOST = "tablio.hr";
export const STAGE_HOST = "stage.tablio.hr";
export const WWW_HOST = "www.tablio.hr";

export const PRODUCTION_API_ORIGIN = "https://api.tablio.hr";
export const STAGE_API_ORIGIN = "https://api-stage.tablio.hr";

export const OG_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  alt: "Tablio — povezana platforma za hrvatsko ugostiteljstvo",
} as const;

export const INDEXABLE_PATHS = ["/", "/privatnost", "/uvjeti"] as const;

function trimOrigin(value: string | undefined): string {
  return (value ?? "").replace(/\/$/, "");
}

export function siteOrigin(): string {
  const raw = trimOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (raw === PRODUCTION_ORIGIN || raw === STAGE_ORIGIN) {
    return raw;
  }
  return STAGE_ORIGIN;
}

export function isProductionSite(): boolean {
  return siteOrigin() === PRODUCTION_ORIGIN;
}

export function canonicalUrl(path = "/"): string | undefined {
  if (!isProductionSite()) {
    return undefined;
  }
  return new URL(path, PRODUCTION_ORIGIN).toString();
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteOrigin()).toString();
}

export function robotsDirective(): {
  index: boolean;
  follow: boolean;
  nocache?: boolean;
} {
  if (isProductionSite()) {
    return { index: true, follow: true };
  }
  return { index: false, follow: false, nocache: true };
}
