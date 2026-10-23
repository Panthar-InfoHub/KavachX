# KavachX Analytics Architecture: GA4 & Microsoft Clarity

This document explains the unified dual-analytics setup in KavachX, outlining the distinct responsibilities of Google Analytics 4 (GA4) and Microsoft Clarity, their configuration across environments, privacy safeguards, and verification procedures.

---

## 1. Dual-Analytics Architecture Overview

KavachX employs a complementary analytics strategy:

| Dimension | Google Analytics 4 (GA4) | Microsoft Clarity |
|---|---|---|
| **Role** | **Quantitative & Product Analytics** | **Qualitative & Behavioral UX Analytics** |
| **Core Capabilities** | Traffic sources, campaign attribution, user counts, page paths, event tracking, custom conversions. | Session replay recordings, visual click heatmaps, scroll depth, rage clicks, dead clicks, UX drop-off. |
| **Implementation** | `@next/third-parties/google` in `app/layout.tsx` + centralized `trackEvent()` in `lib/analytics.ts`. | `@microsoft/clarity` via dedicated client component `components/clarity-analytics.tsx`. |
| **Environment Variable** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `NEXT_PUBLIC_CLARITY_PROJECT_ID` |
| **Key Output** | "How many users submitted the contact form? What channels drove the most partner signups?" | "Why did visitors abandon the form? Where did users click erratically on the KAIROS product page?" |

---

## 2. Environment Configuration

Both systems are driven purely by environment variables with no hardcoded IDs in source code.

### Summary Table

| Environment | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Behavior |
|---|---|---|---|
| **Local Development** | Unset or empty (in `.env.local`) | `ydfm0q7tlk` (configured in `.env.local`) | Clarity records local testing sessions if desired; GA4 remains inert. |
| **Staging / Preview** | `G-NM0FYHXDER` | `ydfm0q7tlk` | Full staging behavioral tracking and pre-production event validation. |
| **Production** | `G-NM0FYHXDER` | `ydfm0q7tlk` | Full dual-analytics active on live traffic. |

### How to Configure

#### 1. Local Development
Store your local variables in `.env.local` (this file is excluded from Git via `.gitignore`):
```env
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NM0FYHXDER
NEXT_PUBLIC_CLARITY_PROJECT_ID=ydfm0q7tlk
```

#### 2. Vercel / Production Deployment
1. Go to your Vercel Project Dashboard (`https://vercel.com/`) > select project `kavachX-frontend` or `kavach-x-one`.
2. Navigate to **Settings** > **Environment Variables**.
3. Add the following environment variables:
   - **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-NM0FYHXDER`
   - **Target Environments:** Production, Preview, Development
   - Click **Save**.
4. Ensure Clarity is also configured:
   - **Key:** `NEXT_PUBLIC_CLARITY_PROJECT_ID`
   - **Value:** `ydfm0q7tlk`
   - **Target Environments:** Production, Preview, Development
   - Click **Save**.
5. Trigger a **Redeploy** on Vercel so the build includes the `NEXT_PUBLIC_` client-side environment variables.

---

## 3. Privacy, Masking & Sensitive Content

- **Default Masking:** Microsoft Clarity's default privacy mode is maintained. All user keystrokes in `<input>` and `<textarea>` elements, passwords, and sensitive information are automatically masked on the client before leaving the browser.
- **Zero PII Transmission:** Neither GA4 nor Clarity transmit names, email addresses, phone numbers, or free-form contact messages.
- **Consent Readiness:** Neither system bypasses regional consent rules. For deployment in GDPR/ePrivacy jurisdictions, integrate a consent banner (or Google Consent Mode v2 + Clarity `Clarity.consent()` API) before activating production IDs.

---

## 4. Verification & Validation Procedures

### A. Local Installation Verification
1. Run `npm run dev`.
2. Open `http://localhost:3000` in Google Chrome or Firefox.
3. Open DevTools (**F12**) > **Network** tab.
4. **Verify Google Analytics 4:**
   - Filter by `googletagmanager` or `G-NM0FYHXDER`.
   - Confirm script `https://www.googletagmanager.com/gtag/js?id=G-NM0FYHXDER` loads with status `200 OK`.
   - Filter by `collect` to see incoming events dispatched to Google Analytics.
5. **Verify Microsoft Clarity:**
   - Filter by `clarity`.
   - Confirm script `https://www.clarity.ms/tag/ydfm0q7tlk?ref=npm` loads with status `200 OK`.
   - Confirm subsequent POST requests to `https://www.clarity.ms/collect` are dispatched as you interact.
6. Check the Console to confirm zero duplicate tracking warnings or script errors.

### B. Deployed Website & Realtime Dashboard Verification
1. Open the **[Google Analytics Console](https://analytics.google.com/)** and select property for `G-NM0FYHXDER`.
2. Navigate to **Reports** > **Realtime**.
3. Open `https://kavach-x-one.vercel.app` (or your local dev site with the ID active) in a browser tab.
4. In Google Analytics Realtime:
   - Within 10–30 seconds, observe **Users in Last 30 Minutes** update to at least `1`.
   - Observe real-time **Views by Page title and screen name** reflecting your current page.
   - Click a CTA (such as "Contact Us" or "Pre-order KAIROS Today") to observe custom events (`cta_click`) streaming into the **Event count by Event name** card in Realtime.
5. In **Microsoft Clarity Dashboard** (`https://clarity.microsoft.com/`):
   - Check the **Dashboard** overview tab for active session counts.
   - Check the **Recordings** tab to review session replays.
