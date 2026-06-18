"use server"
import nodemailer from "nodemailer"
/**
 * Sends a refined, minimalist inquiry notification to the portfolio owner.
 * Aligned with the "Korean Minimalist" & "Soft-Technical" aesthetic.
 */
export const sendMsgAction = async ({
    data
}: {
    data: {
        name: string;
        email: string;
        phone?: string;
        message?: string;
    }
}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'medium',
            timeStyle: 'short'
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
                            <div class="value">${data.name}</div>
                        </div>
                        <div class="field">
                            <span class="label">Email Address</span>
                            <div class="value"><a href="mailto:${data.email}" style="color: #000; text-decoration: underline;">${data.email}</a></div>
                        </div>
                        ${data.phone ? `
                        <div class="field">
                            <span class="label">Phone Number</span>
                            <div class="value">${data.phone}</div>
                        </div>
                        ` : ''}
                        <div class="field" style="margin-bottom: 0;">
                            <span class="label">Message</span>
                            <div class="message-box">
                                ${data.message || 'No message provided.'}
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
                            Hi ${data.name},<br><br>
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

        // Send Notification to Owner
        const notificationConfig = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: data.email,
            subject: `New Contact Inquiry: ${data.name}`,
            html: notificationHtml
        };

        // Send Confirmation to Sender
        const confirmationConfig = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: `Thank you for contacting Kavach X`,
            html: confirmationHtml
        };

        // Run both parallel
        await Promise.all([
            transporter.sendMail(notificationConfig),
            transporter.sendMail(confirmationConfig)
        ]);

        return { message: "Inquiry sent successfully.", success: true }

    } catch (error) {
        console.error("Error while sending portfolio mail ==> ", error)
        return { message: "Connection error. Please try again later.", status: "ERROR" }
    }
}