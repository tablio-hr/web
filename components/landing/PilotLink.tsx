"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import type { Interest } from "@/lib/early-access";

type PilotLinkProps = {
  interest?: Interest;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

export function hrefForPilot(interest: Interest = "general"): string {
  return interest === "handheld" ? "/?interest=handheld#pilot" : "/#pilot";
}

export function PilotLink({
  interest = "general",
  children,
  className,
  onClick,
  ...rest
}: PilotLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    const heading = document.getElementById("pilot-heading");
    if (heading) {
      window.setTimeout(() => heading.focus(), 350);
    }
  }

  return (
    <a href={hrefForPilot(interest)} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
