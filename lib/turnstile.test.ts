import { afterEach, describe, expect, test, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("turnstileSiteKey", () => {
  test("trims and returns the public site key", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "  abc  ");
    const { turnstileSiteKey } = await import("./turnstile");
    expect(turnstileSiteKey()).toBe("abc");
  });

  test("returns empty when unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    const { turnstileSiteKey } = await import("./turnstile");
    expect(turnstileSiteKey()).toBe("");
  });
});

describe("assertProductionTurnstile", () => {
  test("allows stage builds without a site key", async () => {
    const { assertProductionTurnstile } = await import("./turnstile");
    expect(() =>
      assertProductionTurnstile({
        NEXT_PUBLIC_SITE_URL: "https://stage.tablio.hr",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
      }),
    ).not.toThrow();
  });

  test("allows production builds when the site key is present", async () => {
    const { assertProductionTurnstile } = await import("./turnstile");
    expect(() =>
      assertProductionTurnstile({
        NEXT_PUBLIC_SITE_URL: "https://tablio.hr",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0xPublicSiteKey",
      }),
    ).not.toThrow();
  });

  test("fails production builds without a site key", async () => {
    const { assertProductionTurnstile } = await import("./turnstile");
    expect(() =>
      assertProductionTurnstile({
        NEXT_PUBLIC_SITE_URL: "https://tablio.hr",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "   ",
      }),
    ).toThrow(/NEXT_PUBLIC_TURNSTILE_SITE_KEY/);
  });
});
