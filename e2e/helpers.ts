import type { Page, Request } from "@playwright/test";

export function cspNonce(csp: string | undefined): string | undefined {
  return csp?.match(/'nonce-([^']+)'/)?.[1];
}

export async function collectCspViolations(page: Page): Promise<string[]> {
  const violations: string[] = [];
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      const bucket = ((window as unknown as { __csp?: string[] }).__csp ??= []);
      bucket.push(`${event.blockedURI} ${event.violatedDirective}`);
    });
  });
  page.on("console", (msg) => {
    if (msg.type() === "error" && /content security policy|csp/i.test(msg.text())) {
      violations.push(msg.text());
    }
  });
  return violations;
}

export async function pageCspViolations(page: Page): Promise<string[]> {
  return page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []);
}

export type MockEarlyAccess = {
  status: number;
  body: unknown;
};

export async function mockEarlyAccess(
  page: Page,
  respond: (request: Request) => MockEarlyAccess | Promise<MockEarlyAccess>,
): Promise<Request[]> {
  const seen: Request[] = [];
  await page.route("**/api/v1/early-access", async (route) => {
    const request = route.request();
    if (request.method() !== "POST") {
      await route.fallback();
      return;
    }
    seen.push(request);
    const { status, body } = await respond(request);
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });
  return seen;
}
