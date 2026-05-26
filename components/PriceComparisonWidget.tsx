"use client";

import React, { useState } from "react";
import { BookingPlatform, buildBookingUrl } from "@/lib/bookingPlatforms";
import { ExternalLink } from "lucide-react";

interface PriceComparisonWidgetProps {
  category: "transport" | "hotel" | "flight" | "activity";
  platforms: BookingPlatform[];
  params: {
    source: string;
    destination: string;
    date: string;
    checkin?: string;
    checkout?: string;
    travelers: number;
    destinationInfo?: any;
  };
}

export default function PriceComparisonWidget({
  category,
  platforms,
  params
}: PriceComparisonWidgetProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [openedPlatforms, setOpenedPlatforms] = useState<Record<string, boolean>>({});

  const handleCompareAll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (platforms.length === 0) return;

    // Open first platform immediately
    const firstUrl = buildBookingUrl(platforms[0], params);
    window.open(firstUrl, "_blank", "noopener,noreferrer");
    setOpenedPlatforms((prev) => ({ ...prev, [platforms[0].name]: true }));

    // Open remaining platforms with a staggered timeout
    platforms.slice(1).forEach((platform, index) => {
      setTimeout(() => {
        const url = buildBookingUrl(platform, params);
        window.open(url, "_blank", "noopener,noreferrer");
        setOpenedPlatforms((prev) => ({ ...prev, [platform.name]: true }));
      }, (index + 1) * 100);
    });

    setToast(
      `Opening ${platforms.length} platforms. If tabs were blocked, allow popups for this site in browser settings.`
    );

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handlePlatformClick = (platform: BookingPlatform) => {
    setOpenedPlatforms((prev) => ({ ...prev, [platform.name]: true }));
  };

  return (
    <div className="space-y-4 w-full no-print">
      {/* Compare All Button */}
      <button
        onClick={handleCompareAll}
        className="w-full bg-[#FF9933] hover:bg-[#e07f24] text-white font-black py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg text-center cursor-pointer select-none"
      >
        Compare {category === "transport" ? "Tickets" : category} Prices Across All Platforms ({platforms.length}) &rarr;
      </button>

      {/* Platforms Row (Horizontal Scroll on Mobile, Grid on Desktop) */}
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {platforms.map((platform) => {
          const url = buildBookingUrl(platform, params);
          const hasOpened = openedPlatforms[platform.name];

          return (
            <div
              key={platform.name}
              className="snap-start shrink-0 w-[240px] sm:w-auto bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-2xl flex flex-col justify-between space-y-3.5 shadow-2xs hover:shadow-xs transition-all group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 text-[13px] flex items-center space-x-1">
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </span>
                  
                  {platform.isAffiliate ? (
                    <span
                      className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-bold text-[8px] uppercase select-none cursor-help"
                      title="Affiliate link — we may earn a commission if you book here."
                    >
                      ↗ Partner
                    </span>
                  ) : (
                    <span
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-bold text-[8px] uppercase select-none"
                    >
                      ✓ Official
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-semibold leading-tight">
                  {platform.keyFeature}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                {hasOpened && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-0.5">
                    <span>✓</span> <span>Opened</span>
                  </span>
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => handlePlatformClick(platform)}
                  className="inline-flex items-center space-x-1 text-[#FF9933] hover:text-[#e07f24] font-extrabold text-xs ml-auto group-hover:underline"
                >
                  <span>Search &rarr;</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white font-medium py-3.5 px-6 rounded-2xl text-xs max-w-sm w-full text-center shadow-xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
