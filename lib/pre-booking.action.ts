"use server";

import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import PreBooking from "@/models/PreBooking";

export interface PreBookingFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  cameraCount: string;
  detectionFeatures: string[];
  primaryInterest: string;
  deploymentTimeline: string;
}

export async function submitPreBookingAction(data: PreBookingFormData) {
  try {
    const {
      fullName,
      phone,
      email,
      propertyType,
      cameraCount,
      detectionFeatures,
      primaryInterest,
      deploymentTimeline,
    } = data;

    // 1. Basic server-side validation
    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !propertyType?.trim() ||
      !cameraCount?.trim() ||
      !primaryInterest?.trim() ||
      !deploymentTimeline?.trim() ||
      !Array.isArray(detectionFeatures) ||
      detectionFeatures.length === 0
    ) {
      return {
        success: false,
        message: "Please answer all required questions before submitting.",
      };
    }

    // 2. Database saving
    await connectDB();

    const newBooking = await PreBooking.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      propertyType,
      cameraCount,
      detectionFeatures,
      primaryInterest,
      deploymentTimeline,
      status: "NEW",
    });

    // 3. Send Email Notifications if email credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
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
            background-color: #09090b;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #f4f4f5;
          }
          .wrapper {
            width: 100%;
            background-color: #09090b;
            padding: 32px 16px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #18181b;
            border: 1px solid #27272a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            padding: 32px 24px;
            background-color: #000000;
            border-bottom: 1px solid #27272a;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .badge {
            display: inline-block;
            margin-top: 8px;
            padding: 4px 12px;
            background-color: #27272a;
            color: #a1a1aa;
            font-size: 12px;
            font-weight: 600;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .body {
            padding: 32px 24px;
          }
          .grid {
            display: grid;
            gap: 16px;
          }
          .item {
            background-color: #09090b;
            border: 1px solid #27272a;
            border-radius: 8px;
            padding: 14px 16px;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #a1a1aa;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .value {
            font-size: 15px;
            color: #ffffff;
            font-weight: 500;
          }
          .tag {
            display: inline-block;
            background-color: #27272a;
            color: #e4e4e7;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 13px;
            margin-right: 6px;
            margin-top: 4px;
          }
          .footer {
            padding: 24px;
            text-align: center;
            background-color: #000000;
            border-top: 1px solid #27272a;
            font-size: 12px;
            color: #71717a;
          }
        `;

        // Admin Notification Email HTML
        const adminEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head><style>${commonStyles}</style></head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <div class="logo">KAVACH X</div>
                  <div class="badge">🔥 New Pre-Booking Request</div>
                </div>
                <div class="body">
                  <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 20px; color: #ffffff;">Pre-Booking Details</h2>
                  <div class="grid">
                    <div class="item">
                      <div class="label">Full Name</div>
                      <div class="value">${fullName}</div>
                    </div>
                    <div class="item">
                      <div class="label">Phone / WhatsApp</div>
                      <div class="value"><a href="tel:${phone}" style="color: #60a5fa; text-decoration: none;">${phone}</a></div>
                    </div>
                    <div class="item">
                      <div class="label">Email Address</div>
                      <div class="value"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></div>
                    </div>
                    <div class="item">
                      <div class="label">Property / Business Type</div>
                      <div class="value">${propertyType}</div>
                    </div>
                    <div class="item">
                      <div class="label">Currently Installed Cameras</div>
                      <div class="value">${cameraCount}</div>
                    </div>
                    <div class="item">
                      <div class="label">Required AI Detections</div>
                      <div class="value">
                        ${detectionFeatures.map((f) => `<span class="tag">${f}</span>`).join("")}
                      </div>
                    </div>
                    <div class="item">
                      <div class="label">Primary Focus / Interest</div>
                      <div class="value">${primaryInterest}</div>
                    </div>
                    <div class="item">
                      <div class="label">Expected Deployment Timeline</div>
                      <div class="value">${deploymentTimeline}</div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  Submission ID: ${newBooking._id}<br>
                  Received on ${timestamp} (IST) • KavachX Core System
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        // Customer Confirmation Email HTML
        const customerEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head><style>${commonStyles}</style></head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <div class="logo">KAVACH X</div>
                  <div class="badge">Pre-Booking Confirmed</div>
                </div>
                <div class="body" style="text-align: center;">
                  <h2 style="font-size: 22px; color: #ffffff; margin-bottom: 12px;">Thank you for pre-booking KavachX!</h2>
                  <p style="font-size: 15px; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px;">
                    Hi <strong>${fullName}</strong>,<br>
                    We have successfully received your pre-booking request. Transform your existing CCTV cameras into an AI-surveillance security system — without replacing your cameras.
                  </p>
                  
                  <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 24px;">
                    <div style="font-size: 13px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Summary of your request</div>
                    <div style="font-size: 14px; color: #d4d4d8; line-height: 1.8;">
                      • <strong>Property Type:</strong> ${propertyType}<br>
                      • <strong>Cameras:</strong> ${cameraCount}<br>
                      • <strong>Timeline:</strong> ${deploymentTimeline}<br>
                      • <strong>Detections Selected:</strong> ${detectionFeatures.join(", ")}
                    </div>
                  </div>

                  <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 8px; padding: 16px; color: #e4e4e7; font-size: 14px;">
                    ⚡ <strong>Next Steps:</strong> Our security solutions team will contact you shortly via <strong>${phone}</strong> or <strong>${email}</strong> to assist with onboarding and custom deployment.
                  </div>
                </div>
                <div class="footer">
                  KavachX AI Surveillance System • <a href="https://kavachx.com" style="color: #71717a;">www.kavachx.com</a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        const adminRecipient = process.env.ADMIN_EMAIL || "connect@kavachx.io";

        // Dispatch email notifications asynchronously in background so form response is instantaneous
        Promise.allSettled([
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: adminRecipient,
            replyTo: email,
            subject: `New Pre-Booking Request from ${fullName}`,
            html: adminEmailHtml,
          }),
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Pre-Booking Received - KavachX AI Surveillance`,
            html: customerEmailHtml,
          }),
        ]).catch((mailError) => {
          console.error("❌ Nodemailer async error in pre-booking action:", mailError);
        });
      } catch (mailError) {
        console.error("❌ Nodemailer error in pre-booking action:", mailError);
        // We still return success since the database record was saved
      }
    } else {
      console.warn(
        "⚠️ EMAIL_USER or EMAIL_PASS is missing in .env! Email notification skipped. Form submission saved to MongoDB."
      );
    }

    return {
      success: true,
      message: "Pre-booking request submitted successfully!",
      bookingId: newBooking._id.toString(),
    };
  } catch (error: any) {
    console.error("Error in submitPreBookingAction:", error);
    return {
      success: false,
      message: error?.message || "Something went wrong while submitting. Please try again.",
    };
  }
}
