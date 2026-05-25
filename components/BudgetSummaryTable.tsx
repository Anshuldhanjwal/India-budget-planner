"use client";

import React from "react";
import { BudgetBreakdown } from "@/lib/types";
import {
  Info,
  ArrowRightLeft,
  Hotel,
  Utensils,
  Ticket,
  Car,
  FileKey,
  Footprints,
  UserCheck,
  Luggage,
  ShieldCheck,
  Percent
} from "lucide-react";

interface BudgetSummaryTableProps {
  breakdown: BudgetBreakdown;
  travelers?: number;
}

export default function BudgetSummaryTable({
  breakdown,
  travelers = 1
}: BudgetSummaryTableProps) {
  const {
    transportCost,
    returnTransportCost,
    accommodationCost,
    foodCost,
    activitiesCost,
    localTransportCost,
    emergencyBuffer,
    permitsCost,
    gearRentalCost,
    guideCost,
    porterCost,
    grandTotal,
    costPerPerson,
    seasonalMultiplier,
    daysCount,
    returnJourneySummary
  } = breakdown;

  // Define the rows
  const items = [
    {
      label: "Outward Journey Transport",
      amount: transportCost,
      icon: <Car className="h-4 w-4 text-orange-600" />,
      description: "Direct transport or multi-leg transit to destination"
    },
    {
      // The return transport row MUST show the returnJourneySummary string as its label instead of generic text
      label: returnJourneySummary || "Return Journey Transport",
      amount: returnTransportCost,
      icon: <ArrowRightLeft className="h-4 w-4 text-[#FF9933]" />,
      description: "Return transit back to source town"
    },
    {
      label: `Lodging (${daysCount} Nights)`,
      amount: accommodationCost,
      icon: <Hotel className="h-4 w-4 text-blue-600" />,
      description: "Hostels, homestays or budget hotels"
    },
    {
      label: `Meals & Food (${daysCount} Days)`,
      amount: foodCost,
      icon: <Utensils className="h-4 w-4 text-emerald-600" />,
      description: "Local thalis, breakfasts, snacks and beverages"
    },
    {
      label: "Sightseeing & Activities",
      amount: activitiesCost,
      icon: <Ticket className="h-4 w-4 text-purple-600" />,
      description: "Entry tickets, guides, and activity slot fares"
    },
    {
      label: "Local Commute & Transfers",
      amount: localTransportCost,
      icon: <Car className="h-4 w-4 text-indigo-650" />,
      description: "Autos, shared Sumos, renting scooty/bike"
    },
    {
      label: "Forest/Special Permits",
      amount: permitsCost,
      icon: <FileKey className="h-4 w-4 text-red-500" />,
      description: "ILP, PAP, trek clearances or green tax"
    },
    {
      label: "Trek Gear Rental",
      amount: gearRentalCost,
      icon: <Footprints className="h-4 w-4 text-emerald-500" />,
      description: "Sleeping bags, tents, jackets or boots"
    },
    {
      label: "Local Guide Fee",
      amount: guideCost,
      icon: <UserCheck className="h-4 w-4 text-teal-650" />,
      description: "Registered mountain/village guides"
    },
    {
      label: "Local Porter Service",
      amount: porterCost,
      icon: <Luggage className="h-4 w-4 text-cyan-600" />,
      description: "Luggage carriers/mules during trek"
    },
    {
      label: "Emergency Medical Buffer",
      amount: emergencyBuffer,
      icon: <ShieldCheck className="h-4 w-4 text-pink-600" />,
      description: "AMS emergency reserve, basic meds, buffer fund"
    }
  ];

  // Filter items that have cost > 0
  const activeItems = items.filter((item) => item.amount > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-3">
        <div>
          <h4 className="font-extrabold text-gray-900 text-base leading-tight">
            Itemized Expense Breakdown
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            Calculated for {travelers} traveler{travelers > 1 ? "s" : ""} over {daysCount} days
          </p>
        </div>

        {seasonalMultiplier !== 1 && (
          <div className="inline-flex items-center space-x-1 bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-100">
            <Percent className="h-3 w-3" />
            <span>Seasonal Price Factor: x{seasonalMultiplier}</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left text-gray-500">
          <thead className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50/50 rounded-xl border-b border-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3">Expense Category</th>
              <th scope="col" className="px-4 py-3 hidden md:table-cell">Inclusions</th>
              <th scope="col" className="px-4 py-3 text-right">Cost Per Person</th>
              <th scope="col" className="px-4 py-3 text-right">Group Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {activeItems.map((item, idx) => {
              const perPersonCost = item.amount;
              const groupTotalCost = item.amount * travelers;

              return (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-4 py-3.5 flex items-center space-x-2.5 font-bold text-gray-900">
                    <span className="p-1.5 bg-gray-50 rounded-lg border border-gray-100/50">
                      {item.icon}
                    </span>
                    <span className="truncate max-w-[180px] md:max-w-xs">{item.label}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 hidden md:table-cell max-w-sm">
                    {item.description}
                  </td>
                  <td className="px-4 py-3.5 text-right font-semibold text-gray-900">
                    ₹{Math.round(perPersonCost).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3.5 text-right font-extrabold text-gray-900 bg-gray-50/30">
                    ₹{Math.round(groupTotalCost).toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}

            {/* Total Row */}
            <tr className="bg-gradient-to-r from-orange-50/20 to-green-50/20 font-black border-t-2 border-gray-200">
              <td className="px-4 py-4 text-[#FF9933] text-sm flex items-center space-x-2 font-black">
                <span>🇮🇳</span>
                <span>Grand Total Estimations</span>
              </td>
              <td className="px-4 py-4 hidden md:table-cell text-gray-400 font-bold text-[10px] uppercase">
                All-inclusive budget estimate
              </td>
              <td className="px-4 py-4 text-right text-gray-900 text-sm">
                ₹{Math.round(costPerPerson).toLocaleString("en-IN")}
                <span className="text-[10px] text-gray-400 font-normal"> / person</span>
              </td>
              <td className="px-4 py-4 text-right text-[#138808] text-base bg-emerald-50/30">
                ₹{Math.round(grandTotal).toLocaleString("en-IN")}
                <span className="text-[10px] text-gray-400 font-normal"> group</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100 flex items-start space-x-2.5 text-xs text-orange-950 font-medium">
        <Info className="h-4.5 w-4.5 text-[#FF9933] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Budget Tip:</strong> Rates shown are estimated standard budget values for public bus/train options and homestays. Shared food expenses and guide costs are dynamically shared per-person as group size increases.
        </p>
      </div>
    </div>
  );
}
