import { expect, test } from "@playwright/test";
import { PILOT } from "../content/landing";
import { collectCspViolations, cspNonce, mockEarlyAccess, pageCspViolations } from "./helpers";

const keyed = Boolean(process.env.E2E_TURNSTILE);

test.describe("Turnstile widget", () => {
  test.skip(!keyed, "requires a keyed Playwright build (E2E_TURNSTILE=1)");

  test("loads the challenge without CSP blocking the script or iframe", async ({ page }) => {
    const consoleCsp = await collectCspViolations(page);
    const response = await page.goto("/#pilot");
    const nonce = cspNonce(response?.headers()["content-security-policy"]);
    expect(nonce).toBeTruthy();

    const html = await response?.text();
    expect(html).toContain("challenges.cloudflare.com/turnstile/v0/api.js");
    expect(html).toContain(`nonce="${nonce}"`);

    await expect(page.getByTestId("turnstile")).toBeAttached();
    await expect(page.locator("iframe[src*='challenges.cloudflare.com']")).toBeVisible({
      timeout: 20_000,
    });

    expect(
      (await pageCspViolations(page)).filter((item) => item.includes("challenges.cloudflare.com")),
    ).toEqual([]);
    expect(consoleCsp.filter((item) => /challenges\.cloudflare\.com/i.test(item))).toEqual([]);
  });

  test("submits turnstile_token after the challenge succeeds", async ({ page }) => {
    const seen = await mockEarlyAccess(page, () => ({
      status: 200,
      body: { ok: true },
    }));

    await page.goto("/#pilot");
    await expect(page.locator("iframe[src*='challenges.cloudflare.com']")).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.locator('textarea[name="cf-turnstile-response"]')).toHaveValue(/.+/, {
      timeout: 20_000,
    });

    await page.getByLabel(PILOT.fields.name).fill("Ana Horvat");
    await page.getByLabel(PILOT.fields.email).fill("ana@example.com");
    await page.locator("form").getByRole("button", { name: PILOT.submit }).click();

    await expect(page.getByRole("heading", { name: PILOT.successTitle })).toBeVisible();
    expect(JSON.parse(seen[0].postData() ?? "{}").turnstile_token).toMatch(/\S/);
  });
});
