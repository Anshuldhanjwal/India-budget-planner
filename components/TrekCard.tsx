"use client";

import React from "react";
import { TrekInfo } from "@/lib/types";
import {
  Compass,
  Clock,
  TrendingUp,
  FileCheck,
  Users,
  Shield,
  ExternalLink
} from "lucide-react";

interface TrekCardProps {
  trekInfo: TrekInfo;
  diyTotal?: number;
  packageTotal?: number;
  travelers?: number;
}

export default function TrekCard({
  trekInfo,
  diyTotal,
  packageTotal,
  travelers = 1
}: TrekCardProps) {
  // Compute approximate DIY costs if not passed
  const permitsCost = trekInfo.permits
    .filter((p) => p.required)
    .reduce((sum, p) => sum + p.cost, 0);

  const guideTotalCost = trekInfo.guideRequired
    ? trekInfo.guideApproxCostPerDay * trekInfo.durationDays
    : 0;

  // Campsites lodging cost
  const campingCost = trekInfo.campsites.reduce(
    (sum, c) => sum + c.costPerNight,
    0
  );

  const estimatedDiyPerPerson =
    diyTotal ||
    permitsCost + guideTotalCost / travelers + campingCost + 300 * trekInfo.durationDays; // adding minimal food cost

  const agencyPackageCost =
    packageTotal ||
    (trekInfo.agencies && trekInfo.agencies.length > 0
      ? trekInfo.agencies[0].packageCostPerPerson
      : estimatedDiyPerPerson * 1.4);

  const difficultyColors = {
    easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
    moderate: "bg-amber-50 text-amber-700 border-amber-100",
    hard: "bg-orange-50 text-orange-700 border-orange-100",
    expert: "bg-red-50 text-red-700 border-red-100"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-8">
      {/* Trek Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-5 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              High Altitude Trek
            </span>
            <h3 className="font-extrabold text-xl text-gray-900 mt-1">
              {trekInfo.name}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Base Camp: {trekInfo.baseCamp} • Distance: {trekInfo.distanceKm} km
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl border border-gray-100 bg-gray-50 text-xs flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-500 font-medium">Duration:</span>
            <span className="font-bold text-gray-900">{trekInfo.durationDays} Days</span>
          </div>

          <div
            className={`px-3.5 py-1.5 rounded-xl border text-xs capitalize font-bold ${
              difficultyColors[trekInfo.difficulty] || difficultyColors.moderate
            }`}
          >
            {trekInfo.difficulty} Difficulty
          </div>

          <div className="px-3.5 py-1.5 rounded-xl border border-gray-100 bg-gray-50 text-xs flex items-center space-x-1">
            <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-500 font-medium">Max Altitude:</span>
            <span className="font-bold text-gray-900">{trekInfo.maxAltitude}m</span>
          </div>
        </div>
      </div>

      {/* Guide, Porter & Permit Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guides & Porters Checklist */}
        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
          <h4 className="font-bold text-gray-900 text-sm flex items-center space-x-2">
            <Users className="h-4.5 w-4.5 text-emerald-700" />
            <span>Guide & Porter Cost Checklist</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100">
              <div>
                <span className="font-bold text-gray-900 block">Local Guide Requirement</span>
                <span className="text-gray-500 text-[11px]">
                  {trekInfo.guideRequired
                    ? "Mandatory by local regulations"
                    : "Recommended for safety"}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold rounded-lg">
                ₹{trekInfo.guideApproxCostPerDay}/day
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-100">
              <div>
                <span className="font-bold text-gray-900 block">Local Porter Service</span>
                <span className="text-gray-500 text-[11px]">
                  Carries up to 15kg personal luggage
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg">
                ₹{trekInfo.porterApproxCostPerDay}/day
              </span>
            </div>

            {trekInfo.acclimatizationDays > 0 && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-900 leading-normal flex items-start space-x-1.5">
                <Shield className="h-3.5 w-3.5 text-blue-700 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Acclimatization Built-in:</strong> Includes {trekInfo.acclimatizationDays} day(s) at base or midway camp to avoid AMS risks.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Permits Required */}
        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
          <h4 className="font-bold text-gray-900 text-sm flex items-center space-x-2">
            <FileCheck className="h-4.5 w-4.5 text-[#FF9933]" />
            <span>Trek Permits & Fees</span>
          </h4>

          {trekInfo.permits.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No special forest permits required for this route.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {trekInfo.permits.map((permit, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-gray-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">{permit.name}</span>
                    <span className="font-bold text-gray-700">
                      {permit.required ? `₹${permit.cost}` : "Free / No Permit"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>Obtain: {permit.where}</span>
                    {permit.advanceDays > 0 && (
                      <span className="text-[#FF9933] font-semibold">
                        Apply {permit.advanceDays}d in advance
                      </span>
                    )}
                  </div>
                  {permit.onlineUrl && (
                    <a
                      href={permit.onlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[10px] text-[#FF9933] font-bold hover:underline pt-1"
                    >
                      <span>Apply Online</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side DIY vs Agency Package cost grid */}
      <div className="space-y-4">
        <h4 className="font-extrabold text-gray-900 text-sm tracking-tight">
          Cost Comparison: DIY vs Agency Package
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DIY Choice */}
          <div className="bg-gradient-to-br from-white to-orange-50/20 border-2 border-dashed border-orange-200 rounded-2xl p-5 space-y-4 shadow-xs relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-[#FF9933] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl-lg">
              Budget Choice
            </span>
            <div>
              <h5 className="font-bold text-gray-900 text-sm">Do-It-Yourself (DIY)</h5>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Book guide, porter, food, & guesthouses independently.
              </p>
            </div>

            <div className="border-t border-dashed border-orange-100 pt-3">
              <div className="text-2xl font-black text-gray-900">
                ₹{Math.round(estimatedDiyPerPerson).toLocaleString("en-IN")}
                <span className="text-xs text-gray-400 font-normal"> / person</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                *Estimated based on shared guide/porter split among travelers.
              </p>
            </div>

            <ul className="text-[11px] text-gray-600 space-y-1.5 font-medium">
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Flexibility to set own daily itinerary pace</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Direct pay supporting local villagers</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Substantially cheaper for groups of 3+</span>
              </li>
              <li className="flex items-center space-x-1.5 text-red-500 font-bold">
                <span>⚠</span>
                <span>Must manage permits and tent pitching alone</span>
              </li>
            </ul>
          </div>

          {/* Agency Package Choice */}
          <div className="bg-gradient-to-br from-white to-emerald-50/20 border-2 border-emerald-200 rounded-2xl p-5 space-y-4 shadow-xs relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-bl-lg">
              All Inclusive
            </span>
            <div>
              <h5 className="font-bold text-gray-900 text-sm">Trek Agency Package</h5>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Full-service package including transport, meals, tents, and guides.
              </p>
            </div>

            <div className="border-t border-emerald-100 pt-3">
              <div className="text-2xl font-black text-emerald-800">
                ₹{Math.round(agencyPackageCost).toLocaleString("en-IN")}
                <span className="text-xs text-gray-400 font-normal"> / person</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                *Average rate charged by registered Himalayan outfits.
              </p>
            </div>

            <ul className="text-[11px] text-gray-600 space-y-1.5 font-medium">
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Tents, sleeping bags, and triple meals sorted</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Forest Permits, fees, & approvals managed</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Certified mountaineers and oxygen cylinders</span>
              </li>
              {trekInfo.agencies && trekInfo.agencies.length > 0 && (
                <li className="border-t border-dashed border-gray-250 pt-1.5 mt-2 flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Recommended Agencies:</span>
                  {trekInfo.agencies.map((agency, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-gray-800">{agency.name}</span>
                      {agency.website && (
                        <a
                          href={agency.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF9933] hover:underline font-bold inline-flex items-center space-x-0.5"
                        >
                          <span>Website</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
