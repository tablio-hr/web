import { afterEach, describe, expect, test, vi } from "vitest";

const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  vi.unstubAllEnvs();
  if (previousSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
  }
  vi.resetModules();
});

async function loadJsonLd() {
  return import("./json-ld");
}

describe("json-ld origins", () => {
  test("stage site URL is used for every Organization and SoftwareApplication URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://stage.tablio.hr");
    const { organizationJsonLd, softwareApplicationJsonLd } = await loadJsonLd();
    const organization = organizationJsonLd();
    const software = softwareApplicationJsonLd();
    expect(organization.url).toBe("https://stage.tablio.hr");
    expect(organization.logo).toBe("https://stage.tablio.hr/brand/tablio-logo.png");
    expect(software.url).toBe("https://stage.tablio.hr");
    expect(software.image).toBe("https://stage.tablio.hr/og.png");
    expect(software.publisher.url).toBe("https://stage.tablio.hr");
    expect(software.offers.url).toBe("https://stage.tablio.hr/#pilot");
  });

  test("production site URL is used for every Organization and SoftwareApplication URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://tablio.hr");
    const { organizationJsonLd, softwareApplicationJsonLd } = await loadJsonLd();
    const organization = organizationJsonLd();
    const software = softwareApplicationJsonLd();
    expect(organization.url).toBe("https://tablio.hr");
    expect(organization.logo).toBe("https://tablio.hr/brand/tablio-logo.png");
    expect(software.url).toBe("https://tablio.hr");
    expect(software.image).toBe("https://tablio.hr/og.png");
    expect(software.publisher.url).toBe("https://tablio.hr");
    expect(software.offers.url).toBe("https://tablio.hr/#pilot");
  });
});
