# Meta Pixel Integration Plan — KavachX Production Codebase

This document presents the complete codebase analysis and technical implementation plan to integrate browser-side Meta Pixel into KavachX's existing production web application, operating cleanly alongside Google Analytics 4 (GA4) and Microsoft Clarity.

---

## 1. Phase 1 — Codebase Analysis Findings

### 1. Frontend Framework & Architecture
- **Framework:** Next.js 16.2.6 with React 19.2.4, TypeScript 5, and Tailwind CSS v4.
- **Router:** Next.js App Router (`app/` directory).
- **Rendering Model:** Static Site Generation (SSG) / Server Components by default with interactive client components designated by `"use client"`. Server actions (`lib/mail.action.ts`) handle email/lead submissions.
- **Root Layout:** `app/layout.tsx` is the central entry point wrapping all routes with global fonts, headers, footers, and third-party scripts.

### 2. Existing GA4 Implementation
- **Initialization:** Initialized in `app/layout.tsx` (line 126) via `<GoogleAnalytics gaId={gaMeasurementId} />` from `@next/third-parties/google`.
- **Page Views:** Automatically tracked natively through GA4 Enhanced Measurement using browser history state transitions.
- **Custom Events:** Centralized in `lib/analytics.ts` via `trackEvent(event: AnalyticsEvent)`.
- **Configuration:** Reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-NM0FYHXDER`).

### 3. Existing Microsoft Clarity Implementation
- **Initialization:** Initialized via dedicated client component `components/clarity-analytics.tsx` rendered in `app/layout.tsx` (line 125).
- **Loading:** Uses `@microsoft/clarity` package with a module-level `isInitialized` guard to prevent duplicate initialization during React Strict Mode mounts.
- **Configuration:** Reads `NEXT_PUBLIC_CLARITY_PROJECT_ID` (`ydfm0q7tlk`).

### 4. Existing Environment Variable Architecture
- `.env.local`: Local developer overrides (ignored by Git).
- `.env`: Backend credentials (MongoDB, Better Auth, Cloudinary - ignored by Git).
- `.env.example`: Public template documenting required environment keys.
- **Convention:** Client-accessible variables require the `NEXT_PUBLIC_` prefix.
- **Meta Pixel Key:** `NEXT_PUBLIC_META_PIXEL_ID=1686673549111473`.
- **Security Guardrail:** No server secrets or Conversions API tokens will be exposed to the client or added to any `NEXT_PUBLIC_` variable.

### 5. Existing Routing & Navigation
- Uses Next.js App Router SPA navigation with `next/link` and `usePathname()`.
- Client-side navigation updates the URL history state without reloading the document.
- Meta Pixel must track:
  1. The initial page load.
  2. Subsequent client-side route changes (e.g., navigating to `/kairos`, `/vendor`, `/contact`).
- Page view tracking must be guarded to prevent double-counting.

### 6. Conversion Actions & User Intent in KavachX
- **Lead / Contact Submission (Macro Conversion):** Handled in `components/cta.tsx` via `sendMsgAction`. Currently fires `trackEvent({ name: "generate_lead" })` **strictly** upon confirmed success (`res.success === true`).
- **High-Intent CTAs (Micro Conversions):**
  - "Pre-order KAIROS Today" (`components/kairos-page-client.tsx` -> `/contact`)
  - "Become a Partner" / "Become a Vendor Partner" (`components/vendor-page-client.tsx` -> `/contact`)
  - "Contact Us" (`components/navbar.tsx` -> `/contact`)
- **App Download Intent:** "Coming on Play Store soon" clicks (`components/suraksha-hero-button.tsx`, `components/cta-steps.tsx`).
- **Content Viewing:** Article card clicks (`components/blog/blog-card.tsx`, `components/blog/featured-blog-card.tsx`).
- **Diagnostic / Error Events:** Form submission failures in `components/cta.tsx`.
- **Admin Dashboard Actions:** Internal CMS operations at `/admin/*` are intentionally excluded from marketing analytics.

### 7. Existing Analytics Abstraction
- `lib/analytics.ts` is the single source of truth for event dispatching across the application.
- Over 10 client components already call `trackEvent()`.
- Integrating Meta Pixel directly into `trackEvent()` automatically equips every existing trigger in the application without touching dozens of individual UI components.

### 8. Existing Meta Code & Privacy
- **Existing Meta Code:** None found (zero existing `fbq`, `fbevents.js`, or GTM tags).
- **Privacy & PII Protection:** No raw form inputs (names, emails, phone numbers, messages) are ever passed to the analytics layer. Only non-PII metadata (`form_name: "contact_form"`, `status: "success"`) is dispatched.
- **Consent Mechanism:** No cookie consent banner currently exists in the repository. We will document consent integration readiness for Meta Pixel in the final report.

---

## 2. Proposed Architecture & Data Flow

```
                        trackEvent(event)
                                |
        +-----------------------+-----------------------+
        |                                               |
       GA4                                         Meta Pixel
(window.gtag)                                     (window.fbq)
        |                                               |
- generate_lead                                 - track("Lead")
- select_content                                - track("ViewContent")
- cta_click                                     - trackCustom("CtaClick")
- app_download_intent                           - trackCustom("AppDownloadIntent")
- social_link_click                             - trackCustom("SocialLinkClick")
- faq_toggle                                    - trackCustom("FaqToggle")
- form_error                                    - trackCustom("FormError")
```

---

## 3. Detailed Proposed Changes

### [NEW] `components/meta-pixel.tsx`
Create a dedicated client component that:
1. Safely no-ops if `NEXT_PUBLIC_META_PIXEL_ID` is unset or empty.
2. Injects the standard Meta Pixel script (`https://connect.facebook.net/en_US/fbevents.js`) using Next.js `Script` with `strategy="afterInteractive"`.
3. Calls `fbq('init', pixelId)`. Note: we do **not** call `fbq('track', 'PageView')` inside the inline script tag to avoid duplicate page views.
4. Contains an internal `MetaPixelTracker` client component wrapped in `<Suspense fallback={null}>` that listens to `usePathname()` and `useSearchParams()`.
5. Employs a URL-tracking ref (`lastTrackedUrl`) to ensure:
   - Initial page load fires `PageView` exactly once.
   - SPA route changes fire `PageView` exactly once per destination.
   - React 19 Strict Mode double-invocation in development does not duplicate PageView calls.
6. Renders a `<noscript>` fallback image for non-JS clients.

### [MODIFY] `lib/analytics.ts`
1. Add `fbq` and `_fbq` definitions to `Window` interface.
2. Add reusable helper functions:
   - `getMetaPixelId(): string | undefined`
   - `initializeMetaPixel(pixelId?: string): void`
   - `trackMetaPageView(): void`
   - `trackMetaEvent(eventName: string, params?: Record<string, unknown>, isCustom?: boolean): void`
3. Update `trackEvent(event: AnalyticsEvent)`:
   - Decouple GA4 dispatch and Meta Pixel dispatch so that one does not block the other if an ID is missing.
   - Map `generate_lead` -> `trackMetaEvent("Lead", { content_name: event.params.form_name, status: event.params.status })`.
   - Map `select_content` -> `trackMetaEvent("ViewContent", { content_type: event.params.content_type, content_ids: [event.params.item_id], content_name: event.params.item_name })`.
   - Map other custom events (`cta_click`, `app_download_intent`, `social_link_click`, `faq_toggle`, `form_error`) to `trackCustom`.
   - Optionally notify `window.clarity("event", event.name)` if Clarity is present.

### [MODIFY] `app/layout.tsx`
1. Import `MetaPixel` from `@/components/meta-pixel`.
2. Render `<MetaPixel />` alongside `<ClarityAnalytics />` and `<GoogleAnalytics />` in `RootLayout`.

### [MODIFY] `.env.example` & `.env.local`
1. Add `NEXT_PUBLIC_META_PIXEL_ID=` to `.env.example`.
2. Add `NEXT_PUBLIC_META_PIXEL_ID=1686673549111473` to `.env.local`.

### [MODIFY] Documentation Files
1. Update `docs/analytics.md` to cover Meta Pixel alongside GA4 and Clarity.
2. Update `docs/analytics-events.md` to document the unified mapping of all events to GA4 and Meta Pixel.

---

## 4. Event Taxonomy & Mapping

| KavachX Action | Trigger Component / File | Current GA4 Event | Meta Pixel Event | Meta Event Type | Payload Parameters |
|---|---|---|---|---|---|
| **Form Submitted Successfully** | `components/cta.tsx` (`res.success === true`) | `generate_lead` | `Lead` | **Standard** | `{ content_name: "contact_form", status: "success" }` |
| **Article / Content Click** | `components/blog/blog-card.tsx` | `select_content` | `ViewContent` | **Standard** | `{ content_type: "article", content_ids: [item_id], content_name: item_name }` |
| **High-Intent CTA Click** | `components/navbar.tsx`, `components/vendor-page-client.tsx`, `components/kairos-page-client.tsx` | `cta_click` | `CtaClick` | **Custom** | `{ cta_name, cta_location, destination }` |
| **App Download Intent** | `components/suraksha-hero-button.tsx`, `components/cta-steps.tsx` | `app_download_intent` | `AppDownloadIntent` | **Custom** | `{ platform, status, source_location }` |
| **Social Channel Click** | `components/cta.tsx`, `components/footer.tsx` | `social_link_click` | `SocialLinkClick` | **Custom** | `{ platform, location }` |
| **FAQ Expand** | `components/faq.tsx`, `components/vendor-page-client.tsx` | `faq_toggle` | `FaqToggle` | **Custom** | `{ faq_question, faq_section }` |
| **Form Submission Error** | `components/cta.tsx` | `form_error` | `FormError` | **Custom** | `{ form_name, error_type }` |
| **Page Navigation** | Route change listener in `components/meta-pixel.tsx` | Native history `page_view` | `PageView` | **Standard** | Native browser URL & document title |

---

## 5. Verification Plan

### Automated Verification
1. **Type Checking & Lint:**
   - Run `npm run lint` to ensure zero ESLint errors.
   - Run `npx tsc --noEmit` to ensure zero TypeScript compiler issues.
2. **Production Build:**
   - Run `npm run build` to verify SSR, SSG, chunking, and Suspense boundaries build cleanly without hydration or static bail-out errors.

### Runtime Verification (Browser & DevTools)
1. Launch development server with `NEXT_PUBLIC_META_PIXEL_ID=1686673549111473`.
2. Open Chrome DevTools Network Tab:
   - Filter by `facebook.net` or `fbevents.js` (Verify status 200 OK).
   - Filter by `tr/?id=1686673549111473`:
     - Initial load: Exactly 1 `ev=PageView`.
     - Click to navigate to `/kairos`: Exactly 1 `ev=PageView` for `/kairos`.
     - Click to navigate to `/contact`: Exactly 1 `ev=PageView` for `/contact`.
     - Click a CTA button: Verify `ev=CtaClick` is sent.
     - Submit contact form: Verify `ev=Lead` is sent **only** after successful response.
3. Verify GA4 (`googletagmanager.com`) and Clarity (`clarity.ms`) continue to operate with zero interference.
4. Verify Console shows zero warnings, hydration errors, or duplicate tracking alerts.
