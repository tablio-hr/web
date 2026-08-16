"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export type TurnstileWidgetHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
};

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey, onToken, onExpire, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacksRef = useRef({ onToken, onExpire, onError });
    callbacksRef.current = { onToken, onExpire, onError };

    const renderWidget = useCallback(() => {
      const el = containerRef.current;
      if (!el || !window.turnstile || widgetIdRef.current != null) {
        return;
      }
      widgetIdRef.current = window.turnstile.render(el, {
        sitekey: siteKey,
        appearance: "always",
        language: "hr",
        callback: (token) => callbacksRef.current.onToken(token),
        "expired-callback": () => callbacksRef.current.onExpire(),
        "error-callback": () => callbacksRef.current.onError(),
      });
    }, [siteKey]);

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      let timer = 0;
      function tryRender() {
        renderWidget();
        if (widgetIdRef.current != null && timer) {
          window.clearInterval(timer);
          timer = 0;
        }
      }
      tryRender();
      timer = window.setInterval(tryRender, 50);
      return () => {
        if (timer) {
          window.clearInterval(timer);
        }
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = null;
      };
    }, [renderWidget]);

    return <div ref={containerRef} data-testid="turnstile" />;
  },
);
