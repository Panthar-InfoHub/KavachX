export type AnalyticsEvent =
  | {
      name: "generate_lead";
      params: {
        form_name: string;
        status: "success";
      };
    }
  | {
      name: "form_error";
      params: {
        form_name: string;
        error_type: string;
      };
    }
  | {
      name: "cta_click";
      params: {
        cta_name: string;
        cta_location: string;
        destination: string;
      };
    }
  | {
      name: "select_content";
      params: {
        content_type: "article";
        item_id: string;
        item_name: string;
      };
    }
  | {
      name: "app_download_intent";
      params: {
        platform: string;
        status: string;
        source_location: string;
      };
    }
  | {
      name: "social_link_click";
      params: {
        platform: string;
        location: string;
      };
    }
  | {
      name: "faq_toggle";
      params: {
        faq_question: string;
        faq_section: string;
      };
    };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Returns the configured Meta Pixel ID from environment variables, if any.
 */
export function getMetaPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
}

/**
 * Tracks a Meta Pixel PageView event safely in the browser.
 */
export function trackMetaPageView(): void {
  if (typeof window === "undefined") return;
  if (!getMetaPixelId()) return;

  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  } catch {
    // Fail silently: analytics errors must never impact UX
  }
}

/**
 * Dispatches a standard or custom Meta Pixel event.
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
  isCustom = false
): void {
  if (typeof window === "undefined") return;
  if (!getMetaPixelId()) return;

  try {
    if (typeof window.fbq === "function") {
      if (isCustom) {
        window.fbq("trackCustom", eventName, params);
      } else {
        window.fbq("track", eventName, params);
      }
    }
  } catch {
    // Fail silently: analytics errors must never impact UX
  }
}

/**
 * Production-grade unified analytics event dispatcher.
 * Dispatches to Google Analytics 4, Meta Pixel, and Microsoft Clarity.
 * - Guarantees zero crash even when any provider is uninitialized or absent.
 * - Providers are decoupled: missing GA4 ID does not block Meta Pixel or Clarity.
 * - Automatically no-ops in SSR.
 * - Enforces strictly typed non-PII parameters.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4 Dispatch
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", event.name, event.params);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: event.name,
          ...event.params,
        });
      }
    } catch {
      // Fail silently
    }
  }

  // 2. Meta Pixel Dispatch
  if (getMetaPixelId()) {
    try {
      switch (event.name) {
        case "generate_lead":
          // Meta Standard Event: Lead
          trackMetaEvent("Lead", {
            content_name: event.params.form_name,
            status: event.params.status,
          });
          break;

        case "select_content":
          // Meta Standard Event: ViewContent
          trackMetaEvent("ViewContent", {
            content_type: event.params.content_type,
            content_ids: [event.params.item_id],
            content_name: event.params.item_name,
          });
          break;

        case "cta_click":
          // Meta Custom Event: CtaClick
          trackMetaEvent(
            "CtaClick",
            {
              cta_name: event.params.cta_name,
              cta_location: event.params.cta_location,
              destination: event.params.destination,
            },
            true
          );
          break;

        case "app_download_intent":
          // Meta Custom Event: AppDownloadIntent
          trackMetaEvent(
            "AppDownloadIntent",
            {
              platform: event.params.platform,
              status: event.params.status,
              source_location: event.params.source_location,
            },
            true
          );
          break;

        case "social_link_click":
          // Meta Custom Event: SocialLinkClick
          trackMetaEvent(
            "SocialLinkClick",
            {
              platform: event.params.platform,
              location: event.params.location,
            },
            true
          );
          break;

        case "faq_toggle":
          // Meta Custom Event: FaqToggle
          trackMetaEvent(
            "FaqToggle",
            {
              faq_question: event.params.faq_question,
              faq_section: event.params.faq_section,
            },
            true
          );
          break;

        case "form_error":
          // Meta Custom Event: FormError
          trackMetaEvent(
            "FormError",
            {
              form_name: event.params.form_name,
              error_type: event.params.error_type,
            },
            true
          );
          break;
      }
    } catch {
      // Fail silently
    }
  }

  // 3. Microsoft Clarity Custom Event Dispatch
  if (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim()) {
    try {
      if (typeof window.clarity === "function") {
        window.clarity("event", event.name);
      }
    } catch {
      // Fail silently
    }
  }
}

