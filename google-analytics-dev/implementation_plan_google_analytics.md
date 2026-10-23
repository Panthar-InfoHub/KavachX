# Google Analytics 4 (GA4) Integration Plan

This plan details the production-grade integration of Google Analytics 4 (GA4) into KavachX using `@next/third-parties/google` in the Next.js App Router. The integration is engineered to remain completely inert when no Measurement ID is provided, activating automatically only when a valid `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.

## User Review Required

> [!NOTE]
> - **No Measurement ID provided or hardcoded:** In accordance with your requirements, no placeholder or fake Measurement ID will be used.
> - **Zero runtime or build overhead when absent:** If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is missing or empty, no GA scripts, `dataLayer`, or network requests will be generated.
> - **Page Views & App Router:** GA4 Enhanced Measurement natively tracks browser history changes (client-side route transitions in Next.js App Router). We avoid manual `page_view` triggers to prevent duplicate counts.
> - **Privacy & Consent Status:** No existing cookie consent mechanism was detected in the project. We will document the privacy requirements for future activation.

## Proposed Changes

### Configuration & Environment

#### [MODIFY] [.env.example](file:///home/dev/codes/kavachX-frontend/KavachX/.env.example)
- Append the new analytics environment variable with an empty value:
  ```env
  # Google Analytics 4
  NEXT_PUBLIC_GA_MEASUREMENT_ID=
  ```
- Keep all existing variables untouched.

#### [MODIFY] [.gitignore](file:///home/dev/codes/kavachX-frontend/KavachX/.gitignore)
- Ensure `.env.example` remains tracked and not accidentally ignored by adding an exception `!.env.example` directly following `.env*`.
- Ensure `.env.local` remains ignored.

---

### Root Layout

#### [MODIFY] [app/layout.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/app/layout.tsx)
- Import `GoogleAnalytics` from `@next/third-parties/google`.
- Safely read `const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()`.
- Conditionally render `<GoogleAnalytics gaId={gaMeasurementId} />` directly inside the root `<body>` (alongside `Toaster` and footer components) only when `gaMeasurementId` is non-empty.
- Preserve all fonts, metadata, styles, providers, and layout structure intact.

---

## Privacy & Consent Assessment

- **Current Repository State:** Inspection of `package.json`, `app/`, `components/`, and `lib/` confirmed that no cookie consent banner, CMP (Consent Management Platform), or consent mode configuration currently exists in the project.
- **Production Recommendation:** If the site serves users in jurisdictions requiring opt-in consent for analytics cookies/identifiers (e.g., GDPR/ePrivacy in the EU or UK), a consent banner or Google Consent Mode v2 setup should be implemented prior to enabling the production Measurement ID.

---

## Verification Plan

### Automated Verification
1. **TypeScript Typecheck:** Run `npx tsc --noEmit` to ensure zero type errors.
2. **ESLint:** Run `npx eslint app/layout.tsx` to verify zero lint errors in the modified file.
3. **Production Build (Without Measurement ID):**
   - Run `npm run build` with `NEXT_PUBLIC_GA_MEASUREMENT_ID` unset.
   - Confirm build passes with exit code 0 and no script tags are generated for GA.
4. **Production Build Simulation (With Test Measurement ID):**
   - Run a test verification build with `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TESTVERIFY12` to verify that Next.js and `@next/third-parties/google` compile properly with the ID present.
   - Remove any temporary test configuration so no fake ID persists.

### Next Steps for You (When Production Domain is Ready)
Once your production domain is active and you create the Web Data Stream in your GA4 property:
1. Copy the `G-XXXXXXXXXX` Measurement ID from the GA4 Web stream details.
2. In your production hosting environment (e.g., Vercel, AWS, or Docker/VPS), set environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`.
3. Redeploy or restart the Next.js application.
