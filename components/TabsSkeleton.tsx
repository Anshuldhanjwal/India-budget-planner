import React from "react";

export default function TabsSkeleton() {
  return (
    <div className="w-full bg-white border-b border-slate-200 h-[48px] flex items-center px-4 overflow-x-auto space-x-3 no-print">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-28 bg-slate-200 rounded-full animate-pulse shrink-0"
        />
      ))}
    </div>
  );
}
