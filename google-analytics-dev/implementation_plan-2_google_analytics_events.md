# Google Analytics 4 (GA4) Event Tracking Implementation Plan

This plan establishes a production-grade, privacy-safe Google Analytics 4 (GA4) event tracking system for KavachX, based strictly on the actual routes, user journeys, and conversion paths discovered in the repository.

---

## User Review Required

> [!IMPORTANT]
> - **Autonomous Discovery & Taxonomy:** Events are derived exclusively from real interactive components and conversion funnels in the KavachX codebase (`/contact`, `/vendor`, `/kairos`, `/suraksha-kavach`, `/blogs`).
> - **Zero PII Guarantee:** Form contents (`name`, `email`, `phone`, `message`) will **never** be passed to Google Analytics. Only metadata (`form_name`, `status`) is tracked.
> - **Safe No-Op Architecture:** In development or any environment without `NEXT_PUBLIC_GA_MEASUREMENT_ID`, event calls cleanly no-op with zero console noise or runtime errors.
> - **No Page View Code Duplication:** Next.js App Router client-side page views are handled natively by GA4 Enhanced Measurement (browser history change listeners).

---

## Project Analysis & Discovered User Journeys

Based on codebase inspection, KavachX operates as an enterprise safety infrastructure and AI physical security provider with five primary user journeys:

1. **Lead Generation / Organization Inquiries (Core Conversion Funnel):**
   - Visitor reads product capabilities on `/`, `/kairos`, or `/contact`.
   - Clicks primary CTAs ("Contact Us", "Pre-order KAIROS Today", "Leave us a Message").
   - Submits contact form in `components/cta.tsx`. The server action `sendMsgAction` processes the inquiry.
2. **B2B Vendor Partner Recruitment:**
   - Security dealers and distributors visit `/vendor` to learn about the 20% hardware commission and recurring model.
   - Click "Become a Partner" or "Become a Vendor Partner", funneling into `/contact`.
3. **Product Discovery & Deep Dives (KAIROS & Suraksha Kavach):**
   - Visitors explore the KAIROS AI edge box (`/kairos`) and Suraksha Kavach mobile safety app (`/suraksha-kavach`).
   - High-intent actions include clicking pre-orders and app store pre-launch buttons.
4. **Editorial & Authority Building (KavachX Intelligence):**
   - Readers explore engineering and AI research articles at `/blogs` and `/blogs/[slug]`.
   - Clicks on article cards (`BlogCard`, `FeaturedBlogCard`) signify content consumption.
5. **Community & Social Discovery:**
   - Visitors interact with social media channels (X, LinkedIn, Instagram, Facebook) in CTA and footer sections.

---

## Event Taxonomy

### P0 — Critical Business & Conversion Events
| Event Name | Trigger | Location | Parameters | GA4 Classification | Key Event? |
|---|---|---|---|---|---|
| `generate_lead` | Server action confirms successful contact form submission (`res.success === true`) | [`components/cta.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta.tsx) | `form_name: "contact_form"`, `status: "success"` | Recommended Event | **Yes (Primary)** |
| `form_error` | Server action fails or network error occurs | [`components/cta.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta.tsx) | `form_name: "contact_form"`, `error_type: "submission_failed"` | Custom Event | No (Diagnostic) |

### P1 — Important User Engagement & Funnel Events
| Event Name | Trigger | Location | Parameters | GA4 Classification | Key Event? |
|---|---|---|---|---|---|
| `cta_click` | User clicks high-intent primary CTA buttons | Navbar, Hero, `/vendor`, `/kairos`, Ecosystem Bento | `cta_name: string`, `cta_location: string`, `destination: string` | Custom Event | Yes (Secondary) |
| `select_content` | User clicks to read a blog/intelligence article | [`components/blog/blog-card.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/blog/blog-card.tsx), [`featured-blog-card.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/blog/featured-blog-card.tsx) | `content_type: "article"`, `item_id: slug`, `item_name: title` | Recommended Event | No |
| `app_download_intent` | User clicks "Google Play" or "Coming on Play Store soon" | [`app/suraksha-kavach/page.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/app/suraksha-kavach/page.tsx), [`components/cta-steps.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta-steps.tsx) | `platform: "google_play"`, `status: "coming_soon"`, `source_location: string` | Custom Event | Yes (Pre-launch signal) |

