import { WWW_HOST } from "./site";

export const INTERNAL_HOSTS = frozenset(["127.0.0.1", "localhost", "[::1]", "::1"]);
export const HEALTH_PATH = "/health";
const STATIC_ASSET = /\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/i;

function frozenset(values: string[]): ReadonlySet<string> {
  return new Set(values);
}

function isPrivateLanHost(host: string): boolean {
  return (
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host) ||
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host)
  );
}

export function requestHost(header: string | null | undefined): string {
  return (header ?? "").split(":")[0].toLowerCase();
}

export function servedHost(): string {
  return (process.env.TABLIO_WEB_HOST ?? "").split(":")[0].toLowerCase();
}

/** Unknown or cross-environment host → 400. www is never a served surface. */
export function isAllowedHost(host: string, path: string, configuredHost = servedHost()): boolean {
  if (path === HEALTH_PATH && INTERNAL_HOSTS.has(host)) {
    return true;
  }
  // next/image fetches /public files internally without a Host header.
  if (STATIC_ASSET.test(path) && (!host || INTERNAL_HOSTS.has(host) || isPrivateLanHost(host))) {
    return true;
  }
  if (!host || host === WWW_HOST) {
    return false;
  }
  if (INTERNAL_HOSTS.has(host)) {
    return true;
  }
  if (process.env.NODE_ENV !== "production" && isPrivateLanHost(host)) {
    return true;
  }
  return Boolean(configuredHost) && host === configuredHost;
}
