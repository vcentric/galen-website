"use client";

import { useState, type FormEvent } from "react";
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
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-8" role="status">
        <p className="h2 !text-[2rem]">
          Thank <span className="acc">you.</span>
        </p>
        <p className="lead mt-3">We will get back to you within two working days to set up the demo.</p>
      </div>
    );
  }

  const field = "mt-1.5 w-full rounded-xl border-2 border-[#2e2e2e]/15 bg-white px-4 py-3 font-medium outline-none focus:border-[#eb602d]";
  const label = "block text-sm font-bold";

  return (
    <form name="demo-request" onSubmit={submit} className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
      <input type="hidden" name="form-name" value="demo-request" />
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className={label}>
        Your name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Role
        <select name="role" required className={field} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        College
        <input name="college" required autoComplete="organization" className={field} />
      </label>
      <label className={label}>
        City
        <input name="city" autoComplete="address-level2" className={field} />
      </label>
      <label className={label}>
        Phone
        <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className={`${label} md:col-span-2`}>
        Anything we should know? <span className="font-medium opacity-60">(optional)</span>
        <textarea name="message" rows={3} className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Request a demo"}
        </button>
        {state === "error" && (
          <p className="text-sm font-semibold text-[#c94d20]" role="alert">
            That didn&apos;t go through. Email us at {CONTACT.corporate}.
          </p>
        )}
      </div>
    </form>
  );
}
