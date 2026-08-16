import { PRODUCTION_API_ORIGIN, STAGE_API_ORIGIN, isProductionSite } from "./site";

const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";

export function contentSecurityPolicy(nonce: string, isDev = process.env.NODE_ENV === "development"): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    TURNSTILE_ORIGIN,
    isDev ? "'unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self' ${STAGE_API_ORIGIN} ${PRODUCTION_API_ORIGIN} ${TURNSTILE_ORIGIN}`,
    `frame-src ${TURNSTILE_ORIGIN}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
  if (!isDev) {
    directives.push("upgrade-insecure-requests");
  }
  return directives.join("; ");
}

export function securityHeaders(nonce?: string): { key: string; value: string }[] {
  const headers = [
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ];
  if (nonce) {
    headers.push({ key: "Content-Security-Policy", value: contentSecurityPolicy(nonce) });
  }
  if (!isProductionSite()) {
    headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  }
  return headers;
}

export function applyHeaders(target: Headers, nonce?: string): void {
  for (const header of securityHeaders(nonce)) {
    target.set(header.key, header.value);
  }
}
