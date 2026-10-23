"use server";

import { after } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { escapeHtml, getAdminRecipient, getTransporter, sendMailSafe } from "@/lib/mailer";

const SEND_FAILED_MESSAGE = "We couldn't send your message right now. Please try again.";

export const sendMsgAction = async ({
    data,
}: {
    data: {
        name: string;
        email: string;
        phone?: string;
        message?: string;
    };
}) => {
    try {
        const name = data.name?.trim();
        const email = data.email?.trim().toLowerCase();
        const phone = data.phone?.trim() || "";
        const message = data.message?.trim();

        // 1. Strict Server-side validation
        if (!name) {
            return { success: false, message: "Please enter your name." };
        }
        if (!email) {
            return { success: false, message: "Please enter your email address." };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Please enter a valid email address." };
        }
        if (!message) {
            return { success: false, message: "Please enter a message." };
        }

        // 2. Save inquiry to MongoDB database
        let dbSaved = false;
        try {
            await connectDB();
            await ContactInquiry.create({
                name,
                email,
                phone,
                message,
                status: "NEW",
            });
            dbSaved = true;
        } catch (dbError) {
            console.error("❌ MongoDB Save Error in sendMsgAction:", dbError);
        }

        // 3. Send Email Notifications via Nodemailer
        if (!getTransporter()) {
            console.warn("⚠️ EMAIL_USER or EMAIL_PASS missing in .env! Email dispatch skipped.");
            // Without email, the inquiry only survives if it was saved to the DB
            return dbSaved
                ? { message: "Inquiry sent successfully.", success: true }
                : { message: SEND_FAILED_MESSAGE, success: false };
        }

        // Escape every user-supplied value before it goes into email HTML
        const safe = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            message: escapeHtml(message),
        };

        const timestamp = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
        });

        const commonStyles = `
            body {
                margin: 0;
                padding: 0;
                background-color: #f9fafb;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                color: #111827;
                -webkit-font-smoothing: antialiased;
            }
            .wrapper {
                width: 100%;
                table-layout: fixed;
                background-color: #f9fafb;
                padding: 40px 0;
            }
            .content {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }
            .header {
                padding: 40px 40px 20px;
                text-align: center;
                border-bottom: 1px solid #f3f4f6;
            }
            .brand-logo {
                font-weight: 800;
                font-size: 24px;
                letter-spacing: -0.025em;
                color: #000000;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 16px;
            }
            .tagline {
                font-size: 14px;
                color: #6b7280;
                margin: 0;
            }
            .body {
                padding: 40px;
            }
            .field {
                margin-bottom: 24px;
            }
            .label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #6b7280;
                margin-bottom: 8px;
                display: block;
                font-weight: 600;
            }
            .value {
                font-size: 16px;
                color: #111827;
                line-height: 1.6;
            }
            .message-box {
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                font-size: 15px;
                color: #374151;
                line-height: 1.6;
                margin-top: 8px;
            }
            .footer {
                padding: 30px 40px;
                text-align: center;
                background-color: #f8fafc;
                border-top: 1px solid #e5e7eb;
                font-size: 13px;
                color: #64748b;
            }
        `;

        const notificationHtml = `
        <!DOCTYPE html>
        <html>
        <head><style>${commonStyles}</style></head>
        <body>
            <div class="wrapper">
                <div class="content">
                    <div class="header">
                        <div class="brand-logo">KAVACH X</div>
                        <p class="tagline">New Inquiry Received</p>
                    </div>
                    <div class="body">
                        <div class="field">
                            <span class="label">Name</span>
                            <div class="value">${safe.name}</div>
                        </div>
                        <div class="field">
                            <span class="label">Email Address</span>
                            <div class="value"><a href="mailto:${safe.email}" style="color: #000; text-decoration: underline;">${safe.email}</a></div>
                        </div>
                        ${safe.phone ? `
                        <div class="field">
                            <span class="label">Phone Number</span>
                            <div class="value">${safe.phone}</div>
                        </div>
                        ` : ""}
                        <div class="field" style="margin-bottom: 0;">
                            <span class="label">Message</span>
                            <div class="message-box">
                                ${safe.message}
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        Received on ${timestamp} (IST)<br>
                        Kavach X Automated System
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const confirmationHtml = `
        <!DOCTYPE html>
        <html>
        <head><style>${commonStyles}</style></head>
        <body>
            <div class="wrapper">
                <div class="content">
                    <div class="header">
                        <div class="brand-logo">KAVACH X</div>
                        <h1 style="font-size: 24px; font-weight: 700; margin: 16px 0 0; color: #111827;">We've received your message.</h1>
                    </div>
                    <div class="body" style="text-align: center;">
                        <div class="value" style="margin-bottom: 32px;">
                            Hi ${safe.name},<br><br>
                            Thank you for contacting Kavach X. We have received your inquiry and our team is currently reviewing it.
                        </div>
                        <div class="message-box" style="text-align: left; background-color: #000; color: #fff; border: none;">
                            <span class="label" style="color: #9ca3af;">Next Steps</span>
                            <div style="font-size: 14px; color: #e5e7eb;">
                                A member of our support team will get back to you shortly at the email address provided. 
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        Connected on ${timestamp} (IST)<br>
                        Kavach X Support
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const notificationConfig = {
            from: process.env.EMAIL_USER,
            to: getAdminRecipient(),
            replyTo: email,
            subject: `New Contact Inquiry: ${name}`,
            html: notificationHtml,
        };

        const confirmationConfig = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Thank you for contacting Kavach X`,
            html: confirmationHtml,
        };

        if (dbSaved) {
            // Inquiry is safe in the DB: send both emails after the response so the form stays instant.
            // after() keeps the Vercel function alive until both sends finish.
            after(async () => {
                await Promise.all([
                    sendMailSafe("[contact] admin notification", notificationConfig),
                    sendMailSafe("[contact] user confirmation", confirmationConfig),
                ]);
            });
            return { message: "Inquiry sent successfully.", success: true };
        }

        // DB save failed: the admin email is now the only copy of this inquiry, so wait for it
        const adminSent = await sendMailSafe("[contact] admin notification (DB save failed)", notificationConfig);
        if (!adminSent) {
            return { message: SEND_FAILED_MESSAGE, success: false };
        }

        after(async () => {
            await sendMailSafe("[contact] user confirmation", confirmationConfig);
        });
        return { message: "Inquiry sent successfully.", success: true };
    } catch (error: any) {
        console.error("Error while sending contact inquiry mail ==> ", error);
        return { message: error?.message || "Connection error. Please try again later.", success: false };
    }
};