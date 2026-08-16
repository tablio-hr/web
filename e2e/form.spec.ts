import { expect, test } from "@playwright/test";
import { PILOT } from "../content/landing";
import { mockEarlyAccess } from "./helpers";

test.describe("early-access form", () => {
  test("does not show success until the API stores the row", async ({ page }) => {
    const seen = await mockEarlyAccess(page, () => ({
      status: 500,
      body: { detail: "Spremanje nije uspjelo." },
    }));

    await page.goto("/#pilot");
    await page.getByLabel(PILOT.fields.name).fill("Ana Horvat");
    await page.getByLabel(PILOT.fields.email).fill("ana@example.com");
    await page.locator("form").getByRole("button", { name: PILOT.submit }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText("Spremanje nije uspjelo.");
    await expect(page.getByRole("heading", { name: PILOT.successTitle })).toHaveCount(0);
    expect(seen).toHaveLength(1);
  });

  test("replaces the form with confirmation after 2xx + ok", async ({ page }) => {
    const seen = await mockEarlyAccess(page, () => ({
      status: 201,
      body: { ok: true },
    }));

    await page.goto("/#pilot");
    await page.getByLabel(PILOT.fields.name).fill("Ana Horvat");
    await page.getByLabel(PILOT.fields.email).fill("ana@example.com");
    await page.locator("form").getByRole("button", { name: PILOT.submit }).click();

    await expect(page.getByRole("heading", { name: PILOT.successTitle })).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
    expect(JSON.parse(seen[0].postData() ?? "{}")).toMatchObject({
      name: "Ana Horvat",
      email: "ana@example.com",
      interest: "general",
    });
    expect(JSON.parse(seen[0].postData() ?? "{}")).not.toHaveProperty("turnstile_token");
  });

  test("client validation does not call the API", async ({ page }) => {
    const seen = await mockEarlyAccess(page, () => ({
      status: 200,
      body: { ok: true },
    }));

    await page.goto("/#pilot");
    await page.locator("form").getByRole("button", { name: PILOT.submit }).click();

    await expect(page.getByText(PILOT.errors.name)).toBeVisible();
    await expect(page.getByRole("heading", { name: PILOT.successTitle })).toHaveCount(0);
    expect(seen).toHaveLength(0);
  });

  test("handheld CTA submits interest=handheld", async ({ page }) => {
    const seen = await mockEarlyAccess(page, () => ({
      status: 200,
      body: { ok: true },
    }));

    await page.goto("/?interest=handheld#pilot");
    await page.getByLabel(PILOT.fields.name).fill("Iva");
    await page.getByLabel(PILOT.fields.email).fill("iva@example.com");
    await page.locator("form").getByRole("button", { name: PILOT.submit }).click();

    await expect(page.getByRole("heading", { name: PILOT.successTitle })).toBeVisible();
    expect(JSON.parse(seen[0].postData() ?? "{}").interest).toBe("handheld");
  });
});
