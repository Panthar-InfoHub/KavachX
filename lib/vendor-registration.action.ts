"use server";

import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import VendorRegistration from "@/models/VendorRegistration";

export interface VendorFormData {
  contactPersonName: string;
  designation: string;
  companyName: string;
  phone: string;
  email: string;
  businessType: string;
  city: string;
  state: string;
  districts?: string;
  productsDistributed: string[];
  primaryCustomers: string[];
  monthlyCustomers: string;
  partnershipType: string;
  interestedSolutions: string[];
  businessOverview: string;
}

export async function submitVendorRegistrationAction(data: VendorFormData) {
  try {
    const {
      contactPersonName,
      designation,
      companyName,
      phone,
      email,
      businessType,
      city,
      state,
      districts,
      productsDistributed,
      primaryCustomers,
      monthlyCustomers,
      partnershipType,
      interestedSolutions,
      businessOverview,
    } = data;

    // 1. Basic server-side validation
    if (
      !contactPersonName?.trim() ||
      !designation?.trim() ||
      !companyName?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !businessType?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !Array.isArray(productsDistributed) ||
      productsDistributed.length === 0 ||
      !Array.isArray(primaryCustomers) ||
      primaryCustomers.length === 0 ||
      !monthlyCustomers?.trim() ||
      !partnershipType?.trim() ||
      !Array.isArray(interestedSolutions) ||
      interestedSolutions.length === 0 ||
      !businessOverview?.trim()
    ) {
      return {
        success: false,
        message: "Please answer all required fields in the vendor registration form.",
      };
    }

    // 2. Save document to MongoDB
    await connectDB();

    const newRegistration = await VendorRegistration.create({
      contactPersonName: contactPersonName.trim(),
      designation: designation.trim(),
      companyName: companyName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      businessType,
      city: city.trim(),
      state: state.trim(),
      districts: districts?.trim() || "",
      productsDistributed,
      primaryCustomers,
      monthlyCustomers,
      partnershipType,
      interestedSolutions,
      businessOverview: businessOverview.trim(),
      status: "NEW",
    });

    // 3. Send Email Notifications
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
            color: #60a5fa;
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
            gap: 14px;
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
                  <div class="badge">🤝 New Vendor Partner Registration</div>
                </div>
                <div class="body">
                  <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 20px; color: #ffffff;">Vendor Partner Details</h2>
                  <div class="grid">
                    <div class="item">
                      <div class="label">Contact Person & Designation</div>
                      <div class="value">${contactPersonName} (${designation})</div>
                    </div>
                    <div class="item">
                      <div class="label">Company / Business Name</div>
                      <div class="value">${companyName}</div>
                    </div>
                    <div class="item">
                      <div class="label">Contact Number</div>
                      <div class="value"><a href="tel:${phone}" style="color: #60a5fa; text-decoration: none;">${phone}</a></div>
                    </div>
                    <div class="item">
                      <div class="label">Business Email</div>
                      <div class="value"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></div>
                    </div>
                    <div class="item">
                      <div class="label">Business Type</div>
                      <div class="value">${businessType}</div>
                    </div>
                    <div class="item">
                      <div class="label">Operating Location</div>
                      <div class="value">${city}, ${state} ${districts ? `(${districts})` : ""}</div>
                    </div>
                    <div class="item">
                      <div class="label">Products Currently Distributed</div>
                      <div class="value">${productsDistributed.map((p) => `<span class="tag">${p}</span>`).join("")}</div>
                    </div>
                    <div class="item">
                      <div class="label">Primary Customer Segments</div>
                      <div class="value">${primaryCustomers.map((c) => `<span class="tag">${c}</span>`).join("")}</div>
                    </div>
                    <div class="item">
                      <div class="label">Monthly Customers Served</div>
                      <div class="value">${monthlyCustomers}</div>
                    </div>
                    <div class="item">
                      <div class="label">Interested Partnership Type</div>
                      <div class="value">${partnershipType}</div>
                    </div>
                    <div class="item">
                      <div class="label">Interested KavachX Solutions</div>
                      <div class="value">${interestedSolutions.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
                    </div>
                    <div class="item">
                      <div class="label">Business & Interest Overview</div>
                      <div class="value" style="white-space: pre-wrap; font-size: 14px; color: #d4d4d8;">${businessOverview}</div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  Registration ID: ${newRegistration._id}<br>
                  Received on ${timestamp} (IST) • KavachX Partner Network
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        // Vendor Confirmation Email HTML
        const vendorEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head><style>${commonStyles}</style></head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <div class="logo">KAVACH X</div>
                  <div class="badge">Partner Application Received</div>
                </div>
                <div class="body" style="text-align: center;">
                  <h2 style="font-size: 22px; color: #ffffff; margin-bottom: 12px;">Thank you for registering with KavachX!</h2>
                  <p style="font-size: 15px; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px;">
                    Hi <strong>${contactPersonName}</strong>,<br>
                    We have successfully received your KavachX Vendor & Channel Partner Registration for <strong>${companyName}</strong>.
                  </p>
                  
                  <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 24px;">
                    <div style="font-size: 13px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Registration Summary</div>
                    <div style="font-size: 14px; color: #d4d4d8; line-height: 1.8;">
                      • <strong>Company:</strong> ${companyName}<br>
                      • <strong>Location:</strong> ${city}, ${state}<br>
                      • <strong>Partnership Type:</strong> ${partnershipType}<br>
                      • <strong>Solutions Interested:</strong> ${interestedSolutions.join(", ")}
                    </div>
                  </div>

                  <div style="background-color: #18181b; border: 1px solid #3f3f46; border-radius: 8px; padding: 16px; color: #e4e4e7; font-size: 14px;">
                    🤝 <strong>Next Steps:</strong> Our Partner Relations team will review your application and contact you at <strong>${phone}</strong> / <strong>${email}</strong> regarding channel opportunities and onboarding.
                  </div>
                </div>
                <div class="footer">
                  KavachX AI Surveillance Network • <a href="https://kavachx.com" style="color: #71717a;">www.kavachx.com</a>
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
            subject: `🤝 New Vendor Partner Registration: ${companyName} (${contactPersonName})`,
            html: adminEmailHtml,
          }),
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `KavachX Vendor Partner Application Received - ${companyName}`,
            html: vendorEmailHtml,
          }),
        ]).catch((mailError) => {
          console.error("❌ Nodemailer async error in vendor registration action:", mailError);
        });
      } catch (mailError) {
        console.error("❌ Nodemailer error in vendor registration action:", mailError);
      }
    } else {
      console.warn(
        "⚠️ EMAIL_USER or EMAIL_PASS is missing in .env! Email notification skipped. Registration saved to MongoDB."
      );
    }

    return {
      success: true,
      message: "Vendor partner registration submitted successfully!",
      registrationId: newRegistration._id.toString(),
    };
  } catch (error: any) {
    console.error("Error in submitVendorRegistrationAction:", error);
    return {
      success: false,
      message: error?.message || "Something went wrong while submitting. Please try again.",
    };
  }
}
