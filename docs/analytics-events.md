# KavachX — Google Analytics 4 (GA4) Event Tracking Documentation

This document specifies the production-grade GA4 event taxonomy implemented across the KavachX web application.

---

## 1. Overview & Architecture

All analytics events in KavachX are centralized through [`lib/analytics.ts`](../lib/analytics.ts) using the `trackEvent` function.

### Key Technical Characteristics
- **Zero Runtime Overhead:** If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not configured or empty, `trackEvent` safely no-ops with zero warnings and zero network calls.
- **Privacy & PII Protection:** No personal data (name, email, phone number, message text, passwords) is ever transmitted to Google Analytics. Only non-PII identifiers and operational metadata are sent.
- **App Router Friendly:** Standard page views are handled natively by GA4 Enhanced Measurement using browser history change events. No duplicate page_view events are triggered.
- **Fail-Safe:** All event dispatches are wrapped in exception protection ensuring an analytics failure can never break the application's user interface or core workflows.

---

## 2. Implemented Event Taxonomy

### P0 — Critical Business & Conversion Events

#### `generate_lead`
- **Priority:** P0 (Highest)
- **GA4 Classification:** Recommended Event (`generate_lead`)
- **Key Event (Conversion):** **Yes — Primary Key Event**
- **Trigger:** Fired only when the contact/lead form backend returns a successful response (`res.success === true`).
- **Page / Component:** [`components/cta.tsx`](../components/cta.tsx) (rendered on `/contact` and `/` homepage)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `form_name` | string | Name of the form | `"contact_form"` |
  | `status` | string | Result status | `"success"` |
- **Business Purpose:** Measures core business conversions (enterprise inquiries, pre-orders, partner applications).
- **Decisions Informed:** Informs ROI on marketing campaigns, landing page conversion rate optimization (CRO), and channel attribution.

#### `form_error`
- **Priority:** P0 (Diagnostic)
- **GA4 Classification:** Custom Event
- **Key Event (Conversion):** No
- **Trigger:** Fired when a form submission fails (either rejected by the server action or encountering a network exception).
- **Page / Component:** [`components/cta.tsx`](../components/cta.tsx)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `form_name` | string | Name of the form | `"contact_form"` |
  | `error_type` | string | Error category | `"submission_failed"` or `"network_or_server_error"` |
- **Business Purpose:** Detects lead loss, email delivery outages, or network connectivity obstacles.

---

### P1 — Important User Engagement & Intent Events

#### `cta_click`
- **Priority:** P1
- **GA4 Classification:** Custom Event
- **Key Event (Conversion):** **Yes — Secondary Key Event**
- **Trigger:** User clicks a primary high-intent Call-To-Action button.
- **Pages / Components:**
  - Desktop & Mobile Navigation (`components/navbar.tsx`): "Contact Us"
  - Vendor Partner Program (`components/vendor-page-client.tsx`): "Become a Partner", "Become a Vendor Partner"
  - KAIROS Product Page (`components/kairos-page-client.tsx`): "Pre-order KAIROS Today", "Become a Vendor"
  - Homepage Product Sections (`components/suraksha-kavach-section.tsx`, `components/kairos-section.tsx`): "Explore Features", "Check More"
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `cta_name` | string | Stable CTA identifier | `"preorder_kairos"`, `"become_partner"`, `"contact_us"`, `"explore_features"`, `"check_more_kairos"` |
  | `cta_location` | string | UI placement of the CTA | `"navbar_desktop"`, `"vendor_hero"`, `"vendor_final_cta"`, `"kairos_final_cta"`, `"home_kairos_section"` |
  | `destination` | string | Destination route | `"/contact"`, `"/vendor"`, `"/kairos"`, `"/suraksha-kavach"` |
- **Business Purpose:** Tracks micro-conversions and evaluates which page sections most effectively motivate users toward contact and partnership.

