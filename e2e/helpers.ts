import type { Page, Request } from "@playwright/test";

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
