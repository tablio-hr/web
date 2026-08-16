import { expect, test } from "@playwright/test";
import { STAGE_ORIGIN } from "../lib/site";
import { collectCspViolations, cspNonce, pageCspViolations } from "./helpers";

test.describe("seo and nonce CSP", () => {
  test("JSON-LD and framework scripts use the request nonce without CSP errors", async ({
    page,
  }) => {
    const consoleCsp = await collectCspViolations(page);
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();

    const nonce = cspNonce(response?.headers()["content-security-policy"]);
    expect(nonce).toBeTruthy();

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(3);
    const payloads = await jsonLd.allTextContents();
    const parsed = payloads.map((text) => JSON.parse(text) as Record<string, unknown>);
    const organization = parsed.find((item) => item["@type"] === "Organization");
    const software = parsed.find((item) => item["@type"] === "SoftwareApplication");
    expect(organization?.url).toBe(STAGE_ORIGIN);
    expect(organization?.logo).toBe(`${STAGE_ORIGIN}/brand/tablio-logo.png`);
    expect(software?.url).toBe(STAGE_ORIGIN);
    expect(software?.image).toBe(`${STAGE_ORIGIN}/og.png`);
    expect((software?.publisher as { url?: string } | undefined)?.url).toBe(STAGE_ORIGIN);
    expect((software?.offers as { url?: string } | undefined)?.url).toBe(`${STAGE_ORIGIN}/#pilot`);

    const html = await response?.text();
    expect(html).toMatch(
      new RegExp(`<script[^>]+src="[^"]*_next[^"]+"[^>]*nonce="${nonce}"`),
    );

    expect(await pageCspViolations(page)).toEqual([]);
    expect(consoleCsp).toEqual([]);
  });
});
