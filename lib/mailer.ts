import "server-only";

import nodemailer, { type Transporter, type SendMailOptions } from "nodemailer";

// Reused across invocations while the server instance stays warm
let cachedTransporter: Transporter | null = null;

/**
 * Returns the shared Nodemailer transporter, or null if email credentials are not configured.
 * Uses custom SMTP when EMAIL_HOST is set, otherwise falls back to Gmail.
 */
export function getTransporter(): Transporter | null {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  const auth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  };

  cachedTransporter = process.env.EMAIL_HOST
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: (Number(process.env.EMAIL_PORT) || 465) === 465,
        auth,
      })
    : nodemailer.createTransport({
        service: "gmail",
        auth,
      });

  return cachedTransporter;
}

/**
 * Escapes user-supplied values before they are interpolated into email HTML.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends an email without ever throwing. Logs a labelled error on failure.
 * Returns true if the email was accepted by the mail server, false otherwise.
 */
export async function sendMailSafe(label: string, options: SendMailOptions): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(`⚠️ ${label} skipped: EMAIL_USER or EMAIL_PASS missing in .env`);
    return false;
  }

  try {
    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.error(`❌ ${label} failed:`, error);
    return false;
  }
}

export function getAdminRecipient(): string {
  return process.env.ADMIN_EMAIL || "connect@kavachx.io";
}
