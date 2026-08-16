import type { MetadataRoute } from "next";
import { LEGAL_LAST_UPDATED } from "@/content/legal/controller";
import { INDEXABLE_PATHS, PRODUCTION_ORIGIN, isProductionSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) {
    return [];
  }

  return INDEXABLE_PATHS.map((path) => ({
    url: new URL(path, PRODUCTION_ORIGIN).toString(),
    lastModified: LEGAL_LAST_UPDATED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.4,
  }));
}
