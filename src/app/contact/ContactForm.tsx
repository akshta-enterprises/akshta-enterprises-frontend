"use client";

import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  console.warn("EmailJS env vars missing. Contact form will not work.");
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

function isValidEmail(email: string) {
  // Practical validation (not overly strict).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// function requiredEnv(name: string): string {
//   const value = process.env[name];
//   if (!value) {
//     throw new Error(
//       `Missing required environment variable: ${name}. Add it to .env.local.`,
//     );
//   }
//   return value;
// }

export function ContactForm({
  interestOptions,
}: {
  interestOptions: string[];
}) {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    interest: interestOptions[0] ?? "General Enquiry",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      state.name.trim().length >= 2 &&
      isValidEmail(state.email) &&
      state.phone.trim().length >= 8 &&
      state.message.trim().length >= 10
    );
  }, [state]);

  console.log("EmailJS envs:", {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult("idle");
    setErrorMessage("");

    if (!canSubmit) {
      setResult("error");
      setErrorMessage(
        "Please fill all required fields with valid information.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const serviceId = EMAILJS_SERVICE_ID;
      const templateId = EMAILJS_TEMPLATE_ID;
      const publicKey = EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS environment variables");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: state.name,
          email: state.email,
          phone: state.phone,
          interest: state.interest,
          message: state.message,
        },
        { publicKey },
      );

      setResult("success");
      setState({
        name: "",
        email: "",
        phone: "",
        interest: interestOptions[0] ?? "General Enquiry",
        message: "",
      });
    } catch (err) {
      setResult("error");
      setErrorMessage(
        "Something went wrong while sending your message. Please try again or WhatsApp us.",
      );
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="text-lg font-extrabold tracking-tight text-ae-black">
        Send us your requirement
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        We typically respond the same business day.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700">
              Name <span className="text-ae-red">*</span>
            </label>
            <input
              value={state.name}
              onChange={(e) =>
                setState((s) => ({ ...s, name: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ae-black placeholder:text-slate-400 focus:outline-none"
              placeholder="Your full name"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">
              Email <span className="text-ae-red">*</span>
            </label>
            <input
              value={state.email}
              onChange={(e) =>
                setState((s) => ({ ...s, email: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ae-black placeholder:text-slate-400 focus:outline-none"
              placeholder="you@company.com"
              autoComplete="email"
              inputMode="email"
              required
            />
            {!state.email.trim() ? null : isValidEmail(state.email) ? null : (
              <div className="mt-2 text-xs font-semibold text-ae-red">
                Please enter a valid email.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700">
              Phone <span className="text-ae-red">*</span>
            </label>
            <input
              value={state.phone}
              onChange={(e) =>
                setState((s) => ({ ...s, phone: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ae-black placeholder:text-slate-400 focus:outline-none"
              placeholder="+91 9XXXXXXXXX"
              autoComplete="tel"
              inputMode="tel"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">
              Product Interest
            </label>
            <select
              value={state.interest}
              onChange={(e) =>
                setState((s) => ({ ...s, interest: e.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-ae-black focus:outline-none"
            >
              {interestOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700">
            Message <span className="text-ae-red">*</span>
          </label>
          <textarea
            value={state.message}
            onChange={(e) =>
              setState((s) => ({ ...s, message: e.target.value }))
            }
            className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ae-black placeholder:text-slate-400 focus:outline-none"
            placeholder="Tell us what you need (site size, quantity, model preference, delivery location, etc.)"
            required
          />
          <div className="mt-2 text-xs text-slate-500">
            Minimum recommended: 10 characters. Include quantity and location
            for faster quotes.
          </div>
        </div>

        {result === "success" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
            <div>
              <div className="font-extrabold tracking-tight">Message sent</div>
              <div className="mt-1 text-emerald-800">
                Thanks — we’ll get back to you shortly.
              </div>
            </div>
          </div>
        ) : null}

        {result === "error" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-none text-red-700" />
            <div>
              <div className="font-extrabold tracking-tight">Couldn’t send</div>
              <div className="mt-1 text-red-800">{errorMessage}</div>
            </div>
          </div>
        ) : null}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            By submitting, you agree to be contacted regarding your enquiry.
          </div>
          <Button type="submit" disabled={submitting || !canSubmit}>
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