### P2 — Useful Secondary Events
| Event Name | Trigger | Location | Parameters | GA4 Classification | Key Event? |
|---|---|---|---|---|---|
| `social_link_click` | User clicks external company social channel | [`components/cta.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta.tsx), [`components/footer.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/footer.tsx) | `platform: string`, `location: string` | Custom Event | No |
| `faq_toggle` | User expands an FAQ question accordion | [`components/faq.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/faq.tsx), [`components/vendor-page-client.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/vendor-page-client.tsx) | `faq_question: string`, `faq_section: string` | Custom Event | No |

### Events Intentionally NOT Tracked
- **Page Views (`page_view`):** Already handled automatically and accurately by GA4 Enhanced Measurement using browser history change detection.
- **Admin Dashboard Actions (`/admin/*`):** Internal CMS/admin activities should not dilute public audience behavior data.
- **Micro-interactions (hovers, scroll percentages, particle effects):** Excessive noise with zero actionable business value.

---

## Proposed Changes

### Core Architecture

#### [NEW] [lib/analytics.ts](file:///home/dev/codes/kavachX-frontend/KavachX/lib/analytics.ts)
- Centralized type-safe event dispatcher.
- Strongly typed discrimination union for all events and their strict parameters.
- Built-in checks for client-side environment and active `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Safe try/catch wrapper preventing any analytics failure from impacting application execution.

---

### Component Integrations

#### [MODIFY] [components/cta.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta.tsx)
- Trigger `trackEvent({ name: "generate_lead", ... })` on `res.success`.
- Trigger `trackEvent({ name: "form_error", ... })` on error / failure.
- Trigger `social_link_click` when clicking social links in "Connect Us".

#### [MODIFY] [components/navbar.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/navbar.tsx)
- Add `trackEvent({ name: "cta_click", params: { cta_name: "contact_us", cta_location: "navbar", destination: "/contact" } })` to the primary "Contact Us" button.

#### [MODIFY] [components/vendor-page-client.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/vendor-page-client.tsx)
- Track `cta_click` on Hero, Partner Economics, and Final CTA ("Become a Partner").
- Track `faq_toggle` when a question accordion is opened.

#### [MODIFY] [components/kairos-page-client.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/kairos-page-client.tsx)
- Track `cta_click` on "Pre-order KAIROS Today" and "Become a Vendor" CTAs.

#### [MODIFY] [components/suraksha-kavach-section.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/suraksha-kavach-section.tsx) & [components/kairos-section.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/kairos-section.tsx)
- Track `cta_click` on homepage section explore buttons.

#### [MODIFY] [app/suraksha-kavach/page.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/app/suraksha-kavach/page.tsx) & [components/cta-steps.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/cta-steps.tsx)
- Track `app_download_intent` on Play Store buttons.

#### [MODIFY] [components/blog/blog-card.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/blog/blog-card.tsx) & [components/blog/featured-blog-card.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/blog/featured-blog-card.tsx)
- Track `select_content` when an article card is clicked.

#### [MODIFY] [components/faq.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/faq.tsx)
- Track `faq_toggle` when an accordion item is expanded.

#### [MODIFY] [components/footer.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/footer.tsx)
- Track `social_link_click` on footer social icons.

---

### Documentation

#### [NEW] [docs/analytics-events.md](file:///home/dev/codes/kavachX-frontend/KavachX/docs/analytics-events.md)
- Complete documentation of all implemented events, parameters, triggers, and GA4 configuration instructions.

---

## Verification Plan

### Automated Verification
1. **TypeScript (`npx tsc --noEmit`):** Verify zero type errors across new and modified files.
2. **ESLint (`npx eslint`):** Verify zero lint issues in modified components.
3. **Production Build (`npm run build`):** Validate that `next build --webpack` completes with exit code 0 when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset.
4. **Simulation Build (`NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TESTVERIFY12 npm run build`):** Validate compilation with an active ID.