#### `select_content`
- **Priority:** P1
- **GA4 Classification:** Recommended Event (`select_content`)
- **Key Event (Conversion):** No
- **Trigger:** User clicks on an article card in the KavachX Intelligence publication.
- **Pages / Components:** [`components/blog/blog-card.tsx`](../components/blog/blog-card.tsx), [`components/blog/featured-blog-card.tsx`](../components/blog/featured-blog-card.tsx)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `content_type` | string | Type of content | `"article"` |
  | `item_id` | string | Slug of the article | `"redefining-edge-ai-kairos"` |
  | `item_name` | string | Title of the article | `"Redefining Edge AI: How KAIROS Achieves Zero-Latency Processing"` |
- **Business Purpose:** Identifies top-performing topics and articles that attract prospective clients and technical partners.

#### `app_download_intent`
- **Priority:** P1
- **GA4 Classification:** Custom Event
- **Key Event (Conversion):** **Yes — Pre-launch demand indicator**
- **Trigger:** User clicks on "Google Play" or "Coming on Play Store soon" for Suraksha Kavach.
- **Pages / Components:** [`components/suraksha-hero-button.tsx`](../components/suraksha-hero-button.tsx), [`components/cta-steps.tsx`](../components/cta-steps.tsx)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `platform` | string | Distribution platform | `"google_play"` |
  | `status` | string | Availability status | `"coming_soon"` |
  | `source_location` | string | Originating section | `"suraksha_kavach_hero"`, `"suraksha_kavach_steps"` |
- **Business Purpose:** Quantifies market anticipation and consumer readiness for the mobile app prior to public Play Store availability.

---

### P2 — Useful Secondary Events

#### `faq_toggle`
- **Priority:** P2
- **GA4 Classification:** Custom Event
- **Key Event (Conversion):** No
- **Trigger:** User expands an FAQ accordion item to read an answer.
- **Pages / Components:** [`components/faq.tsx`](../components/faq.tsx), [`components/vendor-page-client.tsx`](../components/vendor-page-client.tsx)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `faq_question` | string | The question being inspected | `"What is Kairos?"`, `"How much can I earn from a KAIROS installation?"` |
  | `faq_section` | string | Section context | `"homepage_faq"`, `"vendor_page"` |
- **Business Purpose:** Identifies user objections, information gaps, and common doubts regarding CCTV integration or partner economics.

#### `social_link_click`
- **Priority:** P2
- **GA4 Classification:** Custom Event
- **Key Event (Conversion):** No
- **Trigger:** User clicks an outbound link to one of KavachX's social media channels (X/Twitter, LinkedIn, Instagram, Facebook).
- **Pages / Components:** [`components/cta.tsx`](../components/cta.tsx), [`components/footer.tsx`](../components/footer.tsx)
- **Parameters:**
  | Parameter | Type | Description | Example |
  |---|---|---|---|
  | `platform` | string | Social network | `"x"`, `"linkedin"`, `"instagram"`, `"facebook"` |
  | `location` | string | UI placement | `"connect_us"`, `"footer"` |
- **Business Purpose:** Measures social audience acquisition and channel affinity.

---

## 3. Events Intentionally Excluded

| Event | Reason for Exclusion |
|---|---|
| Manual `page_view` hooks | Handled natively and automatically by GA4 Enhanced Measurement across Next.js App Router history events. Manual tracking causes duplicate counts. |
| Admin actions (`/admin/*`) | Internal dashboard and CMS activity would pollute visitor analytics and bias conversion rates. |
| Generic hover, scroll %, or button taps | Produces noisy data volume with zero actionable business value and exhausts GA4 event quotas. |

---

## 4. GA4 Key Event (Conversion) Setup Guide

When the production Measurement ID is activated in Google Analytics:
1. Navigate to **Admin** > **Data display** > **Events**.
2. Find or register the following events:
   - `generate_lead`
   - `cta_click`
   - `app_download_intent`
3. Toggle the switch **Mark as key event** for:
   - `generate_lead` (Primary macro-conversion)
   - `cta_click` (Secondary micro-conversion)
   - `app_download_intent` (Pre-launch demand metric)
