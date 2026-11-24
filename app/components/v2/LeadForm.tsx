"use client";

import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { getUtmParams } from "@/lib/utm";
import { CONTACT } from "@/lib/site";

const ROLES = ["Dean or Principal", "Medical Education Unit", "Head of Department", "Faculty", "IT or Administration", "Other"];

/**
 * Demo request form. Netlify Forms (no backend): posts URL-encoded data to
 * /__forms.html, which holds the static copy Netlify detects at deploy time.
 * Honeypot field `company_website`. Inline success state, fires GA4 generate_lead.
 * TODO(varun): set the notification email for "demo-request" in Netlify > Forms.
 */
export default function LeadForm({ source }: { source: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const started = useRef(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    data.set("source", source);
    data.set("utm", new URLSearchParams(getUtmParams()).toString());
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackEvent("generate_lead", { source, role: String(data.get("role") ?? "") });
      setState("done");
    } catch {
      trackEvent("form_error", { form: "demo_request", source });
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="lead-form lead-done" role="status">
        <span aria-hidden className="lead-tick">
          ✓
        </span>
        <p className="h2 !text-[2rem]">
          Thank <span className="acc">you.</span>
        </p>
        <p className="lead mt-3">We will get back to you within two working days to set up the demo.</p>
      </div>
    );
  }

  return (
    <form
      name="demo-request"
      onSubmit={submit}
      className="lead-form"
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        trackEvent("form_start", { form: "demo_request", source });
      }}
    >
      <input type="hidden" name="form-name" value="demo-request" />
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label>
        <span>Your name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Role</span>
        <select name="role" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label>
        <span>College</span>
        <input name="college" required autoComplete="organization" />
      </label>
      <label>
        <span>
          City <i>optional</i>
        </span>
        <input name="city" autoComplete="address-level2" />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="lead-wide">
        <span>
          Anything we should know? <i>optional</i>
        </span>
        <textarea name="message" rows={3} />
      </label>
      <div className="lead-wide lead-foot">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary !min-h-14 !px-8 !text-lg disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Request a demo"}
        </button>
        {state === "error" ? (
          <p className="lead-error" role="alert">
            That didn&apos;t go through. Email us at {CONTACT.corporate}.
          </p>
        ) : (
          <p className="lead-note">We will get back to you within two working days.</p>
        )}
      </div>
    </form>
  );
}
