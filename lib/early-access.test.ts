import { afterEach, describe, expect, test, vi } from "vitest";
import {
  normalizeInterest,
  submitEarlyAccess,
  validateEarlyAccess,
} from "./early-access";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("normalizeInterest", () => {
  test("accepts handheld and defaults everything else to general", () => {
    expect(normalizeInterest("handheld")).toBe("handheld");
    expect(normalizeInterest("general")).toBe("general");
    expect(normalizeInterest("")).toBe("general");
    expect(normalizeInterest(null)).toBe("general");
  });
});

describe("validateEarlyAccess", () => {
  test("requires a name and a valid email", () => {
    expect(validateEarlyAccess({ name: "", email: "" })).toEqual({
      name: "Unesite ime.",
      email: "Unesite valjanu e-mail adresu.",
    });
    expect(validateEarlyAccess({ name: "Ana", email: "nije-email" })).toEqual({
      email: "Unesite valjanu e-mail adresu.",
    });
    expect(validateEarlyAccess({ name: "Ana", email: "ana@example.com" })).toEqual({});
  });
});

describe("submitEarlyAccess", () => {
  test("does not pretend success when the API URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitEarlyAccess({
      name: "Ana",
      email: "ana@example.com",
      interest: "general",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/nije dostupna/);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("succeeds only after 2xx with a stored-row payload", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api-stage.tablio.hr");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(
      submitEarlyAccess({
        name: "Ana",
        email: "ana@example.com",
        interest: "general",
      }),
    ).resolves.toEqual({ ok: true });
  });

  test("does not treat a 2xx without ok as success", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api-stage.tablio.hr");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ queued: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const result = await submitEarlyAccess({
      name: "Ana",
      email: "ana@example.com",
      interest: "handheld",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(200);
      expect(result.message).toMatch(/nije spremljena/);
    }
  });

  test("surfaces field errors and rate limits without succeeding", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api-stage.tablio.hr");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        new Response(JSON.stringify({ email: ["Unesite valjanu e-mail adresu."] }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const invalid = await submitEarlyAccess({
      name: "Ana",
      email: "ana@example.com",
      interest: "general",
    });
    expect(invalid.ok).toBe(false);
    if (!invalid.ok) {
      expect(invalid.fieldErrors.email).toMatch(/e-mail/i);
    }

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("{}", {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const limited = await submitEarlyAccess({
      name: "Ana",
      email: "ana@example.com",
      interest: "general",
    });
    expect(limited.ok).toBe(false);
    if (!limited.ok) {
      expect(limited.status).toBe(429);
      expect(limited.message).toMatch(/Previše pokušaja/);
    }
  });

  test("reports a network failure without succeeding", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api-stage.tablio.hr");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("failed to fetch")));

    const result = await submitEarlyAccess({
      name: "Ana",
      email: "ana@example.com",
      interest: "general",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(0);
      expect(result.message).toMatch(/Veza s poslužiteljem/);
    }
  });
});
