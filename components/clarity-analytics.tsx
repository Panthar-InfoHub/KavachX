"use client";

import Script from "next/script";

/**
 * Microsoft Clarity Analytics client integration.
 * - Injects the official Microsoft Clarity tracking script snippet via Next.js Script strategy="afterInteractive".
 * - Uses NEXT_PUBLIC_CLARITY_PROJECT_ID from environment variables with fallback to "ydfm0q7tlk".
 * - Next.js Script id="microsoft-clarity" prevents duplicate script injections across client navigations.
 * - Safely queues any calls to window.clarity prior to and after tag script load.
 * - Renders null if no project ID is configured.
 */
export function ClarityAnalytics() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || "ydfm0q7tlk";

  if (!projectId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${projectId}");
        `,
      }}
    />
  );
}

