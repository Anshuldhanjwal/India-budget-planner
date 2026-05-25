"use client";

import React from "react";
import { MonthWeather, RoadClosure } from "@/lib/types";
import {
  CloudSun,
  Thermometer,
  Users,
  CloudRain,
  Info
} from "lucide-react";

interface WeatherBannerProps {
  weather: MonthWeather;
  roadClosure?: RoadClosure;
}

export default function WeatherBanner({ weather, roadClosure }: WeatherBannerProps) {
  const {
    month,
    avgTempMin,
    avgTempMax,
    rainfallMm,
    crowdLevel,
    clothingAdvice,
    status
  } = weather;

  // Check if road is closed during this specific month
  const isRoadClosed =
    roadClosure &&
    roadClosure.closedMonths &&
    roadClosure.closedMonths.includes(month);

  const getStatusBadge = (s: string) => {
    switch (s.toLowerCase()) {
      case "best":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "risky":
        return "bg-yellow-100 text-yellow-800 border-yellow-250";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200 animate-pulse";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCrowdLabel = (c: string) => {
    switch (c.toLowerCase()) {
      case "low":
        return "Low Crowds (Peaceful / Off-season)";
      case "moderate":
        return "Moderate Crowds (Enjoyable)";
      case "high":
        return "High Crowds (Active season)";
      case "peak":
        return "Peak Crowds (Very crowded / Expensive)";
      default:
        return c;
    }
  };

  return (
    <div className="space-y-4">
      {/* ROAD CLOSURE BLOCKING RED BANNER */}
      {isRoadClosed && roadClosure && (
        <div className="bg-red-600 text-white rounded-3xl p-5 border-2 border-red-700 shadow-lg flex items-start space-x-4 animate-bounce">
          <div className="p-2.5 bg-red-800 text-white rounded-2xl flex-shrink-0">
            <span className="text-xl">🚫</span>
          </div>
          <div className="space-y-2 text-left">
            <h4 className="font-extrabold text-sm md:text-base tracking-tight uppercase flex items-center gap-1.5">
              <span>Critical Warning: Route Closed & Inaccessible</span>
            </h4>
            <p className="text-xs text-red-50 leading-relaxed font-semibold">
              The route <span className="underline font-bold">[{roadClosure.routeName}]</span> is completely closed in <span className="font-bold underline">{month}</span>.
              <br />
              Reason: <span className="font-extrabold text-yellow-200">{roadClosure.reason}</span>
            </p>
            {roadClosure.alternateRoute && (
              <div className="bg-red-800/40 p-3 rounded-xl border border-red-500/30 text-xs text-white">
                <span className="font-bold block text-yellow-350">🚗 Recommended Alternative Route:</span>
                <span className="font-medium text-red-50">{roadClosure.alternateRoute}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Weather Information Panel */}
      <div className="bg-gradient-to-br from-blue-50/20 via-white to-orange-50/10 border border-gray-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100">
              <CloudSun className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-black text-gray-900 text-lg">
                  {month} Season Profile
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(status)}`}>
                  {status.toUpperCase()} TIME TO VISIT
                </span>
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                Climate dynamics and crowds guide
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 text-xs">
          {/* Temperature Range */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start space-x-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Thermometer className="h-4 w-4" />
            </div>
            <div>
              <span className="text-gray-400 block font-bold uppercase text-[9px] tracking-wider mb-1">
                Temperature Range
              </span>
              <span className="text-base font-black text-gray-900 leading-none">
                {avgTempMin}°C to {avgTempMax}°C
              </span>
              <p className="text-[10px] text-gray-500 font-medium mt-1">
                Nights can get significantly colder.
              </p>
            </div>
          </div>

          {/* Crowd & Pricing Multiplier */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start space-x-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="text-gray-400 block font-bold uppercase text-[9px] tracking-wider mb-1">
                Crowd Density
              </span>
              <span className="text-sm font-extrabold text-gray-800 leading-tight block">
                {getCrowdLabel(crowdLevel)}
              </span>
              {weather.priceMultiplier > 1 && (
                <span className="text-[9px] text-[#FF9933] font-bold block mt-0.5">
                  📈 High Season Rates: x{weather.priceMultiplier} multiplier applied
                </span>
              )}
            </div>
          </div>

          {/* Precipitation / Rain */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-start space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <CloudRain className="h-4 w-4" />
            </div>
            <div>
              <span className="text-gray-400 block font-bold uppercase text-[9px] tracking-wider mb-1">
                Average Precipitation
              </span>
              <span className="text-sm font-extrabold text-gray-800 leading-tight">
                {rainfallMm} mm
              </span>
              <p className="text-[10px] text-gray-500 font-medium mt-1">
                {rainfallMm > 150
                  ? "Monsoon risks / Heavy rains likely"
                  : rainfallMm > 50
                  ? "Light showers expected"
                  : "Dry weather / Minimal rain"}
              </p>
            </div>
          </div>
        </div>

        {/* Clothing Advice */}
        <div className="mt-5 p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100/70 text-xs text-blue-950 font-medium flex items-start space-x-2">
          <Info className="h-4.5 w-4.5 text-blue-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clothing & Packing Tip:</strong> {clothingAdvice}
          </p>
        </div>
      </div>
    </div>
  );
}
