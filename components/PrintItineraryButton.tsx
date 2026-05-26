"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintItineraryButton() {
  const handlePrint = () => {
    document.documentElement.classList.add("print-itinerary-mode");
    window.print();
    window.addEventListener("afterprint", () => {
      document.documentElement.classList.remove("print-itinerary-mode");
    }, { once: true });
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer select-none no-print"
    >
      <Printer className="h-4 w-4" />
      <span>Download PDF Itinerary</span>
    </button>
  );
}
