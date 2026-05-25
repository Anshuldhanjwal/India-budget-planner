"use client";

import React from "react";
import { CityTips, CashAvailability, NetworkCoverage } from "@/lib/types";
import {
  ShieldAlert,
  AlertTriangle,
  Wifi,
  Coins,
  Smile,
  PhoneCall,
  UserX
} from "lucide-react";

interface SafetyTipsProps {
  tips: CityTips;
  cashAvailability: CashAvailability;
  networkCoverage?: NetworkCoverage;
}

export default function SafetyTips({
  tips,
  cashAvailability,
  networkCoverage
}: SafetyTipsProps) {
  const {
    city,
    scamAlerts,
    safetyTips,
    localCustoms,
    emergencyNumbers,
    upiTip
  } = tips;

  // Conditions for the Red Warning Card
  const lacksATM = !cashAvailability.hasATM;
  
  const requiresBsnl =
    networkCoverage?.bestNetwork?.toLowerCase().includes("bsnl") ||
    (networkCoverage?.bsnl === "good" &&
      (networkCoverage?.jio === "none" || networkCoverage?.airtel === "none"));

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-150 pb-4">
        <h4 className="font-extrabold text-gray-900 text-base leading-tight">
          Safety, Scam Alerts & Local Guidelines
        </h4>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">
          Vital safety tips and local customs for traveling in {city}
        </p>
      </div>

      {/* DYNAMIC RED WARNING CARD */}
      {(lacksATM || requiresBsnl) && (
        <div className="bg-red-50 border border-red-300 rounded-2xl p-5 space-y-3.5 shadow-sm">
          <div className="flex items-center space-x-2.5 text-red-950 font-bold text-sm">
            <ShieldAlert className="h-5 w-5 text-red-700 animate-pulse" />
            <span>⚠️ CRITICAL LOCAL ACCESS WARNINGS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {lacksATM && (
              <div className="bg-white p-3.5 rounded-xl border border-red-200 space-y-1.5 shadow-2xs">
                <span className="font-extrabold text-red-700 flex items-center gap-1">
                  <Coins className="h-4 w-4" /> No ATMs Available Locally
                </span>
                <p className="text-gray-650 leading-relaxed font-semibold">
                  There are no functional ATMs in {city}. You must withdraw cash before departure. Recommended budget: <span className="font-bold underline text-red-800">{cashAvailability.recommendedCashAmount}</span>. The last reliable cash machine is located at <span className="font-bold text-gray-900">{cashAvailability.lastATMBeforeDestination}</span>.
                </p>
              </div>
            )}

            {requiresBsnl && (
              <div className="bg-white p-3.5 rounded-xl border border-red-200 space-y-1.5 shadow-2xs">
                <span className="font-extrabold text-red-700 flex items-center gap-1">
                  <Wifi className="h-4 w-4" /> BSNL SIM Card Mandatory
                </span>
                <p className="text-gray-650 leading-relaxed font-semibold">
                  Jio and Airtel connectivity is absent or extremely patchy in this sector. <span className="font-bold text-red-800">BSNL is the only carrier</span> that works reliably. Purchase and activate a BSNL prepaid SIM card before commencing the journey.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
        {/* Scam Alerts */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-red-950 flex items-center space-x-1.5 border-b border-gray-100 pb-1.5">
            <UserX className="h-4.5 w-4.5 text-red-700" />
            <span>Common Scam Alerts</span>
          </h5>
          {scamAlerts && scamAlerts.length > 0 ? (
            <ul className="space-y-2">
              {scamAlerts.map((scam, idx) => (
                <li key={idx} className="bg-rose-50/20 border border-rose-100 p-2.5 rounded-xl font-medium leading-relaxed">
                  <span className="font-bold text-red-850">⚠️ Scams: </span> {scam}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No major scams reported for this region.</p>
          )}
        </div>

        {/* Safety Tips */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-gray-900 flex items-center space-x-1.5 border-b border-gray-100 pb-1.5">
            <AlertTriangle className="h-4.5 w-4.5 text-[#FF9933]" />
            <span>Safety Guidelines</span>
          </h5>
          {safetyTips && safetyTips.length > 0 ? (
            <ul className="space-y-2">
              {safetyTips.map((tip, idx) => (
                <li key={idx} className="bg-amber-50/20 border border-amber-100 p-2.5 rounded-xl font-medium leading-relaxed">
                  <span className="font-bold text-amber-800">✓ Safety: </span> {tip}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">Common safety guidelines apply.</p>
          )}
        </div>

        {/* Local Customs & Etiquette */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-emerald-950 flex items-center space-x-1.5 border-b border-gray-100 pb-1.5">
            <Smile className="h-4.5 w-4.5 text-emerald-700" />
            <span>Local Customs & Etiquette</span>
          </h5>
          {localCustoms && localCustoms.length > 0 ? (
            <ul className="space-y-2">
              {localCustoms.map((custom, idx) => (
                <li key={idx} className="bg-emerald-50/20 border border-emerald-100 p-2.5 rounded-xl font-medium leading-relaxed">
                  <span className="font-bold text-emerald-800">Cultural Note: </span> {custom}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">Be respectful of local traditions.</p>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-gray-900 flex items-center space-x-1.5 border-b border-gray-100 pb-1.5">
            <PhoneCall className="h-4.5 w-4.5 text-blue-700" />
            <span>Emergency Helpline Contacts</span>
          </h5>
          <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg border border-gray-100">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">National Police</span>
                <span className="font-bold text-gray-900 text-sm">112 / 100</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-100">
                <span className="text-[10px] text-gray-400 block uppercase font-bold">Medical Services</span>
                <span className="font-bold text-gray-900 text-sm">108 / 102</span>
              </div>
            </div>
            {emergencyNumbers && emergencyNumbers.length > 0 && (
              <div className="text-[10px] text-gray-600 font-semibold space-y-1 mt-2">
                <span className="font-bold block text-gray-500 uppercase">Local Helpline Directory:</span>
                {emergencyNumbers.map((num, idx) => (
                  <div key={idx} className="flex justify-between items-center py-0.5 border-b border-dashed border-gray-200">
                    <span className="truncate max-w-[150px]">{num.split(":")[0]}</span>
                    <a href={`tel:${num.split(":")[1]}`} className="text-[#FF9933] font-bold">{num.split(":")[1] || num}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cash/ATM & Connectivity Info Sub-Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6 text-xs font-semibold">
        {/* Cash & ATM Guide */}
        <div className="bg-orange-50/20 border border-orange-100 rounded-2xl p-4 space-y-2">
          <h5 className="font-extrabold text-orange-950 flex items-center space-x-1.5">
            <Coins className="h-4.5 w-4.5 text-orange-600" />
            <span>Cash & ATM Guide</span>
          </h5>
          <div className="text-[11px] text-gray-700 space-y-1.5 leading-normal">
            <p>
              ATM availability is <span className="font-bold">{cashAvailability.hasATM ? "Available" : "Absent / Nil"}</span>.
            </p>
            {cashAvailability.upiWorks ? (
              <div className="bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-100 font-medium">
                📲 {upiTip || "UPI is accepted at most shops, but carry backup cash due to network outages."}
              </div>
            ) : (
              <div className="bg-red-50 text-red-800 p-2 rounded-lg border border-red-100 font-medium">
                🚫 UPI is NOT operational here due to internet failure. Cash is mandatory.
              </div>
            )}
            <p className="text-[10px] text-gray-500 italic mt-1 font-medium">
              Tip: {cashAvailability.tip}
            </p>
          </div>
        </div>

        {/* Network & Connectivity Guide */}
        {networkCoverage && (
          <div className="bg-blue-50/20 border border-blue-100 rounded-2xl p-4 space-y-2">
            <h5 className="font-extrabold text-blue-950 flex items-center space-x-1.5">
              <Wifi className="h-4.5 w-4.5 text-blue-600" />
              <span>Network & Connectivity Guide</span>
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center">
                <span className="font-bold text-gray-500">Jio:</span>
                <span className={`px-1.5 py-0.2 rounded font-black uppercase text-[8px] ${
                  networkCoverage.jio === "good" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}>{networkCoverage.jio}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center">
                <span className="font-bold text-gray-500">Airtel:</span>
                <span className={`px-1.5 py-0.2 rounded font-black uppercase text-[8px] ${
                  networkCoverage.airtel === "good" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}>{networkCoverage.airtel}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center">
                <span className="font-bold text-gray-500">BSNL:</span>
                <span className={`px-1.5 py-0.2 rounded font-black uppercase text-[8px] ${
                  networkCoverage.bsnl === "good" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}>{networkCoverage.bsnl}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-blue-50 flex justify-between items-center">
                <span className="font-bold text-gray-500">VI:</span>
                <span className={`px-1.5 py-0.2 rounded font-black uppercase text-[8px] ${
                  networkCoverage.vi === "good" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                }`}>{networkCoverage.vi}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-700 leading-normal">
              Best Network: <span className="font-bold text-gray-900">{networkCoverage.bestNetwork}</span>
              <br />
              Wifi availability: <span className="font-semibold text-gray-900">{networkCoverage.hasWifi ? `Yes (${networkCoverage.wifiQuality})` : "No"}</span>
            </p>
            <p className="text-[10px] text-gray-500 italic font-medium">
              Tip: {networkCoverage.tip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
