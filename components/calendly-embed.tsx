"use client";

import * as React from "react";
import { CALENDLY_URL } from "@/lib/utils";

export function CalendlyEmbed() {
  const [loaded, setLoaded] = React.useState(false);
  const embedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&embed_domain=automateai&embed_type=Inline`;

  return (
    <div className="card relative min-h-[480px] overflow-hidden p-0">
      {!loaded ? (
        <div className="absolute inset-0 flex animate-pulse flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-white/[0.02]">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-3 w-40 rounded bg-slate-200 dark:bg-white/10" />
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-600">
            Loading calendar…
          </p>
        </div>
      ) : null}
      <iframe
        title="Book a free consultation via Calendly"
        src={embedUrl}
        onLoad={() => setLoaded(true)}
        className="h-[480px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
