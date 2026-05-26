"use client";

import React from "react";
import { getPlatformsForCategory } from "@/lib/bookingPlatforms";
import PriceComparisonWidget from "./PriceComparisonWidget";
import { Train, Bus, Plane, Hotel, Compass } from "lucide-react";

interface BookingHubProps {
  destinationState?: string;
  isTrekDestination?: boolean;
  params: {
    source: string;
    destination: string;
    date: string; // ISO YYYY-MM-DD
    checkin?: string;
    checkout?: string;
    travelers: number;
    destinationInfo?: any;
  };
}

export default function BookingHub({
  destinationState = "",
  isTrekDestination = false,
  params
}: BookingHubProps) {
  // Get platforms dynamically
  const trainPlatforms = getPlatformsForCategory("train", destinationState, isTrekDestination);
  const busPlatforms = getPlatformsForCategory("bus", destinationState, isTrekDestination);
  const flightPlatforms = getPlatformsForCategory("flight", destinationState, isTrekDestination);
  const hotelPlatforms = getPlatformsForCategory("hotel", destinationState, isTrekDestination);
  const activityPlatforms = getPlatformsForCategory("activity", destinationState, isTrekDestination);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h4 className="font-extrabold text-slate-900 text-base leading-tight">
          India Multi-Platform Booking Hub
        </h4>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          Compare prices across official networks and leading aggregators with auto-filled routes and dates.
        </p>
      </div>

      {/* Train Section */}
      {trainPlatforms.length > 0 && (
        <div className="space-y-3.5">
          <h5 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="p-1 bg-amber-50 rounded-lg border border-amber-100 text-amber-600">
              <Train className="h-4.5 w-4.5" />
            </span>
            <span>Train Bookings</span>
          </h5>
          <PriceComparisonWidget category="transport" platforms={trainPlatforms} params={params} />
        </div>
      )}

      {/* Bus Section */}
      {busPlatforms.length > 0 && (
        <div className="space-y-3.5">
          <h5 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="p-1 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-600">
              <Bus className="h-4.5 w-4.5" />
            </span>
            <span>Bus Bookings</span>
          </h5>
          <PriceComparisonWidget category="transport" platforms={busPlatforms} params={params} />
        </div>
      )}

      {/* Flight Section */}
      {flightPlatforms.length > 0 && (
        <div className="space-y-3.5">
          <h5 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="p-1 bg-blue-50 rounded-lg border border-blue-100 text-blue-600">
              <Plane className="h-4.5 w-4.5" />
            </span>
            <span>Flight Bookings</span>
          </h5>
          <PriceComparisonWidget category="flight" platforms={flightPlatforms} params={params} />
        </div>
      )}

      {/* Hotel Section */}
      {hotelPlatforms.length > 0 && (
        <div className="space-y-3.5">
          <h5 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="p-1 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
              <Hotel className="h-4.5 w-4.5" />
            </span>
            <span>Hotel & Stay Bookings</span>
          </h5>
          <PriceComparisonWidget category="hotel" platforms={hotelPlatforms} params={params} />
        </div>
      )}

      {/* Activity/Trek Section */}
      {activityPlatforms.length > 0 && (
        <div className="space-y-3.5">
          <h5 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
            <span className="p-1 bg-rose-50 rounded-lg border border-rose-100 text-rose-600">
              <Compass className="h-4.5 w-4.5" />
            </span>
            <span>{isTrekDestination ? "Organized Trek Packages" : "Attractions & Experiences"}</span>
          </h5>
          <PriceComparisonWidget category="activity" platforms={activityPlatforms} params={params} />
        </div>
      )}

      {/* Affiliate Disclosure */}
      <p className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100">
        Some links are affiliate links — we may earn a small commission 
        at no extra cost to you. Prices are estimates; verify on the platform.
      </p>
    </div>
  );
}
