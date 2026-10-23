"use client";

import { trackEvent } from "@/lib/analytics";

export function SurakshaHeroButton() {
  return (
    <button
      type="button"
      onClick={() =>
        trackEvent({
          name: "app_download_intent",
          params: {
            platform: "google_play",
            status: "coming_soon",
            source_location: "suraksha_kavach_hero",
          },
        })
      }
      className="bg-[#00A3FF] hover:bg-[#008bdd] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md"
    >
      Coming on Play Store soon
    </button>
  );
}
