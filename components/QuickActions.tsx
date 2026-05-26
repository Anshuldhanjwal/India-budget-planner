import React from "react";
import { Train, Calendar, DollarSign, Bookmark } from "lucide-react";

interface QuickActionsProps {
  onTabChange: (tabId: string) => void;
}

export default function QuickActions({ onTabChange }: QuickActionsProps) {
  const actions = [
    { id: "getting-there", label: "View Transport", icon: <Train className="h-4 w-4" /> },
    { id: "itinerary", label: "See Itinerary", icon: <Calendar className="h-4 w-4" /> },
    { id: "budget", label: "Full Budget", icon: <DollarSign className="h-4 w-4" /> },
    { id: "book", label: "Book Now", icon: <Bookmark className="h-4 w-4" /> }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3.5 no-print">
      <h4 className="font-extrabold text-slate-800 text-xs tracking-wider uppercase">
        Quick Actions
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={() => onTabChange(act.id)}
            className="flex items-center justify-center space-x-1.5 bg-orange-50/50 hover:bg-orange-100/50 text-[#FF9933] border border-orange-200/50 py-2.5 px-4 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer select-none outline-hidden hover:scale-[1.02] active:scale-[0.98]"
          >
            {act.icon}
            <span>{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
