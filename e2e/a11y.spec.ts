import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { PILOT } from "../content/landing";

async function expectNoAxeViolations(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}

test.describe("accessibility smoke", () => {
  test("home has landmarks, one form, and no axe violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "hr");
    await expect(page.getByRole("link", { name: "Preskoči na sadržaj" })).toBeAttached();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(1);
    await expect(page.getByLabel(PILOT.fields.name)).toBeVisible();
    await expect(page.getByLabel(PILOT.fields.email)).toBeVisible();
    await expect(page.getByRole("link", { name: "obavijesti o privatnosti" })).toBeVisible();
    await expectNoAxeViolations(page);
  });

  test("legal pages have a heading and no axe violations", async ({ page }) => {
    for (const path of ["/privatnost", "/uvjeti"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expectNoAxeViolations(page);
    }
  });

  test("mobile menu exposes expanded state and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Otvori izbornik" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(page.getByRole("button", { name: "Zatvori izbornik" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(page.getByRole("navigation", { name: "Mobilna" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Otvori izbornik" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(page.getByRole("navigation", { name: "Mobilna" })).toHaveCount(0);
  });
});
