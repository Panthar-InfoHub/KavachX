"use client";

import { sendMsgAction } from "@/lib/mail.action";
import { useForm } from "@tanstack/react-form";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

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

      startTransition(async () => {
        try {
          const res = await sendMsgAction({
            data: {
              email: value.email,
              name: value.name,
              phone: value.phone,
              message: value.message,
            }
          })

          if (res.success) {
            toast("Message Sent Successfully!!")
          } else {
            toast.warning("Something went wrong!")
          }
        } catch (error) {
          toast.error("Something went wrong!")
          console.log(error);
        }

      })
      form.reset();
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
            <Link href="https://www.facebook.com/profile.php?id=61589563642066" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </Link>
            <Link href="https://www.instagram.com/kavachx/" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </Link>
            <Link href="https://x.com/KavachX" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="https://www.linkedin.com/company/suraksha-kawach1/?viewAsMember=true" target="_blank" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-black!">
            <form.Field
              name="name"
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-[15px] font-medium text-gray-800">Your Name</label>
                  <input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                  />
                </div>
              )}
            />
            <form.Field
              name="email"
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-[15px] font-medium text-gray-800">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                  />
                </div>
              )}
            />
            <form.Field
              name="phone"
              children={(field: any) => (
                <div className="flex flex-col gap-3">
                  <label htmlFor="phone" className="text-[15px] font-medium text-gray-800">Phone Number (optional)</label>
                  <input
                    id="phone"
                    type="tel"
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
            children={(field: any) => (
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-[15px] font-medium text-gray-800">Message</label>
                <input
                  id="message"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border-b border-gray-200 text-gray-800 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none placeholder-gray-400"
                />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state: any) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]: any) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting || isPending}
                className="bg-black text-white px-8 py-4 rounded-full text-[15px] font-medium flex items-center gap-3 hover:bg-gray-900 transition-colors disabled:opacity-70 mt-4"
              >
                {isPending ? <> Processing... <Loader2 className="w-4 h-4 animate-spin" />  </> : "Leave us a Message"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          />
        </form>
      </div>
    </section >
  );
}
