"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GitCompare, Signal, ArrowRight } from "lucide-react";
import CityAutocomplete from "@/components/CityAutocomplete";
import BudgetToggle from "@/components/BudgetToggle";
import { CompareResponse, BudgetLevel } from "@/lib/types";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query parameters
  const qSource = searchParams.get("source") || "";
  const qDest1 = searchParams.get("dest1") || "";
  const qDest2 = searchParams.get("dest2") || "";
  const qDays = searchParams.get("days") || "5";
  const qTravelers = searchParams.get("travelers") || "2";
  const qBudget = (searchParams.get("budget") as BudgetLevel) || "budget";
  const qStartDate = searchParams.get("startDate") || "";

  // Form State
  const [source, setSource] = useState(qSource);
  const [dest1, setDest1] = useState(qDest1);
  const [dest2, setDest2] = useState(qDest2);
  const [days, setDays] = useState(parseInt(qDays, 10));
  const [travelers, setTravelers] = useState(parseInt(qTravelers, 10));
  const [budget, setBudget] = useState<BudgetLevel>(qBudget);
  const [startDate, setStartDate] = useState(qStartDate || (() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return tom.toISOString().split("T")[0];
  }));

  const [compareData, setCompareData] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasParams = qSource && qDest1 && qDest2;

  // Fetch comparison data if params exist
  useEffect(() => {
    if (hasParams) {
      const fetchComparison = async () => {
        setLoading(true);
        setError("");
        try {
          const query = new URLSearchParams({
            source: qSource,
            dest1: qDest1,
            dest2: qDest2,
            days: qDays,
            travelers: qTravelers,
            budget: qBudget,
            startDate: qStartDate
          }).toString();

          const res = await fetch(`/api/compare?${query}`);
          if (!res.ok) {
            const errJson = await res.json();
            throw new Error(errJson.error || "Failed to load comparison data");
          }
          const data: CompareResponse = await res.json();
          setCompareData(data);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };
      fetchComparison();
    }
  }, [hasParams, qSource, qDest1, qDest2, qDays, qTravelers, qBudget, qStartDate]);

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!source || !dest1 || !dest2) {
      setError("Please fill in source and both destinations.");
      return;
    }
    if (dest1.toLowerCase() === dest2.toLowerCase()) {
      setError("Please select two different destinations to compare.");
      return;
    }
    if (source.toLowerCase() === dest1.toLowerCase() || source.toLowerCase() === dest2.toLowerCase()) {
      setError("Starting city cannot be the same as either destination.");
      return;
    }

    const query = new URLSearchParams({
      source,
      dest1,
      dest2,
      days: days.toString(),
      travelers: travelers.toString(),
      budget,
      startDate
    }).toString();

    router.push(`/compare?${query}`);
  };

  const handlePlanRedirect = (planNum: 1 | 2) => {
    if (!compareData) return;
    const plan = planNum === 1 ? compareData.plan1 : compareData.plan2;
    const query = new URLSearchParams({
      source: plan.request.source,
      destination: plan.request.destination,
      startDate: plan.request.startDate,
      days: plan.request.days.toString(),
      travelers: plan.request.travelers.toString(),
      budget: plan.request.budget
    }).toString();
    router.push(`/results?${query}`);
  };

  const getBudgetScoreBadge = (grandTotal: number) => {
    // Score based on budget appropriateness (ultra-budget vs moderate totals)
    const costPerPerson = grandTotal / travelers;
    if (costPerPerson < 5000) return <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs font-bold">🟢 Ultra Low Cost</span>;
    if (costPerPerson < 15000) return <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs font-bold">🟡 Moderate Cost</span>;
    return <span className="text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-xs font-bold">🔴 High Cost</span>;
  };

  return (
    <div className="max-w-6xl w-full mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl relative">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-700 font-bold uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <GitCompare className="h-6 w-6 text-amber-500" />
          <span>Compare Destinations</span>
        </h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Selector Form */}
      <form onSubmit={handleCompareSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
        <div className="space-y-4 md:col-span-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configure Comparison</h3>
        </div>

        <CityAutocomplete
          label="Starting From"
          placeholder="Select starting city"
          value={source}
          onChange={setSource}
        />

        <CityAutocomplete
          label="Destination A"
          placeholder="First Destination"
          value={dest1}
          onChange={setDest1}
          excludeValue={dest2}
        />

        <CityAutocomplete
          label="Destination B"
          placeholder="Second Destination"
          value={dest2}
          onChange={setDest2}
          excludeValue={dest1}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
              <option key={num} value={num}>{num} Days</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Travelers</label>
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white text-sm"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>{num} {num === 1 ? "Traveler" : "Travelers"}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <BudgetToggle value={budget} onChange={setBudget} />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center space-x-1.5 py-3 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none transition-colors shadow-sm disabled:opacity-50"
          >
            <span>Compare Now</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-800 text-center mb-6">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-slate-100 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 bg-slate-100 rounded col-span-1"></div>
            <div className="h-40 bg-slate-100 rounded col-span-1"></div>
            <div className="h-40 bg-slate-100 rounded col-span-1"></div>
          </div>
          <div className="h-10 bg-slate-100 rounded w-full"></div>
          <div className="h-10 bg-slate-100 rounded w-full"></div>
          <div className="h-10 bg-slate-100 rounded w-full"></div>
        </div>
      )}

      {/* Side-by-Side Comparison Table */}
      {!loading && compareData && (
        <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 w-1/3">Feature</th>
                <th className="py-4 px-6 text-center w-1/3 bg-amber-50/20">{compareData.plan1.destinationInfo.name}</th>
                <th className="py-4 px-6 text-center w-1/3 bg-emerald-50/20">{compareData.plan2.destinationInfo.name}</th>
              </tr>
            </thead>
            <tbody>
              {/* Grand Total Group */}
              <tr className="border-b border-slate-100 font-bold hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 text-slate-800">Total Group Cost</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 text-amber-950 font-extrabold text-base">
                  ₹{compareData.plan1.breakdown.grandTotal.toLocaleString("en-IN")}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 text-emerald-950 font-extrabold text-base">
                  ₹{compareData.plan2.breakdown.grandTotal.toLocaleString("en-IN")}
                </td>
              </tr>

              {/* Cost Per Person */}
              <tr className="border-b border-slate-100 font-bold hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 text-slate-800">Cost Per Person</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 text-amber-700 font-extrabold text-base">
                  ₹{compareData.plan1.breakdown.costPerPerson.toLocaleString("en-IN")}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 text-emerald-700 font-extrabold text-base">
                  ₹{compareData.plan2.breakdown.costPerPerson.toLocaleString("en-IN")}
                </td>
              </tr>

              {/* Budget Score */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 text-slate-800">Budget Rating</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  {getBudgetScoreBadge(compareData.plan1.breakdown.grandTotal)}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  {getBudgetScoreBadge(compareData.plan2.breakdown.grandTotal)}
                </td>
              </tr>

              {/* Transport Summary */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors text-xs text-gray-700">
                <td className="py-3 px-6 font-semibold text-slate-800">Transport Type</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 font-medium">
                  {compareData.plan1.transport.type === "direct" ? "Direct Route" : "Multi-leg Connect"}
                  <span className="block text-[10px] text-gray-500 leading-tight mt-0.5">
                    {compareData.plan1.transport.type === "direct" 
                      ? compareData.plan1.transport.options.find(o => o.recommended)?.mode 
                      : compareData.plan1.transport.route.summary}
                  </span>
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 font-medium">
                  {compareData.plan2.transport.type === "direct" ? "Direct Route" : "Multi-leg Connect"}
                  <span className="block text-[10px] text-gray-500 leading-tight mt-0.5">
                    {compareData.plan2.transport.type === "direct" 
                      ? compareData.plan2.transport.options.find(o => o.recommended)?.mode 
                      : compareData.plan2.transport.route.summary}
                  </span>
                </td>
              </tr>

              {/* Travel Time */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Outbound Journey Time</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 font-bold">
                  {compareData.plan1.transport.type === "direct" 
                    ? `${compareData.plan1.transport.options.find(o => o.recommended)?.durationHours}h` 
                    : `${compareData.plan1.transport.route.totalDurationHours}h`}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 font-bold">
                  {compareData.plan2.transport.type === "direct" 
                    ? `${compareData.plan2.transport.options.find(o => o.recommended)?.durationHours}h` 
                    : `${compareData.plan2.transport.route.totalDurationHours}h`}
                </td>
              </tr>

              {/* Distance */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Road Distance</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">{compareData.plan1.distanceKm} km</td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">{compareData.plan2.distanceKm} km</td>
              </tr>

              {/* Altitude */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Altitude</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 font-bold">
                  {compareData.plan1.destinationInfo.altitude ? `${compareData.plan1.destinationInfo.altitude} m` : "Sea Level (<300m)"}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 font-bold">
                  {compareData.plan2.destinationInfo.altitude ? `${compareData.plan2.destinationInfo.altitude} m` : "Sea Level (<300m)"}
                </td>
              </tr>

              {/* Trek Required */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Trekking Required</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  {compareData.plan1.trekInfo 
                    ? `Yes (${compareData.plan1.trekInfo.distanceKm} km)` 
                    : "No (Sightseeing only)"}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  {compareData.plan2.trekInfo 
                    ? `Yes (${compareData.plan2.trekInfo.distanceKm} km)` 
                    : "No (Sightseeing only)"}
                </td>
              </tr>

              {/* Permits Required */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Permits Required</td>
                <td className="py-3 px-6 text-center bg-amber-50/10 text-xs font-semibold">
                  {compareData.plan1.permits.some(p => p.required) 
                    ? compareData.plan1.permits.filter(p => p.required).map(p => p.name).join(", ")
                    : "None"}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10 text-xs font-semibold">
                  {compareData.plan2.permits.some(p => p.required) 
                    ? compareData.plan2.permits.filter(p => p.required).map(p => p.name).join(", ")
                    : "None"}
                </td>
              </tr>

              {/* Network Coverage */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors text-xs">
                <td className="py-3 px-6 font-semibold text-slate-800">Network Quality</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  <div className="flex flex-col items-center">
                    <span className="font-bold flex items-center space-x-1">
                      <Signal className="h-3.5 w-3.5 text-gray-500 mr-1" />
                      {compareData.plan1.networkCoverage ? compareData.plan1.networkCoverage.bestNetwork : "Any Network"}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      WiFi: {compareData.plan1.networkCoverage?.hasWifi ? `Yes (${compareData.plan1.networkCoverage.wifiQuality})` : "No"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  <div className="flex flex-col items-center">
                    <span className="font-bold flex items-center space-x-1">
                      <Signal className="h-3.5 w-3.5 text-gray-500 mr-1" />
                      {compareData.plan2.networkCoverage ? compareData.plan2.networkCoverage.bestNetwork : "Any Network"}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      WiFi: {compareData.plan2.networkCoverage?.hasWifi ? `Yes (${compareData.plan2.networkCoverage.wifiQuality})` : "No"}
                    </span>
                  </div>
                </td>
              </tr>

              {/* ATM Available */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors text-xs">
                <td className="py-3 px-6 font-semibold text-slate-800">ATM Availability</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  {compareData.plan1.cashAvailability.hasATM 
                    ? "Available locally" 
                    : `No ATM (Last: ${compareData.plan1.cashAvailability.lastATMBeforeDestination})`}
                  <span className="block text-[9px] text-red-600 font-bold mt-0.5">
                    {compareData.plan1.cashAvailability.hasATM ? "" : `Carry ${compareData.plan1.cashAvailability.recommendedCashAmount}`}
                  </span>
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  {compareData.plan2.cashAvailability.hasATM 
                    ? "Available locally" 
                    : `No ATM (Last: ${compareData.plan2.cashAvailability.lastATMBeforeDestination})`}
                  <span className="block text-[9px] text-red-600 font-bold mt-0.5">
                    {compareData.plan2.cashAvailability.hasATM ? "" : `Carry ${compareData.plan2.cashAvailability.recommendedCashAmount}`}
                  </span>
                </td>
              </tr>

              {/* Weather Status */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Weather Status ({qStartDate ? MONTHS[new Date(qStartDate).getMonth()] : "Month"})</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                    compareData.plan1.weather.status === "best" ? "bg-emerald-100 text-emerald-800" :
                    compareData.plan1.weather.status === "good" ? "bg-blue-100 text-blue-800" :
                    compareData.plan1.weather.status === "risky" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                  }`}>
                    {compareData.plan1.weather.status.toUpperCase()}
                  </span>
                  <span className="block text-[9px] text-gray-500 leading-tight mt-0.5">
                    {compareData.plan1.weather.avgTempMin}°C - {compareData.plan1.weather.avgTempMax}°C
                  </span>
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                    compareData.plan2.weather.status === "best" ? "bg-emerald-100 text-emerald-800" :
                    compareData.plan2.weather.status === "good" ? "bg-blue-100 text-blue-800" :
                    compareData.plan2.weather.status === "risky" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                  }`}>
                    {compareData.plan2.weather.status.toUpperCase()}
                  </span>
                  <span className="block text-[9px] text-gray-500 leading-tight mt-0.5">
                    {compareData.plan2.weather.avgTempMin}°C - {compareData.plan2.weather.avgTempMax}°C
                  </span>
                </td>
              </tr>

              {/* Road Closures */}
              <tr className="border-b border-slate-100 hover:bg-slate-50/30 transition-colors">
                <td className="py-3 px-6 font-semibold text-slate-800">Road Blockage Warn</td>
                <td className="py-3 px-6 text-center bg-amber-50/10">
                  {compareData.plan1.roadClosure 
                    ? <span className="text-red-700 font-bold text-xs">🚫 {compareData.plan1.roadClosure.routeName} CLOSED</span>
                    : "None"}
                </td>
                <td className="py-3 px-6 text-center bg-emerald-50/10">
                  {compareData.plan2.roadClosure 
                    ? <span className="text-red-700 font-bold text-xs">🚫 {compareData.plan2.roadClosure.routeName} CLOSED</span>
                    : "None"}
                </td>
              </tr>

              {/* Action Buttons */}
              <tr className="bg-slate-50">
                <td className="py-4 px-6 font-semibold text-slate-800">Actions</td>
                <td className="py-4 px-6 text-center bg-amber-50/20">
                  <button
                    onClick={() => handlePlanRedirect(1)}
                    className="inline-flex items-center space-x-1 text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Plan This Trip</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </td>
                <td className="py-4 px-6 text-center bg-emerald-50/20">
                  <button
                    onClick={() => handlePlanRedirect(2)}
                    className="inline-flex items-center space-x-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Plan This Trip</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Default State - no comparison triggered yet */}
      {!loading && !compareData && (
        <div className="py-16 text-center space-y-4">
          <div className="inline-flex p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <GitCompare className="h-8 w-8" />
          </div>
          <h2 className="font-bold text-lg text-slate-900">Compare Two Destinations side-by-side</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Choose your starting city and two destinations to compare travel times, budgets, altitude risk, ATM/network availability, and road blockages.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-12 text-sm text-slate-500 animate-pulse">Loading Compare Page...</div>}>
        <CompareContent />
      </Suspense>
    </main>
  );
}
