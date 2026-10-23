# Microsoft Clarity Integration Plan

This plan outlines the integration of Microsoft Clarity into the KavachX Next.js App Router project using the official `@microsoft/clarity` NPM package alongside the existing Google Analytics 4 setup.

---

## User Review Required

> [!IMPORTANT]
> - **Coexistence with GA4:** Clarity operates independently alongside GA4 without interfering with existing structured event tracking, conversions, or layout structure.
> - **Environment-driven Configuration:** The Clarity Project ID (`ydfm0q7tlk`) will be configured via `NEXT_PUBLIC_CLARITY_PROJECT_ID` in `.env.local` (ignored by git) and production hosting environment variables. It will **not** be hardcoded in application source code.
> - **Zero PII & Default Masking:** Clarity's default privacy masking protections remain fully active. No custom PII will be transmitted.
> - **React Strict Mode & SSR Safety:** A dedicated client component ([`components/clarity-analytics.tsx`](file:///home/dev/codes/kavachX-frontend/KavachX/components/clarity-analytics.tsx)) will ensure `Clarity.init()` executes strictly in the browser, exactly once, preventing double initialization during React Strict Mode re-renders in development.

---

## Proposed Changes

### Configuration & Environment

#### [MODIFY] [.env.example](file:///home/dev/codes/kavachX-frontend/KavachX/.env.example)
- Append the new environment variable with an empty value:
  ```env
  # Microsoft Clarity
  NEXT_PUBLIC_CLARITY_PROJECT_ID=
  ```

#### [NEW] [.env.local](file:///home/dev/codes/kavachX-frontend/KavachX/.env.local) (Ignored by git)
- Configure your local development Project ID:
  ```env
  NEXT_PUBLIC_CLARITY_PROJECT_ID=ydfm0q7tlk
  ```
- Confirm with `git check-ignore` that `.env.local` is strictly ignored by git.

---

### Component Integration

#### [NEW] [components/clarity-analytics.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/components/clarity-analytics.tsx)
- Create a lightweight client component using `"use client"`.
- Import `Clarity` from `@microsoft/clarity`.
- Read `process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim()`.
- Use a module-scoped initialization guard (`let isInitialized = false;`) inside `useEffect` to ensure `Clarity.init(projectId)` is called exactly once.
- Wrap execution in a try/catch block so analytics never breaks the UI.
- Return `null` to avoid any DOM or layout shifts.

#### [MODIFY] [app/layout.tsx](file:///home/dev/codes/kavachX-frontend/KavachX/app/layout.tsx)
- Import `ClarityAnalytics` from `@/components/clarity-analytics`.
- Mount `<ClarityAnalytics />` inside `<body>`.
- Preserve all existing fonts, metadata, providers, and GA4 `<GoogleAnalytics />` component.

---

### Documentation

#### [NEW] [docs/analytics.md](file:///home/dev/codes/kavachX-frontend/KavachX/docs/analytics.md)
- Detail the dual-analytics architecture:
  - **GA4:** Quantitative & product analytics (traffic, user acquisition, funnel drop-off, key conversion events).
  - **Microsoft Clarity:** Qualitative & behavioral analytics (session recordings, heatmaps, rage/dead clicks, scroll depth, UX friction).
- Document environment variables across Development, Staging, and Production.
- Document privacy masking and consent status.
- Step-by-step verification instructions for local dev, deployed Vercel site (`https://kavach-x-one.vercel.app`), browser network devtools (`https://www.clarity.ms/collect`), and Clarity dashboard.

---

## Verification Plan

### Automated Verification
1. **TypeScript Typecheck:** Run `npx tsc --noEmit` to ensure zero compilation or typing errors.
2. **ESLint:** Run `npx eslint components/clarity-analytics.tsx app/layout.tsx` to verify clean code quality.
3. **Production Build:** Run `npm run build` (`next build --webpack`) to verify clean compilation with exit code 0.
4. **Git Security Check:** Run `git status` and `git check-ignore` to confirm `.env.local` is not tracked.

### Manual / Browser Verification
1. Verify Clarity script injection (`https://www.clarity.ms/tag/ydfm0q7tlk?ref=npm`) in browser network tab when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set.
2. Verify zero scripts injected when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is omitted.
3. Inspect Network tab for `https://www.clarity.ms/collect` POST requests during interaction.
4. Verify recording session data appears on Microsoft Clarity project dashboard.
