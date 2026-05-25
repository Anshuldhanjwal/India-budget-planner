"use client";

import React from "react";
import { BudgetLevel } from "@/lib/types";
import { ShieldAlert, Compass, Sparkles } from "lucide-react";

interface BudgetToggleProps {
  value: BudgetLevel;
  onChange: (val: BudgetLevel) => void;
}

export default function BudgetToggle({ value, onChange }: BudgetToggleProps) {
  const options: { level: BudgetLevel; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      level: "ultra-budget",
      label: "Ultra Budget",
      desc: "Lowest cost, state buses, basic dorms/homestays",
      icon: <ShieldAlert className="h-4 w-4" />
    },
    {
      level: "budget",
      label: "Budget",
      desc: "Optimized value, standard trains, Zostel/hostels",
      icon: <Compass className="h-4 w-4" />
    },
    {
      level: "moderate",
      label: "Moderate",
      desc: "Comfort travel, flights/AC cars, premium hotels",
      icon: <Sparkles className="h-4 w-4" />
    }
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Level</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isActive = value === opt.level;
          return (
            <button
              key={opt.level}
              type="button"
              onClick={() => onChange(opt.level)}
              className={`flex flex-col items-start p-3.5 border-2 rounded-xl text-left transition-all ${
                isActive
                  ? "border-amber-500 bg-amber-50/50 shadow-sm text-amber-950"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 text-gray-700 bg-white"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className={isActive ? "text-amber-600" : "text-gray-400"}>
                  {opt.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{opt.label}</span>
              </div>
              <span className="text-xs text-gray-500 leading-normal">{opt.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
