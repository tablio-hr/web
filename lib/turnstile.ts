import { PRODUCTION_ORIGIN } from "./site";

export const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      appearance?: "always" | "execute" | "interaction-only";
      language?: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function turnstileSiteKey(): string {
  return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim();
}

export function assertProductionTurnstile(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): void {
  const site = (env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (site === PRODUCTION_ORIGIN && !(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "").trim()) {
    throw new Error(
      "production build requires NEXT_PUBLIC_TURNSTILE_SITE_KEY (build arg, not runtime-only .env)",
    );
  }
}
