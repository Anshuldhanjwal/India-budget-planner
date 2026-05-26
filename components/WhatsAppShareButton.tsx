"use client";

import React from "react";

interface WhatsAppShareButtonProps {
  source: string;
  destination: string;
  startDate: string;
  days: number;
  travelers: number;
  budgetLevel: string;
  mode: string;
  transportCost: number;
  accommodationCost: number;
  foodCost: number;
  activitiesCost: number;
  grandTotal: number;
  costPerPerson: number;
  budgetScoreEmoji: string;
  budgetScoreLabel: string;
  weatherWarning?: string;
}

export default function WhatsAppShareButton({
  source,
  destination,
  startDate,
  days,
  travelers,
  budgetLevel,
  mode,
  transportCost,
  accommodationCost,
  foodCost,
  activitiesCost,
  grandTotal,
  costPerPerson,
  budgetScoreEmoji,
  budgetScoreLabel,
  weatherWarning
}: WhatsAppShareButtonProps) {
  const handleShare = () => {
    if (typeof window === "undefined") return;

    // Get current URL and replace the tab param with "overview"
    const params = new URLSearchParams(window.location.search);
    params.set("tab", "overview");
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    const warningText = weatherWarning ? `⚠️ ${weatherWarning}\n` : "";

    const message = `🇮🇳 *${source} → ${destination} Trip Plan*

📅 ${startDate} | ${days} days | 👥 ${travelers} people
💰 Budget: ${budgetLevel}

*Summary:*
🚆 Transport: ${mode} — ₹${transportCost.toLocaleString("en-IN")}/person
🏨 Stay: ₹${accommodationCost.toLocaleString("en-IN")} (${days - 1} nights)
🍽️ Food: ₹${foodCost.toLocaleString("en-IN")}
🎯 Activities: ₹${activitiesCost.toLocaleString("en-IN")}

💵 *Total: ₹${grandTotal.toLocaleString("en-IN")}* (₹${costPerPerson.toLocaleString("en-IN")}/person)
📊 ${budgetScoreEmoji} ${budgetScoreLabel}

${warningText}
🔗 ${shareUrl}

_Planned with India Budget Trip Planner 🇮🇳_`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center space-x-2 text-white font-bold py-2.5 px-5 rounded-2xl text-xs transition-colors shadow-sm cursor-pointer select-none no-print"
      style={{ backgroundColor: "#25D366" }}
    >
      <span className="text-sm">💬</span>
      <span>Share on WhatsApp</span>
    </button>
  );
}
