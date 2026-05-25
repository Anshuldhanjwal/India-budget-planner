"use client";

import React, { useState } from "react";
import { PackingItem, CashAvailability, NetworkCoverage } from "@/lib/types";
import {
  Briefcase,
  CheckSquare,
  Square,
  Coins,
  WifiOff
} from "lucide-react";

interface PackingListProps {
  items: PackingItem[];
  cashAvailability?: CashAvailability;
  networkCoverage?: NetworkCoverage;
}

export default function PackingList({
  items: initialItems,
  cashAvailability,
  networkCoverage
}: PackingListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Setup full packing items list, injecting dynamic ones if criteria met
  const items = React.useMemo(() => {
    const list = [...initialItems];

    // Inject offline maps advice if network coverage indicates poor connectivity
    const isConnectivityPoor =
      networkCoverage &&
      (networkCoverage.jio === "none" ||
        networkCoverage.jio === "patchy" ||
        networkCoverage.airtel === "none" ||
        networkCoverage.airtel === "patchy" ||
        networkCoverage.offlineMapsAdvice);

    if (isConnectivityPoor) {
      list.push({
        item: "Offline Maps (Google Maps & Maps.me)",
        category: "gear",
        quantity: "1 App",
        reason: networkCoverage.offlineMapsAdvice || "No network coverage at destination; offline navigation is critical.",
        essential: true
      });
    }

    // Inject cash requirement if destination lacks ATMs
    if (cashAvailability && !cashAvailability.hasATM) {
      list.push({
        item: `Hard Cash (Min: ${cashAvailability.recommendedCashAmount})`,
        category: "documents",
        quantity: cashAvailability.recommendedCashAmount,
        reason: `No ATMs available locally! Nearest is ${cashAvailability.nearestATMDistance || "far away"}. Last ATM before is at ${cashAvailability.lastATMBeforeDestination}.`,
        essential: true
      });
    }

    return list;
  }, [initialItems, cashAvailability, networkCoverage]);

  const toggleItem = (name: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "clothing":
        return "👕";
      case "gear":
        return "🎒";
      case "documents":
        return "📄";
      case "toiletries":
        return "🧼";
      case "medical":
        return "💊";
      default:
        return "📦";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "clothing":
        return "Clothing & Layering";
      case "gear":
        return "Travel Gear & Navigation";
      case "documents":
        return "Documents & Hard Cash";
      case "toiletries":
        return "Personal Care & Toiletries";
      case "medical":
        return "Medical Kit & Altitude Meds";
      default:
        return "Other Essentials";
    }
  };

  // Group items by category
  const categories = Array.from(new Set(items.map((item) => item.category)));

  // Progress metrics
  const totalItems = items.length;
  const packedItems = items.filter((item) => checkedItems[item.item]).length;
  const percentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-6">
      {/* Header and Progress Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-50 text-green-800 rounded-2xl border border-green-100">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-base leading-tight">
              Interactive Packing Checklist
            </h4>
            <p className="text-xs text-gray-500 font-semibold">
              Tailored specifically to your destination and seasonal needs
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold block uppercase">
              Items Packed
            </span>
            <span className="text-xs font-bold text-gray-700">
              {packedItems} of {totalItems} Packed
            </span>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-gray-100 fill-none"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-green-600 fill-none transition-all duration-300"
                strokeWidth="4"
                strokeDasharray={175}
                strokeDashoffset={175 - (175 * percentage) / 100}
              />
            </svg>
            <span className="absolute font-black text-xs text-gray-800">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* ATM/CASH WARNING BANNER */}
      {cashAvailability && !cashAvailability.hasATM && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
          <div className="p-2 bg-orange-100 text-orange-800 rounded-xl mt-0.5">
            <Coins className="h-5 w-5 animate-pulse" />
          </div>
          <div className="text-xs text-orange-950 font-medium">
            <h5 className="font-bold text-orange-950">Cash Alert: Destination Lacks ATM Services</h5>
            <p className="mt-1 leading-relaxed">
              ATMs are unavailable at your destination. Carry at least <span className="font-extrabold text-red-700">₹{cashAvailability.recommendedCashAmount}</span> in cash. The last functional ATM is at <span className="font-bold">{cashAvailability.lastATMBeforeDestination}</span>. Nearest ATM is <span className="font-bold">{cashAvailability.nearestATMDistance || "far away"}</span>.
            </p>
          </div>
        </div>
      )}

      {/* OFFLINE MAPS WARNING BANNER */}
      {networkCoverage && (networkCoverage.jio === "none" || networkCoverage.jio === "patchy") && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
          <div className="p-2 bg-blue-100 text-blue-800 rounded-xl mt-0.5">
            <WifiOff className="h-5 w-5" />
          </div>
          <div className="text-xs text-blue-950 font-medium">
            <h5 className="font-bold text-blue-950">Connectivity Alert: Offline Maps Required</h5>
            <p className="mt-1 leading-relaxed">
              Mobile network is patchy or non-existent here. Download Google Maps or Maps.me offline data for <span className="font-bold">{networkCoverage.destination}</span> before departing.
            </p>
          </div>
        </div>
      )}

      {/* Packing Categories */}
      <div className="space-y-6 text-xs">
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);

          return (
            <div key={category} className="space-y-3">
              <h5 className="font-extrabold text-gray-900 border-b border-gray-100 pb-1.5 flex items-center space-x-1.5">
                <span className="text-base">{getCategoryIcon(category)}</span>
                <span>{getCategoryLabel(category)}</span>
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryItems.map((item, idx) => {
                  const isChecked = checkedItems[item.item] || false;

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleItem(item.item)}
                      className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer select-none transition-all duration-200 ${
                        isChecked
                          ? "bg-gray-50 border-gray-250 opacity-60 line-through"
                          : item.essential
                          ? "bg-orange-50/20 border-orange-100 hover:border-orange-200"
                          : "bg-white border-gray-150 hover:border-gray-200 hover:shadow-2xs"
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0 text-gray-400">
                        {isChecked ? (
                          <CheckSquare className="h-4.5 w-4.5 text-green-600" />
                        ) : (
                          <Square className="h-4.5 w-4.5" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-gray-950 text-[11px] leading-tight">
                            {item.item}
                          </span>
                          <span className="px-1.5 py-0.2 bg-gray-100 text-gray-500 font-bold rounded text-[9px] uppercase font-mono">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium leading-normal">
                          {item.reason}
                        </p>
                        {item.essential && !isChecked && (
                          <span className="inline-block text-[8px] bg-red-100 text-red-800 font-bold tracking-wide uppercase px-1 rounded-sm">
                            Essential
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
