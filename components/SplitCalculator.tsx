"use client";

import React, { useState } from "react";
import { BudgetBreakdown } from "@/lib/types";
import { Users, Check, Share2, Copy } from "lucide-react";

interface SplitCalculatorProps {
  breakdown: BudgetBreakdown;
  travelers: number;
}

export default function SplitCalculator({ breakdown, travelers }: SplitCalculatorProps) {
  const [splitMode, setSplitMode] = useState<"equal" | "smart">("equal");
  const [names, setNames] = useState<string[]>(
    Array.from({ length: travelers }, (_, i) => `Person ${i + 1}`)
  );
  
  // Track activity participation (defaults to true for everyone)
  const [activityParticipation, setActivityParticipation] = useState<boolean[]>(
    Array.from({ length: travelers }, () => true)
  );

  const handleNameChange = (index: number, val: string) => {
    const nextNames = [...names];
    nextNames[index] = val || `Person ${index + 1}`;
    setNames(nextNames);
  };

  const toggleActivity = (index: number) => {
    const nextPart = [...activityParticipation];
    nextPart[index] = !nextPart[index];
    setActivityParticipation(nextPart);
  };

  // Split Calculations
  const calculatedSplits = React.useMemo(() => {
    const total = breakdown.grandTotal;

    if (splitMode === "equal") {
      const share = Math.round(total / travelers);
      return names.map((name) => ({
        name,
        share,
        details: {
          shared: share,
          individual: 0,
          notes: "Equal division of all trip expenses"
        }
      }));
    } else {
      // Smart Split:
      // Shared costs = Transport + Return Transport + Accommodation + Guide + Porter + Emergency Buffer
      const totalShared =
        breakdown.transportCost +
        breakdown.returnTransportCost +
        breakdown.accommodationCost +
        breakdown.guideCost +
        breakdown.porterCost +
        breakdown.emergencyBuffer;

      const sharedPerPerson = Math.round(totalShared / travelers);

      // Individual costs = Food, Permits, Gear Rental, Activities
      const foodPerPerson = Math.round(breakdown.foodCost / travelers);
      const permitsPerPerson = Math.round(breakdown.permitsCost / travelers);
      const gearPerPerson = Math.round(breakdown.gearRentalCost / travelers);
      
      // Activities participation division
      const participantsCount = activityParticipation.filter(Boolean).length;
      const totalActivities = breakdown.activitiesCost;
      const activityCostPerParticipant = participantsCount > 0 ? Math.round(totalActivities / participantsCount) : 0;

      return names.map((name, i) => {
        const participates = activityParticipation[i];
        const personalActivities = participates ? activityCostPerParticipant : 0;
        const individualTotal = foodPerPerson + permitsPerPerson + gearPerPerson + personalActivities;
        const totalShare = sharedPerPerson + individualTotal;

        const detailNotes = [
          `Shared (Stay, Transport, Guides, Buffer): ₹${sharedPerPerson.toLocaleString("en-IN")}`,
          `Food: ₹${foodPerPerson.toLocaleString("en-IN")}`,
          permitsPerPerson > 0 ? `Permits: ₹${permitsPerPerson.toLocaleString("en-IN")}` : "",
          gearPerPerson > 0 ? `Gear Rental: ₹${gearPerPerson.toLocaleString("en-IN")}` : "",
          personalActivities > 0 ? `Activities: ₹${personalActivities.toLocaleString("en-IN")}` : participates ? "" : "Activities: Not participating (₹0)"
        ].filter(Boolean);

        return {
          name,
          share: totalShare,
          details: {
            shared: sharedPerPerson,
            individual: individualTotal,
            notes: detailNotes.join(" | ")
          }
        };
      });
    }
  }, [breakdown, travelers, splitMode, names, activityParticipation]);

  // Share split details to WhatsApp
  const shareToWhatsApp = (name: string, share: number, notes: string) => {
    const text = `Hey ${name}, your share for our trip is *₹${share.toLocaleString("en-IN")}*.\n\n*Breakdown:*\n${notes.replace(/ \| /g, "\n")}\n\n*Total Group Cost:* ₹${breakdown.grandTotal.toLocaleString("en-IN")} for ${travelers} travelers.\nSent from India Budget Trip Planner 🇮🇳`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Copy all splits to clipboard
  const [copied, setCopied] = useState(false);
  const copyAllSplits = () => {
    const splitText = calculatedSplits
      .map(
        (s) =>
          `*${s.name}*: ₹${s.share.toLocaleString("en-IN")}\nBreakdown: ${s.details.notes}`
      )
      .join("\n\n");
    const fullText = `*Trip Cost Split Summary*\nTotal Group Budget: ₹${breakdown.grandTotal.toLocaleString("en-IN")}\n\n${splitText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8 split-calculator">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Group Cost Splitter</h3>
            <p className="text-xs text-gray-500">Divide group costs easily among travelers</p>
          </div>
        </div>
        
        {/* Toggle split modes */}
        <div className="flex bg-gray-100 p-1 rounded-lg no-print">
          <button
            onClick={() => setSplitMode("equal")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
              splitMode === "equal" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Equal Split
          </button>
          <button
            onClick={() => setSplitMode("smart")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
              splitMode === "smart" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Smart Split
          </button>
        </div>
      </div>

      {/* Edit Names Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 no-print">
        {Array.from({ length: travelers }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <label className="text-xs font-bold text-gray-500">Traveler {i + 1} Name</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                placeholder={`Person ${i + 1}`}
                value={names[i]}
                onChange={(e) => handleNameChange(i, e.target.value)}
              />
              {splitMode === "smart" && (
                <label className="flex items-center space-x-1.5 shrink-0 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={activityParticipation[i]}
                    onChange={() => toggleActivity(i)}
                    className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4 border-gray-300"
                  />
                  <span className="text-xs text-gray-600">Activities</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Display splits */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-medium text-xs">
              <th className="py-2.5">Name</th>
              <th className="py-2.5">Detailed Share Description</th>
              <th className="py-2.5 text-right">Owes (₹)</th>
              <th className="py-2.5 text-right no-print">Share</th>
            </tr>
          </thead>
          <tbody>
            {calculatedSplits.map((split, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 font-bold text-gray-900">{split.name}</td>
                <td className="py-3 text-xs text-gray-600 max-w-xs md:max-w-md truncate">{split.details.notes}</td>
                <td className="py-3 font-extrabold text-right text-amber-700">₹{split.share.toLocaleString("en-IN")}</td>
                <td className="py-3 text-right no-print">
                  <button
                    onClick={() => shareToWhatsApp(split.name, split.share, split.details.notes)}
                    className="inline-flex items-center space-x-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold px-2 py-1 rounded transition-colors"
                  >
                    <Share2 className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center no-print">
        <button
          onClick={copyAllSplits}
          className="inline-flex items-center space-x-1 text-xs border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-3 py-2 rounded-lg transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? "Copied splits!" : "Copy All Splits"}</span>
        </button>
        <span className="text-xs text-gray-400 font-semibold italic">💡 Renders cleanly for printing</span>
      </div>
    </div>
  );
}
