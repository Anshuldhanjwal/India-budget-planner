"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, Clock, Compass, ArrowRight } from "lucide-react";
import CityAutocomplete from "@/components/CityAutocomplete";
import BudgetToggle from "@/components/BudgetToggle";
import { BudgetLevel } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(() => {
    // Default to tomorrow's date
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return tom.toISOString().split("T")[0];
  });
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<BudgetLevel>("budget");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!source) {
      setError("Please select a starting city.");
      return;
    }
    if (!destination) {
      setError("Please select a destination.");
      return;
    }
    if (source.toLowerCase() === destination.toLowerCase()) {
      setError("Source and destination cities cannot be the same.");
      return;
    }

    setLoading(true);
    const query = new URLSearchParams({
      source,
      destination,
      startDate,
      days: days.toString(),
      travelers: travelers.toString(),
      budget
    }).toString();

    router.push(`/results?${query}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Decorative India-themed gradient top bar */}
      <div className="h-2 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#138808]/5 rounded-full blur-3xl"></div>

          <div className="text-center relative">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              India Budget Trip Planner <span className="text-[#FF9933]">🇮🇳</span>
            </h1>
            <p className="mt-3 text-sm text-slate-500 leading-normal max-w-md mx-auto">
              Calculate optimized budget itineraries across metros, hill stations, offbeat villages, and Himalayan treks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 relative">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800 text-center animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Autocompletes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CityAutocomplete
                  label="Starting From"
                  placeholder="Select source city"
                  value={source}
                  onChange={setSource}
                  excludeValue={destination}
                />
                <CityAutocomplete
                  label="Going To"
                  placeholder="Select destination"
                  value={destination}
                  onChange={setDestination}
                  excludeValue={source}
                />
              </div>

              {/* Date, Duration, Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm shadow-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Duration</span>
                  </label>
                  <select
                    className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm shadow-sm"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                  >
                    {Array.from({ length: 14 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "Day" : "Days"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center space-x-1">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>Travelers</span>
                  </label>
                  <select
                    className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm shadow-sm"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget level */}
              <BudgetToggle value={budget} onChange={setBudget} />
            </div>

            {/* CTA */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating Trip Plan...</span>
                ) : (
                  <>
                    <Compass className="h-5 w-5 animate-spin-slow" />
                    <span>Find Best Trip</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Comparison Page Link */}
          <div className="border-t border-slate-100 pt-5 mt-6 text-center">
            <Link
              href="/compare"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Can&apos;t decide? Compare two destinations</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100 bg-white/50">
        <p>🇮🇳 Designed for budget-conscious explorers. All pricing estimates updated daily. Offline-ready emergency cards included.</p>
      </footer>
    </main>
  );
}
