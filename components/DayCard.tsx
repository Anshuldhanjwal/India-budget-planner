"use client";

import React, { useState } from "react";
import { DayPlan } from "@/lib/types";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  CircleDollarSign,
  Info,
  Compass,
  TrendingUp,
  AlertTriangle,
  Waves
} from "lucide-react";

interface DayCardProps {
  dayPlan: DayPlan;
}

export default function DayCard({ dayPlan }: DayCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    day,
    title,
    activities,
    isTrekDay,
    trekDay,
    isReturnDay,
    transportDetails
  } = dayPlan;

  // Elevation calculation
  const elevationClimb = trekDay
    ? trekDay.elevationEnd - trekDay.elevationStart
    : 0;

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
        isReturnDay
          ? "border-l-4 border-l-[#FF9933] border-gray-200"
          : isTrekDay
          ? "border-l-4 border-l-emerald-600 border-gray-200"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Summary Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center space-x-3.5">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm ${
              isReturnDay
                ? "bg-orange-50 text-[#FF9933]"
                : isTrekDay
                ? "bg-emerald-50 text-emerald-800"
                : "bg-green-50 text-[#138808]"
            }`}
          >
            D{day}
          </div>
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className="font-extrabold text-gray-900 text-sm md:text-base">
                {isReturnDay && "🔙 "}
                {title}
              </span>
              {isTrekDay && (
                <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Trek Day
                </span>
              )}
              {isReturnDay && (
                <span className="bg-orange-100 text-[#FF9933] font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Return Journey
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {activities.length} activity slot{activities.length !== 1 ? "s" : ""} planned
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-[11px] font-bold uppercase hidden md:inline-block tracking-wider">
            {isOpen ? "Collapse" : "Expand"}
          </span>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>

      {/* Expanded Details */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-gray-50/30 p-5 space-y-5 animate-fade-in">
          {/* Trek Day Stats Block */}
          {isTrekDay && trekDay && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/70 text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Distance</span>
                <span className="font-extrabold text-emerald-950 text-sm flex items-center">
                  <Compass className="h-4 w-4 text-emerald-700 mr-1 flex-shrink-0" />
                  {trekDay.distanceKm} km
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Elevation Climb</span>
                <span className="font-extrabold text-emerald-950 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 text-emerald-700 mr-1 flex-shrink-0" />
                  {elevationClimb > 0 ? `+${elevationClimb}m` : `${elevationClimb}m`}
                </span>
                <span className="text-[9px] text-emerald-800 font-medium block">
                  ({trekDay.elevationStart}m to {trekDay.elevationEnd}m)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Campsite Destination</span>
                <span className="font-extrabold text-emerald-950 text-sm block truncate">
                  ⛺ {trekDay.campsite}
                </span>
                {trekDay.waterSource && (
                  <span className="inline-flex items-center text-[9px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 mt-0.5">
                    <Waves className="h-2.5 w-2.5 mr-0.5" />
                    Water Source
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block font-medium">Difficulty & Hours</span>
                <span className="font-extrabold text-emerald-950 text-sm capitalize">
                  {trekDay.difficulty} • {trekDay.durationHours} hrs
                </span>
              </div>

              {trekDay.weatherWarning && (
                <div className="col-span-2 md:col-span-4 mt-2 p-2 bg-rose-50 border border-rose-100 rounded-lg text-[10px] text-rose-900 font-medium flex items-center space-x-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-700 flex-shrink-0" />
                  <span><strong>Weather warning:</strong> {trekDay.weatherWarning}</span>
                </div>
              )}

              {trekDay.emergencyExit && (
                <div className="col-span-2 md:col-span-4 p-2 bg-blue-50/50 border border-blue-100 rounded-lg text-[10px] text-blue-900 font-medium">
                  <strong>Emergency Exit Route:</strong> {trekDay.emergencyExit}
                </div>
              )}
            </div>
          )}

          {/* Transport Info if return day / transit day */}
          {transportDetails && (
            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100/50 text-xs text-orange-950 leading-relaxed font-medium">
              <span className="font-extrabold block text-orange-800 mb-0.5">🚗 Transit & Return Info:</span>
              {transportDetails}
            </div>
          )}

          {/* Activity Slots */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Daily Schedule Breakdown
            </h5>

            <div className="space-y-3.5">
              {activities.map((slot, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-150 rounded-xl p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-start space-x-3.5">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-bold rounded-lg text-[10px] mt-0.5 uppercase tracking-wide">
                      {slot.timeSlot}
                    </span>
                    <div>
                      <h6 className="font-extrabold text-gray-900 text-sm leading-tight">
                        {slot.activity}
                      </h6>
                      {slot.notes && (
                        <p className="text-xs text-gray-500 font-medium mt-1.5 flex items-start space-x-1">
                          <Info className="h-3.5 w-3.5 text-[#FF9933] flex-shrink-0 mt-0.2" />
                          <span>{slot.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 border-t border-gray-100 pt-3 md:border-none md:pt-0 justify-between text-xs font-semibold">
                    {slot.durationHours > 0 && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span>{slot.durationHours} hrs</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      <CircleDollarSign className="h-3.5 w-3.5 text-green-700" />
                      <span>{slot.cost === 0 ? "Free Entry" : `₹${slot.cost}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
