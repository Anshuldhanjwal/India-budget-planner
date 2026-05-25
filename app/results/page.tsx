"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer, Share2, AlertOctagon, Landmark, Signal } from "lucide-react";
import { TripResponse } from "@/lib/types";

// Import all React components
import WeatherBanner from "@/components/WeatherBanner";
import AltitudeWarning from "@/components/AltitudeWarning";
import TransportCard from "@/components/TransportCard";
import MultiLegRoute from "@/components/MultiLegRoute";
import TrekCard from "@/components/TrekCard";
import HotelCard from "@/components/HotelCard";
import DayCard from "@/components/DayCard";
import BudgetSummaryTable from "@/components/BudgetSummaryTable";
import SplitCalculator from "@/components/SplitCalculator";
import BudgetCalculator from "@/components/BudgetCalculator";
import PackingList from "@/components/PackingList";
import SafetyTips from "@/components/SafetyTips";
import EmergencyCard from "@/components/EmergencyCard";
import BookingHub from "@/components/BookingHub";
import ResultsLoading from "./loading";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read search parameters
  const source = searchParams.get("source") || "";
  const destination = searchParams.get("destination") || "";
  const startDate = searchParams.get("startDate") || "";
  const daysStr = searchParams.get("days") || "5";
  const travelersStr = searchParams.get("travelers") || "2";
  const budget = searchParams.get("budget") || "budget";

  const [tripData, setTripData] = useState<TripResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Fetch plan from API route
  useEffect(() => {
    if (source && destination && startDate) {
      const fetchPlan = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await fetch("/api/plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source,
              destination,
              startDate,
              days: parseInt(daysStr, 10),
              travelers: parseInt(travelersStr, 10),
              budget
            })
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to generate trip plan");
          }

          const data: TripResponse = await res.json();
          setTripData(data);
        } catch (err: unknown) {
          console.error(err);
          const errMsg = err instanceof Error ? err.message : "An error occurred while building your plan.";
          setError(errMsg);
        } finally {
          setLoading(false);
        }
      };

      fetchPlan();
    }
  }, [source, destination, startDate, daysStr, travelersStr, budget]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintAll = () => {
    window.print();
  };

  if (loading) {
    return <ResultsLoading />;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-4 py-16">
        <div className="inline-flex p-3 bg-red-100 text-red-800 rounded-2xl">
          <AlertOctagon className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Plan Generation Failed</h2>
        <p className="text-sm text-slate-500">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
      </div>
    );
  }

  if (!tripData) return null;

  const isTrek = !!tripData.trekInfo;

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      
      {/* Back button and page Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 no-print">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-700 font-bold uppercase tracking-wider self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Modify Search</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-1.5 text-xs border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-3 py-2 rounded-xl transition-colors shadow-sm bg-white"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? "Copied Link!" : "Copy Trip Link"}</span>
          </button>
          <button
            onClick={handlePrintAll}
            className="inline-flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Printer className="h-4 w-4" />
            <span>Print Full Itinerary</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* India themed soft gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF9933]">
            {tripData.destinationInfo.type[0].replace("-", " ")} ITINERARY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {source} to {tripData.destinationInfo.name} Plan
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Starting Date: <span className="text-slate-800 font-bold">{startDate}</span> | Duration: <span className="text-slate-800 font-bold">{daysStr} Days</span> | Budget: <span className="text-slate-800 font-bold uppercase">{budget}</span>
          </p>
        </div>

        <div className="flex flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-left md:text-right">
            <span className="block text-[9px] font-bold text-amber-800 uppercase tracking-wider">Estimated Group Budget</span>
            <span className="font-black text-2xl text-amber-950">
              ₹{tripData.breakdown.grandTotal.toLocaleString("en-IN")}
            </span>
            <span className="block text-[9px] text-amber-800/80 font-semibold mt-0.5">
              ₹{tripData.breakdown.costPerPerson.toLocaleString("en-IN")} per person
            </span>
          </div>
        </div>
      </div>

      {/* Render Warnings at the absolute top */}
      <div className="space-y-4">
        {/* 1. Road Closure Banner (Blocking) */}
        {/* 4. Weather Banner */}
        <WeatherBanner weather={tripData.weather} roadClosure={tripData.roadClosure} />
        
        {/* 2 & 3. Cash and Network Warning Boxes */}
        {(!tripData.cashAvailability.hasATM || (tripData.networkCoverage && tripData.networkCoverage.bestNetwork.toLowerCase().includes("bsnl"))) && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center space-x-2 text-red-950 font-extrabold text-xs tracking-wider uppercase">
              <AlertOctagon className="h-4.5 w-4.5 text-red-700" />
              <span>Critical Remote Warnings</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              {!tripData.cashAvailability.hasATM && (
                <div className="bg-white border border-red-100 rounded-xl p-3.5 shadow-sm space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-red-950 mb-1">
                    <Landmark className="h-4 w-4 text-red-700" />
                    <span>⚠️ ATM Warning: Cash Mandatory</span>
                  </div>
                  <p className="text-gray-700 text-[11px]">
                    No ATMs at {tripData.destinationInfo.name}. You must withdraw at least <span className="font-extrabold text-red-700">{tripData.cashAvailability.recommendedCashAmount}</span> at <span className="font-bold">{tripData.cashAvailability.lastATMBeforeDestination}</span>. UPI will NOT work.
                  </p>
                </div>
              )}

              {tripData.networkCoverage && tripData.networkCoverage.bestNetwork.toLowerCase().includes("bsnl") && (
                <div className="bg-white border border-red-100 rounded-xl p-3.5 shadow-sm space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-red-950 mb-1">
                    <Signal className="h-4 w-4 text-red-700" />
                    <span>📶 Network Warning: BSNL SIM Needed</span>
                  </div>
                  <p className="text-gray-700 text-[11px]">
                    Standard Jio/Airtel SIMs have zero network. BSNL is the only working carrier here. Download offline maps and inform family of route details before departing.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Altitude Warning Banner */}
        {tripData.destinationInfo.altitude && tripData.destinationInfo.altitude > 2500 && (
          <AltitudeWarning altitude={tripData.destinationInfo.altitude} altitudeHealth={tripData.tips.altitudeHealth} />
        )}
      </div>

      {/* 6. Transport Segment */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-[#FF9933] rounded-full"></span>
          <span>Outbound Journey Transport Details</span>
        </h3>
        {tripData.transport.type === "direct" ? (
          <TransportCard options={tripData.transport.options} />
        ) : (
          <MultiLegRoute route={tripData.transport.route} />
        )}
      </div>

      {/* 7. Trek Section (if applicable) */}
      {isTrek && tripData.trekInfo && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
            <span className="h-5 w-1.5 bg-emerald-600 rounded-full"></span>
            <span>Trekking Specifications</span>
          </h3>
          <TrekCard
            trekInfo={tripData.trekInfo}
            diyTotal={tripData.breakdown.diyTotal}
            packageTotal={tripData.breakdown.packageTotal}
            travelers={parseInt(travelersStr, 10)}
          />
        </div>
      )}

      {/* 8. Accommodations Section */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-blue-600 rounded-full"></span>
          <span>Recommended Accommodations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tripData.hotels.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </div>
      </div>

      {/* 9. Local Food Guide */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 border-b border-gray-100 pb-2">Must-Eat Local Dishes</h4>
          <div className="space-y-3.5">
            {tripData.foodGuide?.mustEat?.map((m, i) => (
              <div key={i} className="text-xs">
                <span className="font-bold text-gray-900 block">{m.dish} (approx. ₹{m.approxPrice})</span>
                <span className="text-gray-500 block leading-tight mt-0.5">{m.description}</span>
                {m.recommendedPlace && (
                  <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">📍 Rec: {m.recommendedPlace}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-slate-900 mb-3 border-b border-gray-100 pb-2">Recommended Budget Eateries</h4>
          <div className="space-y-3.5">
            {tripData.foodGuide?.budgetEateries?.map((e, i) => (
              <div key={i} className="text-xs">
                <span className="font-bold text-gray-900 block">{e.name} ({e.area})</span>
                <span className="text-gray-500 block leading-tight mt-0.5">Specialty: {e.specialty} | Cost for two: ₹{e.approxCostTwo}</span>
              </div>
            ))}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-[11px] text-emerald-900 mt-2 font-medium">
              🍱 Local Thali cost estimate: ₹{tripData.foodGuide?.thaliCostEstimate} per plate
            </div>
          </div>
        </div>
      </div>

      {/* 10. Day Card List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-[#138808] rounded-full"></span>
          <span>Day-by-Day Travel Itinerary</span>
        </h3>
        <div className="space-y-3.5">
          {tripData.itinerary.map((day, i) => (
            <DayCard key={i} dayPlan={day} />
          ))}
        </div>
      </div>

      {/* 11 & 12. Budget Breakdown & Expense Splitter */}
      <div className="space-y-6">
        <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-slate-800 rounded-full"></span>
          <span>Budget breakdown & Expenses</span>
        </h3>
        <BudgetSummaryTable breakdown={tripData.breakdown} travelers={parseInt(travelersStr, 10)} />
        <SplitCalculator breakdown={tripData.breakdown} travelers={parseInt(travelersStr, 10)} />
      </div>

      {/* 13. Live Budget Calculator Slider */}
      <BudgetCalculator initialBreakdown={tripData.breakdown} isTrek={isTrek} />

      {/* 14 & 15. Packing & Safety/Etiquette */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PackingList
          items={tripData.packingList}
          cashAvailability={tripData.cashAvailability}
          networkCoverage={tripData.networkCoverage}
        />
        <SafetyTips
          tips={tripData.tips}
          cashAvailability={tripData.cashAvailability}
          networkCoverage={tripData.networkCoverage}
        />
      </div>

      {/* 16. Printable Emergency Card */}
      <EmergencyCard
        destination={tripData.destinationInfo.name}
        dates={`${startDate} to ${new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(daysStr, 10))).toISOString().split("T")[0]}`}
        tips={tripData.tips}
        cashAvailability={tripData.cashAvailability}
        networkCoverage={tripData.networkCoverage}
        hotel={tripData.hotels[0]?.name}
      />

      {/* 17. Booking Links Hub */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-amber-500 rounded-full"></span>
          <span>Online Booking Links Hub</span>
        </h3>
        <BookingHub
          bookingLinks={tripData.bookingLinks}
          destinationState={tripData.destinationInfo.state}
        />
      </div>

    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-12 text-sm text-slate-500 animate-pulse">Loading Trip Plan...</div>}>
        <ResultsContent />
      </Suspense>
    </main>
  );
}
