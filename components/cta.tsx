"use client";

import { sendMsgAction } from "@/lib/mail.action";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      const name = value.name?.trim();
      const email = value.email?.trim();
      const message = value.message?.trim();

      if (!name) {
        toast.warning("Please enter your name.");
        return;
      }
      if (!email) {
        toast.warning("Please enter your email address.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.warning("Please enter a valid email address.");
        return;
      }
      if (!message) {
        toast.warning("Please enter a message.");
        return;
      }

      startTransition(async () => {
        try {
          const res = await sendMsgAction({
            data: {
              email: value.email,
              name: value.name,
              phone: value.phone,
              message: value.message,
            },
          });

          if (res.success) {
            trackEvent({
              name: "generate_lead",
              params: {
                form_name: "contact_form",
                status: "success",
              },
            });
            toast.success("Message Sent Successfully!");
            form.reset();
          } else {
            trackEvent({
              name: "form_error",
              params: {
                form_name: "contact_form",
                error_type: "submission_failed",
              },
            });
            toast.error(res.message || "Something went wrong!");
          }
        } catch (error) {
          trackEvent({
            name: "form_error",
            params: {
              form_name: "contact_form",
              error_type: "network_or_server_error",
            },
          });
          toast.error("Something went wrong!");
          console.error(error);
        }
      });
    },
  });

  return (
    <section id="connect-us" className="w-full bg-white pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-4">Connect Us</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight max-w-3xl">
              Get in touch with us.<br />We're here to assist you.
            </h2>
          </div>

          <div className="flex md:flex-col gap-4 pt-4 md:pt-0">
            <Link
              href="https://www.facebook.com/profile.php?id=61589563642066"
              target="_blank"
              onClick={() => trackEvent({ name: "social_link_click", params: { platform: "facebook", location: "connect_us" } })}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </Link>
            <Link
              href="https://www.instagram.com/kavachx/"
              target="_blank"
              onClick={() => trackEvent({ name: "social_link_click", params: { platform: "instagram", location: "connect_us" } })}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </Link>
            <Link
              href="https://x.com/KavachX"
              target="_blank"
              onClick={() => trackEvent({ name: "social_link_click", params: { platform: "x", location: "connect_us" } })}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/suraksha-kawach1/?viewAsMember=true"
              target="_blank"
              onClick={() => trackEvent({ name: "social_link_click", params: { platform: "linkedin", location: "connect_us" } })}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </Link>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-black font-normal">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => (!value?.trim() ? "Name is required" : undefined),
              }}
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-[15px] font-medium text-gray-800">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    required
                    placeholder="Enter your name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <span className="text-xs text-red-500 mt-1">{field.state.meta.errors.join(", ")}</span>
                  )}
                </div>
              )}
            />
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value?.trim()) return "Email address is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address";
                  return undefined;
                },
              }}
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-[15px] font-medium text-gray-800">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <span className="text-xs text-red-500 mt-1">{field.state.meta.errors.join(", ")}</span>
                  )}
                </div>
              )}
            />
            <form.Field
              name="phone"
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="phone" className="text-[15px] font-medium text-gray-800">
                    Phone Number (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                  />
                </div>
              )}
            />
          </div>

          <form.Field
            name="message"
            validators={{
              onChange: ({ value }) => (!value?.trim() ? "Message is required" : undefined),
            }}
            children={(field: any) => (
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-[15px] font-medium text-gray-800">
                  Message <span className="text-red-500">*</span>
                </label>
                <input
                  id="message"
                  required
                  placeholder="Tell us how we can help..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full border-b border-gray-200 text-gray-800 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <span className="text-xs text-red-500 mt-1">{field.state.meta.errors.join(", ")}</span>
                )}
              </div>
            )}
          />

          <form.Subscribe
            selector={(state: any) => [
              state.canSubmit,
              state.isSubmitting,
              state.values,
            ]}
            children={([canSubmit, isSubmitting, values]: any) => {
              const isValid = Boolean(
                values?.name?.trim() &&
                values?.email?.trim() &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values?.email?.trim()) &&
                values?.message?.trim()
              );

              return (
                <button
                  type="submit"
                  disabled={!canSubmit || !isValid || isSubmitting || isPending}
                  className="bg-black text-white px-8 py-4 rounded-full text-[15px] font-medium flex items-center gap-3 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isPending ? (
                    <>
                      Processing... <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    "Leave us a Message"
                  )}
                  {!isSubmitting && !isPending && <ArrowRight className="w-4 h-4" />}
                </button>
              );
            }}
          />
        </form>
      </div>
    </section>
  );
}
