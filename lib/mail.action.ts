"use server";

import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

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
        try {
            await connectDB();
            await ContactInquiry.create({
                name,
                email,
                phone,
                message,
                status: "NEW",
            });
        } catch (dbError) {
            console.error("❌ MongoDB Save Error in sendMsgAction:", dbError);
        }

        // 3. Send Email Notifications via Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = process.env.EMAIL_HOST
                    ? nodemailer.createTransport({
                          host: process.env.EMAIL_HOST,
                          port: Number(process.env.EMAIL_PORT) || 465,
                          secure: Number(process.env.EMAIL_PORT) === 465,
                          auth: {
                              user: process.env.EMAIL_USER,
                              pass: process.env.EMAIL_PASS,
                          },
                      })
                    : nodemailer.createTransport({
                          service: "gmail",
                          auth: {
                              user: process.env.EMAIL_USER,
                              pass: process.env.EMAIL_PASS,
                          },
                      });

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

                const adminRecipient = process.env.ADMIN_EMAIL || "connect@kavachx.io";

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
                                    <div class="value">${name}</div>
                                </div>
                                <div class="field">
                                    <span class="label">Email Address</span>
                                    <div class="value"><a href="mailto:${email}" style="color: #000; text-decoration: underline;">${email}</a></div>
                                </div>
                                ${phone ? `
                                <div class="field">
                                    <span class="label">Phone Number</span>
                                    <div class="value">${phone}</div>
                                </div>
                                ` : ""}
                                <div class="field" style="margin-bottom: 0;">
                                    <span class="label">Message</span>
                                    <div class="message-box">
                                        ${message}
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
                                    Hi ${name},<br><br>
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
                    to: adminRecipient,
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

                // Dispatch email notifications asynchronously in background so form response is instantaneous
                Promise.allSettled([
                    transporter.sendMail(notificationConfig),
                    transporter.sendMail(confirmationConfig),
                ]).then((mailResults) => {
                    mailResults.forEach((res, index) => {
                        if (res.status === "rejected") {
                            console.error(`❌ Mail send failed for ${index === 0 ? "Admin" : "User"}:`, res.reason);
                        }
                    });
                }).catch((mailError) => {
                    console.error("❌ Nodemailer async error in sendMsgAction:", mailError);
                });
            } catch (mailError) {
                console.error("❌ Nodemailer error in sendMsgAction:", mailError);
            }
        } else {
            console.warn(
                "⚠️ EMAIL_USER or EMAIL_PASS missing in .env! Email dispatch skipped. Message saved in DB."
            );
        }

        return { message: "Inquiry sent successfully.", success: true };
    } catch (error: any) {
        console.error("Error while sending contact inquiry mail ==> ", error);
        return { message: error?.message || "Connection error. Please try again later.", success: false };
    }
};