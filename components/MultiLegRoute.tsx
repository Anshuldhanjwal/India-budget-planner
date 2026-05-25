"use client";

import React from "react";
import { MultiLegRoute as MultiLegRouteType, JourneyLeg } from "@/lib/types";
import {
  Train,
  Bus,
  Plane,
  Footprints,
  Navigation,
  Sparkles,
  Car,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface MultiLegRouteProps {
  route: MultiLegRouteType;
  travelers?: number;
}

export default function MultiLegRoute({ route, travelers = 1 }: MultiLegRouteProps) {
  const getLegIcon = (mode: JourneyLeg["mode"]) => {
    switch (mode) {
      case "train":
        return <Train className="h-5 w-5 text-amber-600" />;
      case "bus":
        return <Bus className="h-5 w-5 text-green-600" />;
      case "flight":
        return <Plane className="h-5 w-5 text-blue-600" />;
      case "shared-jeep":
        return <Car className="h-5 w-5 text-purple-600 animate-pulse" />;
      case "private-cab":
        return <Car className="h-5 w-5 text-orange-600" />;
      case "trek":
        return <Footprints className="h-5 w-5 text-emerald-600" />;
      default:
        return <Navigation className="h-5 w-5 text-gray-500" />;
    }
  };

  const getModeLabel = (mode: JourneyLeg["mode"]) => {
    switch (mode) {
      case "train":
        return "Train";
      case "bus":
        return "Bus / Volvo";
      case "flight":
        return "Flight";
      case "shared-jeep":
        return "Shared Jeep / Sumo";
      case "private-cab":
        return "Private Cab / Taxi";
      case "trek":
        return "Trek / Walk";
      default:
        return mode;
    }
  };

  const hasPrivateCabRec = route.privateCabOption?.recommended;
  const privateCab = route.privateCabOption;

  return (
    <div className="space-y-6">
      {/* Route Summary Stats */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-2xl p-5 border border-gray-150 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-1">
              Multi-Leg Travel Itinerary
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              {route.summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-xs">
              <span className="text-gray-400 block font-medium">Total Cost/Person</span>
              <span className="font-bold text-gray-900 text-sm">
                ₹{route.totalCostPerPerson.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-xs">
              <span className="text-gray-400 block font-medium">Total Duration</span>
              <span className="font-bold text-gray-900 text-sm">
                {route.totalDurationHours} hrs
              </span>
            </div>
            {route.bestDepartureTime && (
              <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-xs">
                <span className="text-gray-400 block font-medium">Best Start</span>
                <span className="font-bold text-[#FF9933] text-sm">
                  {route.bestDepartureTime}
                </span>
              </div>
            )}
          </div>
        </div>

        {route.tip && (
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 flex items-start space-x-2">
            <HelpCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed font-medium">
              <span className="font-bold">Route Tip:</span> {route.tip}
            </p>
          </div>
        )}
      </div>

      {/* Private Cab Recommendation Banner */}
      {hasPrivateCabRec && privateCab && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs animate-fade-in">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl mt-0.5">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-emerald-950 text-sm">
              Recommended Private Cab Option (Leg #{privateCab.legIndex + 1})
            </h5>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              For a group of <span className="font-bold">{travelers} traveler{travelers > 1 ? "s" : ""}</span>, renting a private cab flat-rate (₹{privateCab.costFlat.toLocaleString("en-IN")}) is more convenient and saves about <span className="font-bold">₹{privateCab.savings.toLocaleString("en-IN")}</span> compared to booking individual seats on shared transports! (Fits up to {privateCab.maxPassengers} passengers).
            </p>
          </div>
        </div>
      )}

      {/* Step-by-Step Timeline */}
      <div className="relative pl-6 border-l-2 border-gray-200 ml-4 space-y-8 my-4">
        {route.legs.map((leg, index) => {
          const isPrivateCabAlternative = hasPrivateCabRec && privateCab?.legIndex === index;

          return (
            <div key={index} className="relative group">
              {/* Dot Icon */}
              <div className="absolute -left-[38px] top-0 bg-white rounded-full border-2 border-gray-200 p-1.5 group-hover:border-[#FF9933] transition-colors shadow-sm">
                {getLegIcon(leg.mode)}
              </div>

              {/* Step Heading */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="inline-flex items-center space-x-1 text-[9px] uppercase font-bold text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded-full mb-1">
                    <span>Leg {index + 1}</span>
                    <ChevronRight className="h-2 w-2" />
                    <span>{getModeLabel(leg.mode)}</span>
                  </span>
                  <h5 className="font-bold text-gray-900 text-sm flex items-center flex-wrap gap-1.5">
                    <span>{leg.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                    <span>{leg.to}</span>
                  </h5>
                </div>
                <div className="flex items-center space-x-3 text-xs md:text-right">
                  <div>
                    <span className="text-gray-400 block font-medium">Distance & Time</span>
                    <span className="font-bold text-gray-900">
                      {leg.distanceKm} km • {leg.durationHours} hrs
                    </span>
                  </div>
                  <div className="border-l border-gray-200 pl-3">
                    <span className="text-gray-400 block font-medium">Est. Cost</span>
                    <span className="font-bold text-gray-900">
                      ₹{leg.costPerPerson.toLocaleString("en-IN")}/person
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <p className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 border border-gray-100 leading-relaxed font-medium">
                {leg.notes}
              </p>

              {/* Train Info if present inside leg */}
              {leg.trainInfo && (
                <div className="mt-2 p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-xs space-y-2 max-w-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-800">
                      {leg.trainInfo.trainName}
                    </span>
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-mono font-bold text-[10px]">
                      #{leg.trainInfo.trainNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700 font-semibold bg-white p-1.5 rounded-lg border border-amber-50">
                    <span>{leg.trainInfo.departureTime}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span>{leg.trainInfo.arrivalTime}</span>
                  </div>
                  {leg.trainInfo.daysOfOperation && (
                    <div className="text-[10px] text-gray-500">
                      Runs: {leg.trainInfo.daysOfOperation.join(", ")}
                    </div>
                  )}
                  {leg.trainInfo.bookingUrl && (
                    <a
                      href={leg.trainInfo.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[#FF9933] hover:text-[#e07f24] font-bold text-[11px] mt-1 hover:underline"
                    >
                      <span>Book Train</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Private Cab alternative detail block */}
              {isPrivateCabAlternative && privateCab && (
                <div className="mt-2 p-3 bg-emerald-50/30 border border-emerald-200/60 rounded-xl text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-800">
                    <Car className="h-4 w-4 text-emerald-600" />
                    <span>Alternative: Private Taxi Option</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    Flat rate: ₹{privateCab.costFlat.toLocaleString("en-IN")} total for the vehicle. Max capacity: {privateCab.maxPassengers} passengers. Saves ₹{privateCab.savings.toLocaleString("en-IN")} over public/shared jeep fares for your group size.
                  </p>
                </div>
              )}

              {/* Booking link if present */}
              {leg.bookingUrl && !leg.trainInfo && (
                <div className="mt-2">
                  <a
                    href={leg.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-[#FF9933] hover:text-[#e07f24] font-bold hover:underline"
                  >
                    <span>Book Leg Transport</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
