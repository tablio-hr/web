"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/landing/TurnstileWidget";
import { InlineSpans } from "@/components/ui/InlineSpans";
import { FORM_PRIVACY_NOTICE } from "@/content/legal/form-notice";
import { PILOT } from "@/content/landing";
import {
  normalizeInterest,
  submitEarlyAccess,
  validateEarlyAccess,
  type Interest,
} from "@/lib/early-access";

type PilotFormProps = {
  turnstileSiteKey?: string;
};

export function PilotForm({ turnstileSiteKey = "" }: PilotFormProps) {
  const searchParams = useSearchParams();
  const interest: Interest = normalizeInterest(searchParams.get("interest"));
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const nameId = useId();
  const emailId = useId();
  const errorId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      successRef.current?.focus();
    }
  }, [success]);

  function clearTurnstileToken() {
    setTurnstileToken("");
  }

  function refreshTurnstile() {
    turnstileRef.current?.reset();
    clearTurnstileToken();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) {
      return;
    }
    setFormError(null);
    const nextErrors = validateEarlyAccess({ name, email });
    setFieldErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) {
      (nextErrors.name ? nameRef : emailRef).current?.focus();
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setFormError(PILOT.errors.turnstile);
      errorRef.current?.focus();
      return;
    }

    setPending(true);
    const result = await submitEarlyAccess({
      name: name.trim(),
      email: email.trim(),
      interest,
      website,
      ...(turnstileToken ? { turnstile_token: turnstileToken } : {}),
    });
    setPending(false);

    if (result.ok) {
      setTurnstileToken("");
      setSuccess(true);
      return;
    }

    refreshTurnstile();
    const nextField = {
      name: result.fieldErrors.name,
      email: result.fieldErrors.email,
    };
    setFieldErrors(nextField);
    setFormError(result.message);
    if (nextField.name) {
      nameRef.current?.focus();
    } else if (nextField.email) {
      emailRef.current?.focus();
    } else {
      errorRef.current?.focus();
    }
  }

  if (success) {
    return (
      <div className="border border-line bg-paper-bright p-6">
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-2xl font-extrabold text-navy"
        >
          {PILOT.successTitle}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{PILOT.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="border border-line bg-paper-bright p-6" noValidate>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${nameId}-website`}>{PILOT.fields.website}</label>
        <input
          id={`${nameId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className="space-y-5">
        <div>
          <label htmlFor={nameId} className="block text-sm font-bold text-navy">
            {PILOT.fields.name}
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full border border-navy/25 bg-white px-3 py-2.5 text-navy"
          />
          {fieldErrors.name ? (
            <p id={`${nameId}-error`} className="mt-1 text-sm font-medium text-orange-dark">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={emailId} className="block text-sm font-bold text-navy">
            {PILOT.fields.email}
          </label>
          <input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-navy/25 bg-white px-3 py-2.5 text-navy"
          />
          {fieldErrors.email ? (
            <p id={`${emailId}-error`} className="mt-1 text-sm font-medium text-orange-dark">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        {turnstileSiteKey ? (
          <TurnstileWidget
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onToken={setTurnstileToken}
            onExpire={clearTurnstileToken}
            onError={() => {
              clearTurnstileToken();
              setFormError(PILOT.errors.turnstile);
            }}
          />
        ) : null}
        {formError ? (
          <p
            ref={errorRef}
            id={errorId}
            tabIndex={-1}
            role="alert"
            className="text-sm font-medium text-orange-dark"
          >
            {formError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-sm bg-orange px-5 py-3 text-base font-bold text-navy hover:bg-orange-dark disabled:opacity-70"
        >
          {pending ? PILOT.submitting : PILOT.submit}
        </button>
        <p className="text-sm leading-relaxed text-muted">{PILOT.note}</p>
        <p className="text-sm leading-relaxed text-muted">
          <InlineSpans spans={FORM_PRIVACY_NOTICE.spans} />
        </p>
      </div>
    </form>
  );
}
