import type { ReactNode } from "react";

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconModules({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </Svg>
  );
}

export function IconOffline({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8 16a6 6 0 0 1 8 0" />
      <path d="M5 13a10 10 0 0 1 4.2-3.1" />
      <path d="M15 9.9A10 10 0 0 1 19 13" />
      <path d="M2 9a14 14 0 0 1 5.4-3.6" />
      <path d="M16.6 5.4A14 14 0 0 1 22 9" />
      <path d="M12 20h.01" />
      <path d="M4 20 20 4" />
    </Svg>
  );
}

export function IconHandheld({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
      <path d="M9 6h6" />
    </Svg>
  );
}

export function IconCroatia({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </Svg>
  );
}

export function IconPos({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </Svg>
  );
}

export function IconTables({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="8" cy="16" r="2.2" />
      <circle cx="16" cy="16" r="2.2" />
    </Svg>
  );
}

export function IconProducts({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </Svg>
  );
}

export function IconWarehouse({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 10 12 4l9 6v10H3z" />
      <path d="M9 20v-6h6v6" />
    </Svg>
  );
}

export function IconStaff({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 19a4.5 4.5 0 0 1 5-4.4" />
    </Svg>
  );
}

export function IconReservations({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </Svg>
  );
}

export function IconReports({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-4" />
      <path d="M12 15V8" />
      <path d="M16 15v-6" />
    </Svg>
  );
}

export function IconIntegrations({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="18" cy="17" r="2.4" />
      <path d="M8.2 11.2 15.6 8" />
      <path d="M8.2 12.8 15.6 16" />
    </Svg>
  );
}

export const PLATFORM_ICONS = [
  IconPos,
  IconTables,
  IconProducts,
  IconWarehouse,
  IconStaff,
  IconReservations,
  IconReports,
  IconIntegrations,
] as const;

export const BENEFIT_ICONS = [IconModules, IconOffline, IconHandheld, IconCroatia] as const;
