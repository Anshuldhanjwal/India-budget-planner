import React from "react";

export default function ResultsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto space-y-8">
        
        {/* Header Skeleton */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>

        {/* Triple Warning Banners Skeleton */}
        <div className="space-y-3">
          <div className="h-10 bg-slate-100 rounded-xl animate-pulse"></div>
          <div className="h-10 bg-slate-100 rounded-xl animate-pulse"></div>
        </div>

        {/* Grid for Weather & Altitude */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-white border border-slate-100 rounded-2xl p-6 animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-8 bg-slate-100 rounded w-1/2"></div>
          </div>
          <div className="h-32 bg-white border border-slate-100 rounded-2xl p-6 animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-8 bg-slate-100 rounded w-1/2"></div>
          </div>
        </div>

        {/* Outbound Transport Skeleton */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-20 bg-slate-100 rounded w-full"></div>
        </div>

        {/* Accommodations Skeleton */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-slate-100 rounded-xl"></div>
            <div className="h-40 bg-slate-100 rounded-xl"></div>
            <div className="h-40 bg-slate-100 rounded-xl"></div>
          </div>
        </div>

        {/* Day cards Itinerary Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-14 bg-white border border-slate-100 rounded-xl animate-pulse"></div>
          ))}
        </div>

      </div>
    </main>
  );
}
