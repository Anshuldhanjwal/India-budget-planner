"use client";

import React, { useState } from "react";
import { AltitudeHealthData } from "@/lib/types";
import {
  AlertOctagon,
  Activity,
  Heart,
  ShieldAlert,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  MapPin,
  Stethoscope
} from "lucide-react";

interface AltitudeWarningProps {
  altitude: number;
  altitudeHealth?: AltitudeHealthData;
}

export default function AltitudeWarning({
  altitude,
  altitudeHealth
}: AltitudeWarningProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (altitude <= 2500 || !altitudeHealth) {
    return null;
  }

  const {
    risk,
    maxAltitude,
    acclimatizationAdvice,
    symptoms,
    medications,
    nearestHospital,
    rescueAgency,
    helipadsNearby
  } = altitudeHealth;

  const getRiskBadge = (r: string) => {
    switch (r.toLowerCase()) {
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "moderate":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200 animate-pulse";
      case "very-high":
        return "bg-rose-200 text-rose-900 border-rose-300 animate-bounce";
      default:
        return "bg-gray-100 text-gray-800 border-gray-250";
    }
  };

  return (
    <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6 shadow-sm space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-red-100 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-600 text-white rounded-xl shadow-md">
            <AlertOctagon className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-extrabold text-red-950 text-sm md:text-base leading-tight">
                Altitude Sickness (AMS) Medical Warning
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(risk)}`}>
                {risk.toUpperCase()} RISK
              </span>
            </div>
            <p className="text-[11px] text-red-700 font-medium">
              High Altitude zone detected at {maxAltitude || altitude}m above sea level
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-700"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs transition-all duration-300">
          {/* Symptoms and Medication Advice */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-red-100 space-y-3">
              <h5 className="font-bold text-red-950 flex items-center space-x-1.5 border-b border-red-50 pb-1.5">
                <Heart className="h-4 w-4 text-red-600" />
                <span>Watch for AMS Symptoms</span>
              </h5>
              <ul className="grid grid-cols-2 gap-2 text-gray-700 font-medium">
                {symptoms && symptoms.length > 0 ? (
                  symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li>• Headache</li>
                    <li>• Nausea</li>
                    <li>• Dizziness</li>
                    <li>• Fatigue</li>
                    <li>• Short Breath</li>
                    <li>• Insomnia</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-red-100 space-y-3">
              <h5 className="font-bold text-red-950 flex items-center space-x-1.5 border-b border-red-50 pb-1.5">
                <Stethoscope className="h-4 w-4 text-orange-600" />
                <span>Preventive Medications</span>
              </h5>
              <div className="text-gray-700 space-y-1.5">
                {medications && medications.length > 0 ? (
                  medications.map((m, idx) => (
                    <p key={idx} className="font-semibold text-gray-800 leading-normal">
                      💊 {m}
                    </p>
                  ))
                ) : (
                  <p className="italic text-gray-400">Consult a doctor regarding Diamox usage.</p>
                )}
                <span className="block text-[10px] text-gray-400 font-bold pt-1 leading-normal uppercase">
                  *Consult a physician before self-administering any drugs.
                </span>
              </div>
            </div>
          </div>

          {/* Acclimatization Rules */}
          <div className="bg-white rounded-2xl p-4 border border-red-100 space-y-3">
            <h5 className="font-bold text-red-950 flex items-center space-x-1.5 border-b border-red-50 pb-1.5">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span>Acclimatization Golden Rules</span>
            </h5>
            <ul className="space-y-2.5 text-gray-700 font-medium">
              {acclimatizationAdvice && acclimatizationAdvice.length > 0 ? (
                acclimatizationAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5 leading-normal">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{advice}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Spend 24-48 hours at base camp before climbing higher.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Hydrate with 4-5 liters of water/electrolytes daily.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Avoid alcohol and tobacco; consume slow-release carbs.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Climb High, Sleep Low: sleep at lower altitudes when possible.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Hospitals and Rescue Info */}
          <div className="bg-gradient-to-br from-red-50/30 to-white rounded-2xl p-4 border border-red-100 space-y-4">
            {nearestHospital && (
              <div className="space-y-1.5">
                <h5 className="font-bold text-red-950 flex items-center space-x-1.5">
                  <MapPin className="h-4 w-4 text-red-700" />
                  <span>Nearest Medical Clinic / Govt Hospital</span>
                </h5>
                <div className="bg-white p-2.5 rounded-xl border border-red-50">
                  <span className="font-extrabold text-gray-900 block text-[11px] leading-tight">
                    {nearestHospital.name}
                  </span>
                  <span className="text-gray-500 block font-semibold text-[10px] mt-0.5">
                    Distance: {nearestHospital.distance}
                  </span>
                  {nearestHospital.phone && (
                    <a
                      href={`tel:${nearestHospital.phone}`}
                      className="inline-flex items-center space-x-1 text-[#FF9933] font-bold text-[10px] mt-1.5 hover:underline"
                    >
                      <PhoneCall className="h-3 w-3" />
                      <span>{nearestHospital.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {rescueAgency && (
              <div className="space-y-1.5">
                <h5 className="font-bold text-red-950 flex items-center space-x-1.5">
                  <ShieldAlert className="h-4 w-4 text-red-700" />
                  <span>Rescue Agency & Helipads</span>
                </h5>
                <div className="bg-white p-2.5 rounded-xl border border-red-50 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-gray-800">{rescueAgency.name}</span>
                    <a
                      href={`tel:${rescueAgency.phone}`}
                      className="text-red-600 font-extrabold flex items-center space-x-0.5 hover:underline"
                    >
                      <PhoneCall className="h-2.5 w-2.5" />
                      <span>Call: {rescueAgency.phone}</span>
                    </a>
                  </div>
                  {helipadsNearby && helipadsNearby.length > 0 && (
                    <div className="text-[10px] text-gray-500 font-medium">
                      <span className="font-bold text-gray-600">Helipads: </span>
                      {helipadsNearby.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
