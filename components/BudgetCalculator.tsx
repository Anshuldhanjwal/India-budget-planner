"use client";

import React, { useState } from "react";
import { BudgetBreakdown } from "@/lib/types";
import { recalculateOnClient } from "@/lib/pricing";
import {
  Users,
  Hotel,
  Car,
  Utensils,
  Plus,
  Minus
} from "lucide-react";

interface BudgetCalculatorProps {
  initialBreakdown: BudgetBreakdown;
  isTrek: boolean;
}

export default function BudgetCalculator({
  initialBreakdown,
  isTrek
}: BudgetCalculatorProps) {
  const [prevInitialBreakdown, setPrevInitialBreakdown] = useState(initialBreakdown);
  
  const [travelers, setTravelers] = useState(() => {
    return initialBreakdown.grandTotal / initialBreakdown.costPerPerson > 0
      ? Math.round(initialBreakdown.grandTotal / initialBreakdown.costPerPerson)
      : 1;
  });
  
  const [breakdown, setBreakdown] = useState<BudgetBreakdown>(initialBreakdown);

  // Sync state synchronously during render if props change
  if (initialBreakdown !== prevInitialBreakdown) {
    setPrevInitialBreakdown(initialBreakdown);
    const calculatedTravelers =
      initialBreakdown.grandTotal / initialBreakdown.costPerPerson > 0
        ? Math.round(initialBreakdown.grandTotal / initialBreakdown.costPerPerson)
        : 1;
    setTravelers(calculatedTravelers);
    setBreakdown(initialBreakdown);
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 1;
    setTravelers(val);
    const updated = recalculateOnClient(initialBreakdown, val, isTrek);
    setBreakdown(updated);
  };

  const adjustTravelers = (amount: number) => {
    setTravelers((prev) => {
      const next = Math.max(1, Math.min(20, prev + amount));
      const updated = recalculateOnClient(initialBreakdown, next, isTrek);
      setBreakdown(updated);
      return next;
    });
  };

  const roomsNeeded = Math.ceil(travelers / 2);

  return (
    <div className="bg-white border border-gray-250 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-150 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-gray-900 text-base leading-tight">
            Dynamic Group Budget Estimator
          </h4>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Slide or tap to recalculate shared hotel rooms, transport, and guide expenses instantly.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-150 px-3.5 py-1.5 rounded-2xl shadow-2xs">
          <Users className="h-4.5 w-4.5 text-[#FF9933]" />
          <span className="text-xs text-gray-700 font-bold uppercase">
            Group Size: {travelers} Pax
          </span>
        </div>
      </div>

      {/* Slider Control Widgets */}
      <div className="bg-gray-50/50 border border-gray-150 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-600 block">
            Select Number of Travelers
          </label>
          <span className="text-xs font-mono font-bold text-gray-500">
            Min: 1 • Max: 20
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => adjustTravelers(-1)}
            disabled={travelers <= 1}
            className="p-2.5 bg-white border border-gray-250 hover:bg-gray-50 text-gray-700 rounded-xl transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Minus className="h-4 w-4" />
          </button>

          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={travelers}
            onChange={handleSliderChange}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF9933]"
          />

          <button
            onClick={() => adjustTravelers(1)}
            disabled={travelers >= 20}
            className="p-2.5 bg-white border border-gray-250 hover:bg-gray-50 text-gray-700 rounded-xl transition-colors shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Realtime Budget Result Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Per-Person Cost Indicator */}
        <div className="bg-gradient-to-br from-white to-orange-50/10 border-2 border-[#FF9933] rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-xs">
          <span className="absolute top-0 right-0 bg-[#FF9933] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            Live Rate
          </span>
          <span className="text-gray-400 block font-bold uppercase text-[10px] tracking-wider">
            Cost Per Traveler
          </span>
          <div className="text-3xl font-black text-gray-950">
            ₹{breakdown.costPerPerson.toLocaleString("en-IN")}
            <span className="text-xs text-gray-400 font-normal"> / person</span>
          </div>
          <p className="text-[11px] text-gray-500 font-semibold leading-relaxed pt-1.5 border-t border-dashed border-orange-100">
            Shared costs (hotel rooms, local transport, guide services) are split across {travelers} member{travelers > 1 ? "s" : ""}.
          </p>
        </div>

        {/* Group Grand Total Indicator */}
        <div className="bg-gradient-to-br from-white to-green-50/10 border-2 border-green-600 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-xs">
          <span className="absolute top-0 right-0 bg-green-600 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            Group Total
          </span>
          <span className="text-gray-400 block font-bold uppercase text-[10px] tracking-wider">
            Grand Group Budget
          </span>
          <div className="text-3xl font-black text-green-800">
            ₹{breakdown.grandTotal.toLocaleString("en-IN")}
            <span className="text-xs text-gray-400 font-normal"> total</span>
          </div>
          <p className="text-[11px] text-gray-500 font-semibold leading-relaxed pt-1.5 border-t border-dashed border-green-100">
            Requires booking <span className="font-bold text-gray-900">{roomsNeeded} double room{roomsNeeded > 1 ? "s" : ""}</span> to house the group.
          </p>
        </div>
      </div>

      {/* Dynamic Detailed breakdown list */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-150 space-y-4">
        <h5 className="font-bold text-gray-900 text-xs tracking-tight uppercase">
          Estimated Cost Allocations
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-xs font-semibold">
          <div className="flex justify-between items-center py-1 border-b border-gray-200">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Car className="h-4 w-4 text-orange-600" /> Outward Transport
            </span>
            <span className="text-gray-900">₹{breakdown.transportCost.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-200">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Car className="h-4 w-4 text-[#FF9933]" /> Return Transport
            </span>
            <span className="text-gray-900">₹{breakdown.returnTransportCost.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-200">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Hotel className="h-4 w-4 text-blue-600" /> Lodging ({roomsNeeded} room{roomsNeeded > 1 ? "s" : ""})
            </span>
            <span className="text-gray-900">₹{breakdown.accommodationCost.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-200">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Utensils className="h-4 w-4 text-emerald-600" /> Food & Meals
            </span>
            <span className="text-gray-900">₹{breakdown.foodCost.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-gray-200 col-span-1 md:col-span-2">
            <span className="text-gray-500">Other Shared (Buffer, Permits, Porter/Guide)</span>
            <span className="text-gray-900">
              ₹{(breakdown.localTransportCost + breakdown.activitiesCost + breakdown.permitsCost + breakdown.gearRentalCost + breakdown.guideCost + breakdown.porterCost + breakdown.emergencyBuffer).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Trek Dynamic DIY vs Package comparison */}
      {isTrek && breakdown.packageTotal && breakdown.diyTotal && (
        <div className="bg-orange-50/20 border border-orange-200 rounded-2xl p-4 text-xs font-semibold space-y-2">
          <h5 className="font-bold text-orange-950 uppercase block text-[10px]">
            Trek Realtime Option Compare ({travelers} Travelers)
          </h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-xl border border-orange-100">
              <span className="text-gray-400 block font-medium">DIY Style Total</span>
              <span className="text-lg font-black text-gray-900 block">
                ₹{breakdown.diyTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-orange-100">
              <span className="text-gray-400 block font-medium">Agency Package Total</span>
              <span className="text-lg font-black text-emerald-800 block">
                ₹{breakdown.packageTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
