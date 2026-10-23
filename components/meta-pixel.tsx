"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { trackMetaPageView } from "@/lib/analytics";

/**
 * Route-change listener for Meta Pixel.
 * - Must be wrapped in <Suspense> to prevent Next.js App Router from de-opting to client-only rendering during SSR/SSG.
 * - Uses a ref guard to ensure initial load and route changes trigger PageView exactly once.
 * - Prevents duplicate PageView events during React 19 Strict Mode development re-mounts.
 */
function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    const queryString = searchParams?.toString();
    const currentUrl = queryString ? `${pathname}?${queryString}` : pathname;

    if (lastTrackedUrl.current === currentUrl) return;
    lastTrackedUrl.current = currentUrl;

    trackMetaPageView();
  }, [pathname, searchParams]);

  return null;
}

/**
 * Production-grade Meta (Facebook) Pixel client integration.
 * - Reads NEXT_PUBLIC_META_PIXEL_ID strictly from environment variables.
 * - Safely no-ops when the ID is absent or empty.
 * - Injects the official Meta Pixel bootstrap script using Next.js Script strategy="afterInteractive".
 * - Initializes the Pixel with fbq('init', pixelId).
 * - Tracks PageView via MetaPixelTracker across client-side SPA route transitions.
 * - Renders a <noscript> fallback pixel image for non-JavaScript clients.
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <MetaPixelTracker />
      </Suspense>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
