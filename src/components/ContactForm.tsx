"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { SITE_CONFIG } from "@/data/siteData";
import { Send, CheckCircle2, Mail, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEAuLiykEsxNdQ6G";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formMountTime = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const turnstileToken = (document.querySelector("[name=cf-turnstile-response]") as HTMLInputElement)?.value;
    if (!turnstileToken) {
      setError("Please complete the security check.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const elapsed = Date.now() - formMountTime.current;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      honeypot,
      timeCheck: elapsed,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || "Failed to send");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      <div className="lg:col-span-5 space-y-8 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 font-bold text-xs uppercase tracking-wider">
            Get In Touch
          </span>
          <h3 className="text-3xl font-extrabold text-white">We&apos;re Here to Help</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Have questions about Hear O Care ingredients, dosage, or order delivery? Reach out to our dedicated support team.
          </p>
        </div>

        <div className="space-y-6 pt-2 text-sm text-slate-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-pink-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white">Email Address</h5>
              <p className="text-slate-400 text-xs mt-0.5">{SITE_CONFIG.contact.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white">Office Location</h5>
              <p className="text-slate-400 text-xs mt-0.5">{SITE_CONFIG.contact.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white">Working Hours</h5>
              <p className="text-slate-400 text-xs mt-0.5">{SITE_CONFIG.contact.workingHours}</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
          <p>Looking to order directly? Visit our official Amazon store.</p>
        </div>
      </div>

      <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-2xl font-bold text-emerald-900">Message Sent Successfully!</h4>
            <p className="text-emerald-700 text-sm max-w-md mx-auto">
              Thank you for contacting Hear O Care. Our customer care representative will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" type="text" required placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required placeholder="e.g. rahul@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" name="subject" type="text" required placeholder="e.g. Product Inquiry / Order Support" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message *</Label>
              <Textarea id="message" name="message" required rows={5} placeholder="Write your query or message here..." />
            </div>

            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-base shadow-lg shadow-pink-500/20 hover:from-pink-700 hover:to-rose-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
