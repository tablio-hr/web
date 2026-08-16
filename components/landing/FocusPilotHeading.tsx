"use client";

import { useEffect } from "react";

export function FocusPilotHeading() {
  useEffect(() => {
    function focusHeading() {
      if (window.location.hash !== "#pilot") {
        return;
      }
      document.getElementById("pilot-heading")?.focus();
    }

    if (window.location.hash === "#pilot") {
      window.setTimeout(focusHeading, 0);
    }
    window.addEventListener("hashchange", focusHeading);
    return () => window.removeEventListener("hashchange", focusHeading);
  }, []);

  return null;
}
