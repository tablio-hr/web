import type { MetadataRoute } from "next";
import { PRODUCTION_ORIGIN, isProductionSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PRODUCTION_ORIGIN}/sitemap.xml`,
    host: PRODUCTION_ORIGIN,
  };
}
