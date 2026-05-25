"use client";

import React, { useState } from "react";
import { CityTips, CashAvailability, NetworkCoverage } from "@/lib/types";
import { ShieldAlert, Printer, Smartphone, Compass } from "lucide-react";

interface EmergencyCardProps {
  destination: string;
  dates: string;
  tips: CityTips;
  cashAvailability: CashAvailability;
  networkCoverage?: NetworkCoverage;
  hotel?: string;
}

export default function EmergencyCard({
  destination,
  dates,
  tips,
  cashAvailability,
  networkCoverage,
  hotel: initialHotel = ""
}: EmergencyCardProps) {
  const [hotelInfo, setHotelInfo] = useState(initialHotel);
  const [permitInfo, setPermitInfo] = useState("");

  const handlePrint = () => {
    // Add print mode class to body, print, then remove it
    document.body.classList.add("emergency-card-print-mode");
    window.print();
    // Use a tiny timeout to ensure print dialog opened before class removal
    setTimeout(() => {
      document.body.classList.remove("emergency-card-print-mode");
    }, 1000);
  };

  const altitudeHealth = tips.altitudeHealth;

  return (
    <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-6 mt-8 no-print">
      <div className="flex items-center justify-between border-b border-red-100 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-red-100 text-red-800 rounded-lg">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Wallet Emergency Card</h3>
            <p className="text-xs text-gray-500">Printable wallet-sized emergency card (85x55mm)</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Printer className="h-4 w-4" />
          <span>Print Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Preview of the Card */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-gray-400 mb-2">Wallet Card Preview (Double Sided/Foldable)</span>
          
          <div className="w-[340px] h-[220px] bg-red-50/20 border-2 border-red-500 rounded-xl p-3 shadow-md flex flex-col justify-between font-mono text-[9px] text-gray-900 leading-tight relative overflow-hidden emergency-card bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-red-50/10 to-white">
            {/* Indian Flag Watermark on edge */}
            <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col">
              <div className="h-1/3 bg-[#FF9933]"></div>
              <div className="h-1/3 bg-white"></div>
              <div className="h-1/3 bg-[#138808]"></div>
            </div>

            <div>
              <div className="flex justify-between items-center border-b border-red-300 pb-1 mb-1.5">
                <span className="font-bold text-[10px] text-red-700 tracking-wider flex items-center">
                  🇮🇳 EMERGENCY CONTACT CARD
                </span>
                <span className="text-[7px] text-gray-500 font-semibold">{dates || "TBD"}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">Destination</span>
                  <span className="font-bold text-[9px] text-gray-900 truncate block">{destination}</span>
                </div>
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">Stay Contact</span>
                  <span className="font-semibold block truncate bg-yellow-50 px-1 rounded border border-yellow-200 min-h-[11px]">
                    {hotelInfo || "Click to edit →"}
                  </span>
                </div>
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">Emergency Helpline</span>
                  <span className="font-bold block text-red-600">Police: 112 | Amb: 108</span>
                </div>
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">Permit No / Ref</span>
                  <span className="font-semibold block truncate bg-yellow-50 px-1 rounded border border-yellow-200 min-h-[11px]">
                    {permitInfo || "Click to edit →"}
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-dashed border-gray-300 grid grid-cols-2 gap-x-2">
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">Nearest Hospital</span>
                  <span className="block font-bold truncate">
                    {altitudeHealth ? altitudeHealth.nearestHospital.name : "Local Govt Clinic"}
                  </span>
                  <span className="block text-gray-500 font-bold">
                    {altitudeHealth ? altitudeHealth.nearestHospital.phone : "108 / 102"}
                  </span>
                </div>
                <div>
                  <span className="block text-[7px] text-gray-400 font-bold uppercase">ATM & Network</span>
                  <span className="block truncate">
                    ATM: {cashAvailability.hasATM ? "Available" : `Last: ${cashAvailability.lastATMBeforeDestination}`}
                  </span>
                  <span className="block truncate text-gray-600">
                    Net: {networkCoverage ? networkCoverage.bestNetwork : "Jio/Airtel OK"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[7px] text-gray-400 border-t border-gray-200 pt-1 mt-1 font-sans">
              <span>Rescue: {altitudeHealth ? altitudeHealth.rescueAgency.phone : "112"}</span>
              <span className="font-bold text-gray-500">Fold & Keep in Wallet</span>
            </div>
          </div>
        </div>

        {/* Editable helper fields */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center space-x-1.5">
              <Smartphone className="h-4 w-4 text-amber-500" />
              <span>Fill Card Details Before Printing</span>
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Hotel Stay & Phone (Prints on Card)</label>
                <input
                  type="text"
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder="e.g., Zostel Kaza - +91-9876543210"
                  value={hotelInfo}
                  onChange={(e) => setHotelInfo(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Permit Number / Reference (Prints on Card)</label>
                <input
                  type="text"
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 focus:outline-none"
                  placeholder="e.g., ILP-AR-4091A"
                  value={permitInfo}
                  onChange={(e) => setPermitInfo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
            <h4 className="font-bold text-xs text-red-950 mb-1 flex items-center space-x-1">
              <Compass className="h-4.5 w-4.5 text-red-700" />
              <span>Why carry this?</span>
            </h4>
            <p className="text-[11px] text-red-900 leading-relaxed">
              In remote areas like Spiti, Chitkul, or Chopta, cellular network signals drop completely, meaning you cannot access online booking confirmations or search for local rescue numbers. Printing this wallet card ensures you have offline access to medical clinics, rescue helplines, ATM warnings, and stay details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
