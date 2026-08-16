export type Interest = "general" | "handheld";

export type EarlyAccessPayload = {
  name: string;
  email: string;
  interest: Interest;
  website?: string;
  turnstile_token?: string;
};

export type EarlyAccessResult =
  | { ok: true }
  | { ok: false; status: number; fieldErrors: Record<string, string>; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function apiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
}

export function normalizeInterest(value: string | null | undefined): Interest {
  return value === "handheld" ? "handheld" : "general";
}

export function validateEarlyAccess(input: {
  name: string;
  email: string;
}): { name?: string; email?: string } {
  const errors: { name?: string; email?: string } = {};
  if (!input.name.trim()) {
    errors.name = "Unesite ime.";
  }
  const email = input.email.trim();
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Unesite valjanu e-mail adresu.";
  }
  return errors;
}

function firstError(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return firstError(value[0]);
  }
  return undefined;
}

function parseFieldErrors(body: unknown): Record<string, string> {
  if (!body || typeof body !== "object") {
    return {};
  }
  const record = body as Record<string, unknown>;
  const source =
    record.errors && typeof record.errors === "object"
      ? (record.errors as Record<string, unknown>)
      : record;
  const out: Record<string, string> = {};
  for (const key of ["name", "email", "interest", "turnstile_token", "detail", "non_field_errors"]) {
    const message = firstError(source[key]);
    if (message) {
      out[key] = message;
    }
  }
  return out;
}

export async function submitEarlyAccess(
  payload: EarlyAccessPayload,
): Promise<EarlyAccessResult> {
  const base = apiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 0,
      fieldErrors: {},
      message:
        "Prijava trenutačno nije dostupna. Pokušajte kasnije ili pišite na info@tablio.hr.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${base}/api/v1/early-access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      fieldErrors: {},
      message: "Veza s poslužiteljem nije uspjela. Pokušajte ponovno.",
    };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.ok && body && typeof body === "object" && "ok" in body && (body as { ok: unknown }).ok === true) {
    return { ok: true };
  }

  if (response.status === 429) {
    return {
      ok: false,
      status: 429,
      fieldErrors: {},
      message: "Previše pokušaja. Pričekajte i pokušajte ponovno.",
    };
  }

  const fieldErrors = parseFieldErrors(body);
  return {
    ok: false,
    status: response.status,
    fieldErrors,
    message:
      fieldErrors.detail ??
      fieldErrors.non_field_errors ??
      fieldErrors.turnstile_token ??
      "Prijava nije spremljena. Provjerite podatke i pokušajte ponovno.",
  };
}
