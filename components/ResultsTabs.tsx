"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TripResponse } from "@/lib/types";
import { AlertOctagon, Landmark, Signal, ArrowLeft, Share2, Printer } from "lucide-react";
import dynamic from "next/dynamic";

// Import other static client components
import WeatherBanner from "./WeatherBanner";
import AltitudeWarning from "./AltitudeWarning";
import TransportCard from "./TransportCard";
import MultiLegRoute from "./MultiLegRoute";
import TrekCard from "./TrekCard";
import MultiPlatformHotelCard from "./MultiPlatformHotelCard";
import BudgetSummaryTable from "./BudgetSummaryTable";
import SplitCalculator from "./SplitCalculator";
import BudgetCalculator from "./BudgetCalculator";
import PackingList from "./PackingList";
import SafetyTips from "./SafetyTips";
import EmergencyCard from "./EmergencyCard";
import BookingHub from "./BookingHub";
import QuickActions from "./QuickActions";
import PrintItineraryButton from "./PrintItineraryButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

// Lazy-load DayCard using next/dynamic
const DayCard = dynamic(() => import("./DayCard"), {
  loading: () => <div className="h-24 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse" />
});

// SECTION A: TAB DEFINITIONS
const TABS = [
  { id: "overview",      label: "Overview",        icon: "🗺️",  index: 0 },
  { id: "getting-there", label: "Getting There",   icon: "🚆",  index: 1 },
  { id: "stay-eat",      label: "Stay & Eat",      icon: "🏨",  index: 2 },
  { id: "itinerary",     label: "Itinerary",       icon: "📅",  index: 3 },
  { id: "budget",         label: "Budget",          icon: "💰",  index: 4 },
  { id: "plan-pack",      label: "Plan & Pack",     icon: "🎒",  index: 5 },
  { id: "book",           label: "Book Everything", icon: "🔖",  index: 6 },
];

interface ResultsTabsProps {
  initialTab: string;
  tripData: TripResponse;
  hasCriticalWarning: boolean;
}

export default function ResultsTabs({
  initialTab,
  tripData,
  hasCriticalWarning
}: ResultsTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [copied, setCopied] = useState(false);

  // SECTION C: LAZY MOUNTING
  const [mounted, setMounted] = useState<Record<string, boolean>>({
    overview: true
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMounted(prev => ({ ...prev, [tabId]: true }));

    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("tab", activeTab);
    const fullUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintAll = () => {
    window.print();
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      handleTabChange(TABS[nextIndex].id);
      // Focus the new tab button
      const button = document.getElementById(`tab-btn-${TABS[nextIndex].id}`);
      button?.focus();
    }
  };

  const isTrek = !!tripData.trekInfo;
  const grandTotal = tripData.breakdown.grandTotal;
  const costPerPerson = tripData.breakdown.costPerPerson;

  // Budget Score evaluation
  const getBudgetScore = () => {
    if (costPerPerson < 5000) return { emoji: "🟢", label: "Great Deal", color: "text-emerald-700 bg-emerald-50 border border-emerald-200" };
    if (costPerPerson < 15000) return { emoji: "🟡", label: "Moderate Cost", color: "text-amber-700 bg-amber-50 border border-amber-200" };
    return { emoji: "🔴", label: "Expensive", color: "text-red-700 bg-red-50 border border-red-200" };
  };
  const budgetScore = getBudgetScore();

  // Create booking platform params object
  const bookingParams = {
    source: tripData.request.source,
    destination: tripData.destinationInfo.name,
    date: tripData.request.startDate,
    checkin: tripData.request.startDate,
    checkout: new Date(new Date(tripData.request.startDate).setDate(new Date(tripData.request.startDate).getDate() + tripData.request.days)).toISOString().split("T")[0],
    travelers: tripData.request.travelers,
    destinationInfo: tripData.destinationInfo
  };

  return (
    <div className="space-y-6">
      {/* Back button and page Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5 no-print">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-700 font-bold uppercase tracking-wider self-start cursor-pointer select-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Modify Search</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-1.5 text-xs border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-3 py-2 rounded-xl transition-colors shadow-sm bg-white cursor-pointer select-none"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? "Copied Link!" : "Copy Trip Link"}</span>
          </button>
          <button
            onClick={handlePrintAll}
            className="inline-flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer select-none"
          >
            <Printer className="h-4 w-4" />
            <span>Print Full Itinerary</span>
          </button>
        </div>
      </div>

      {/* SECTION H: MOBILE STICKY TAB BAR */}
      <div className="tab-bar sticky top-0 z-50 bg-white border-b border-slate-200 h-[48px] flex items-center overflow-x-auto no-print scrollbar-none">
        <div role="tablist" className="flex flex-row flex-nowrap h-full w-full">
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const isPlanPack = tab.id === "plan-pack";
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tab-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative flex items-center space-x-1.5 h-full px-4 min-width-fit-content white-space-nowrap text-xs font-bold transition-all select-none hover:bg-orange-50/40 outline-hidden cursor-pointer ${
                  isActive
                    ? "border-b-2 border-[#FF9933] text-slate-900 font-extrabold"
                    : "text-slate-500 border-b-2 border-transparent hover:text-slate-800"
                }`}
              >
                {/* Icon hidden under 480px width */}
                <span className="hidden sm:inline">{tab.icon}</span>
                <span>{tab.label}</span>

                {/* SECTION D & SECTION H: WARNING RED DOT */}
                {isPlanPack && hasCriticalWarning && (
                  <span className="absolute top-2.5 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}

      {/* TAB 1: Overview */}
      <div hidden={activeTab !== "overview"} data-tab-panel="overview">
        {mounted["overview"] && (
          <div className="space-y-6">
            <WeatherBanner weather={tripData.weather} roadClosure={tripData.roadClosure} />

            {/* Warnings Alert Box */}
            {(!tripData.cashAvailability.hasATM || (tripData.networkCoverage && tripData.networkCoverage.bestNetwork.toLowerCase().includes("bsnl"))) && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-5 space-y-2.5">
                <div className="flex items-center space-x-2 text-red-950 font-extrabold text-xs tracking-wider uppercase">
                  <AlertOctagon className="h-4.5 w-4.5 text-red-700" />
                  <span>Critical Warnings</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  {!tripData.cashAvailability.hasATM && (
                    <div className="bg-white border border-red-100 rounded-2xl p-3.5 shadow-xs space-y-1">
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
                    <div className="bg-white border border-red-100 rounded-2xl p-3.5 shadow-xs space-y-1">
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

            {/* Altitude Warning */}
            {tripData.destinationInfo.altitude && tripData.destinationInfo.altitude > 2500 && (
              <AltitudeWarning altitude={tripData.destinationInfo.altitude} altitudeHealth={tripData.tips.altitudeHealth} />
            )}

            {/* Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="h-full w-1/3 bg-[#FF9933]"></div>
                <div className="h-full w-1/3 bg-white"></div>
                <div className="h-full w-1/3 bg-[#138808]"></div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF9933]">
                  {tripData.destinationInfo.type[0].replace("-", " ")} ITINERARY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {tripData.request.source} to {tripData.destinationInfo.name}
                </h2>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span>📅 {tripData.request.startDate}</span>
                  <span>•</span>
                  <span>👥 {tripData.request.travelers} Travelers</span>
                  <span>•</span>
                  <span>💰 {tripData.request.budget.toUpperCase()}</span>
                </div>
                {/* Budget Score Badge */}
                <div className="pt-1">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold select-none inline-flex items-center space-x-1.5 ${budgetScore.color}`}>
                    <span>{budgetScore.emoji}</span>
                    <span>Budget Score: {budgetScore.label}</span>
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 shrink-0 flex flex-row md:flex-col justify-between items-center md:items-end gap-3 w-full md:w-auto">
                <div className="text-left md:text-right">
                  <span className="block text-[9px] font-bold text-amber-800 uppercase tracking-wider">Estimated Total</span>
                  <span className="font-black text-2xl text-amber-950">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                  <span className="block text-[9px] text-amber-800/80 font-bold mt-0.5">
                    ₹{costPerPerson.toLocaleString("en-IN")} / person
                  </span>
                </div>
                <WhatsAppShareButton
                  source={tripData.request.source}
                  destination={tripData.destinationInfo.name}
                  startDate={tripData.request.startDate}
                  days={tripData.request.days}
                  travelers={tripData.request.travelers}
                  budgetLevel={tripData.request.budget}
                  mode={tripData.transport.type === "direct" ? tripData.transport.options.find(o => o.recommended)?.mode || "Transport" : "Multi-leg"}
                  transportCost={tripData.breakdown.transportCost}
                  accommodationCost={tripData.breakdown.accommodationCost * (tripData.request.days - 1)}
                  foodCost={tripData.breakdown.foodCost}
                  activitiesCost={tripData.breakdown.activitiesCost}
                  grandTotal={grandTotal}
                  costPerPerson={costPerPerson}
                  budgetScoreEmoji={budgetScore.emoji}
                  budgetScoreLabel={budgetScore.label}
                  weatherWarning={tripData.weatherWarning}
                />
              </div>
            </div>

            {/* Budget Breakdown totals only summary */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-800 text-xs tracking-wider uppercase">
                Estimated Budget Category Summaries
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Transport</span>
                  <span className="text-base font-black text-slate-800">₹{tripData.breakdown.transportCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Accommodation</span>
                  <span className="text-base font-black text-slate-800">₹{(tripData.breakdown.accommodationCost * (tripData.request.days - 1)).toLocaleString("en-IN")}</span>
                </div>
                <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Food & Meals</span>
                  <span className="text-base font-black text-slate-800">₹{tripData.breakdown.foodCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Activities</span>
                  <span className="text-base font-black text-slate-800">₹{tripData.breakdown.activitiesCost.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation actions */}
            <QuickActions onTabChange={handleTabChange} />
          </div>
        )}
      </div>

      {/* TAB 2: Getting There */}
      <div hidden={activeTab !== "getting-there"} data-tab-panel="getting-there">
        {mounted["getting-there"] && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
                <span className="h-5 w-1.5 bg-[#FF9933] rounded-full"></span>
                <span>Outbound Transport Routes</span>
              </h3>
              {tripData.transport.type === "direct" ? (
                <TransportCard options={tripData.transport.options} />
              ) : (
                <MultiLegRoute route={tripData.transport.route} />
              )}
            </div>

            {/* Return Journey Card with Saffron left border */}
            <div className="bg-white border-l-4 border-[#FF9933] border-y border-r border-slate-200 rounded-r-3xl p-6 shadow-sm space-y-2">
              <h4 className="font-extrabold text-slate-800 text-sm">
                🚆 Return Journey Details
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {tripData.breakdown.returnJourneySummary || "Detailed return options depend on outbound routes. Verify timetables before booking return journeys."}
              </p>
            </div>

            {/* Group size cab recommendation */}
            {tripData.request.travelers >= 5 && tripData.transport.type === "multi-leg" && tripData.transport.route.tip && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed font-semibold">
                {tripData.transport.route.tip}
              </div>
            )}

            {/* Transport booking hub comparison */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-800 text-sm">
                Compare Ticket Platforms & Book Outbound Journey
              </h4>
              <BookingHub
                destinationState={tripData.destinationInfo.state}
                isTrekDestination={isTrek}
                params={bookingParams}
              />
            </div>
          </div>
        )}
      </div>

      {/* TAB 3: Stay & Eat */}
      <div hidden={activeTab !== "stay-eat"} data-tab-panel="stay-eat">
        {mounted["stay-eat"] && (
          <div className="space-y-6">
            {/* Stay recommendations */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-2">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
                  <span className="h-5 w-1.5 bg-blue-600 rounded-full"></span>
                  <span>Accommodation Recommendations</span>
                </h3>
                {/* Smart Budget Recommendations Banner */}
                <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {tripData.request.budget === "ultra-budget" && "💡 Recommend Zostel or Hostelworld dorms"}
                  {tripData.request.budget === "budget" && "💡 Recommend OYO or Goibibo private rooms"}
                  {tripData.request.budget === "moderate" && "💡 Recommend Booking.com or MakeMyTrip selections"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tripData.hotels.map((hotel, i) => (
                  <MultiPlatformHotelCard key={i} hotel={hotel} params={bookingParams} />
                ))}
              </div>
            </div>

            {/* Food Guides */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">Must-Eat Local Dishes</h4>
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
              <div className="space-y-4">
                <div>
                  <h4 className="font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">Recommended Budget Eateries</h4>
                  <div className="space-y-3.5">
                    {tripData.foodGuide?.budgetEateries?.map((e, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-bold text-gray-900 block">{e.name} ({e.area})</span>
                        <span className="text-gray-500 block leading-tight mt-0.5">Specialty: {e.specialty} | Cost for two: ₹{e.approxCostTwo}</span>
                      </div>
                    ))}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-[11px] text-emerald-900 font-medium">
                      🍱 Local Thali cost estimate: ₹{tripData.foodGuide?.thaliCostEstimate} per plate
                    </div>
                  </div>
                </div>

                {/* Daily food budget details */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                  <h5 className="font-bold text-xs text-slate-800">Food Budget Estimates</h5>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center font-bold">
                    <div className="p-2 bg-white rounded-xl border border-slate-200/50">
                      <span>Breakfast</span>
                      <span className="block text-xs font-black text-slate-800 mt-0.5">₹150/day</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200/50">
                      <span>Lunch</span>
                      <span className="block text-xs font-black text-slate-800 mt-0.5">₹250/day</span>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-slate-200/50">
                      <span>Dinner</span>
                      <span className="block text-xs font-black text-slate-800 mt-0.5">₹300/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Transport Guide */}
            {tripData.localTransport && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2">Local Commute Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tripData.localTransport.options.map((opt, i) => (
                    <div key={i} className="text-xs p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                      <span className="font-bold text-slate-950 block">{opt.mode} ({opt.costRange})</span>
                      <p className="text-slate-500 font-semibold leading-relaxed">{opt.tips}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TAB 4: Itinerary */}
      <div hidden={activeTab !== "itinerary"} data-tab-panel="itinerary">
        {mounted["itinerary"] && (
          <div className="space-y-6">
            <div className="flex items-center justify-between no-print">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
                <span className="h-5 w-1.5 bg-[#138808] rounded-full"></span>
                <span>Itinerary Details</span>
              </h3>
              <PrintItineraryButton />
            </div>

            {/* Trek Specs Banner if applicable */}
            {isTrek && tripData.trekInfo && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2 no-print">
                  <span className="h-5 w-1.5 bg-emerald-600 rounded-full"></span>
                  <span>Trekking Details</span>
                </h3>
                <TrekCard
                  trekInfo={tripData.trekInfo}
                  diyTotal={tripData.breakdown.diyTotal}
                  packageTotal={tripData.breakdown.packageTotal}
                  travelers={tripData.request.travelers}
                />
              </div>
            )}

            {/* Print Mode scoped Div */}
            <div className="print-itinerary-section space-y-3.5" data-tab-panel="itinerary">
              <div className="hidden print-only-header border-b-2 border-slate-200 pb-3 mb-6">
                <h2 className="text-2xl font-bold">{tripData.request.source} to {tripData.destinationInfo.name} Detailed Itinerary</h2>
                <p className="text-xs text-slate-500 mt-1">Starting Date: {tripData.request.startDate} | {tripData.request.days} Days Plan</p>
              </div>
              {tripData.itinerary.map((day, i) => (
                <DayCard key={i} dayPlan={day} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TAB 5: Budget */}
      <div hidden={activeTab !== "budget"} data-tab-panel="budget">
        {mounted["budget"] && (
          <div className="space-y-6">
            {/* Table and calculators */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2">
                <span className="h-5 w-1.5 bg-slate-800 rounded-full"></span>
                <span>Full Itemized Expenses</span>
              </h3>
              <BudgetSummaryTable breakdown={tripData.breakdown} travelers={tripData.request.travelers} />
            </div>

            {/* Split Calculator */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Group Expenses Splitting Calculator</h4>
              <SplitCalculator breakdown={tripData.breakdown} travelers={tripData.request.travelers} />
            </div>

            {/* Budget calculator slider adjustments */}
            <BudgetCalculator initialBreakdown={tripData.breakdown} isTrek={isTrek} />
          </div>
        )}
      </div>

      {/* TAB 6: Plan & Pack */}
      <div hidden={activeTab !== "plan-pack"} data-tab-panel="plan-pack">
        {mounted["plan-pack"] && (
          <div className="space-y-6">
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

            {/* Network connectivity guide detail card */}
            {tripData.networkCoverage && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Connectivity & SIM Networks Guide</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-3">
                  Destination: <span className="text-slate-900 font-extrabold">{tripData.networkCoverage.destination}</span>
                </p>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold mb-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Jio</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold ${
                      tripData.networkCoverage.jio === "good" ? "bg-emerald-50 text-emerald-700" :
                      tripData.networkCoverage.jio === "patchy" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                    }`}>{tripData.networkCoverage.jio}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Airtel</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold ${
                      tripData.networkCoverage.airtel === "good" ? "bg-emerald-50 text-emerald-700" :
                      tripData.networkCoverage.airtel === "patchy" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                    }`}>{tripData.networkCoverage.airtel}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">BSNL</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold ${
                      tripData.networkCoverage.bsnl === "good" ? "bg-emerald-50 text-emerald-700" :
                      tripData.networkCoverage.bsnl === "patchy" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                    }`}>{tripData.networkCoverage.bsnl}</span>
                  </div>
                </div>
                <div className="text-xs space-y-1.5 font-medium text-slate-500 leading-relaxed">
                  <p>🛰️ <span className="text-slate-800 font-bold">Best SIM coverage:</span> {tripData.networkCoverage.bestNetwork}</p>
                  <p>🗺️ <span className="text-slate-800 font-bold">Offline map advice:</span> {tripData.networkCoverage.offlineMapsAdvice}</p>
                  <p>📶 <span className="text-slate-800 font-bold">Wi-Fi networks:</span> {tripData.networkCoverage.hasWifi ? `Available (Quality: ${tripData.networkCoverage.wifiQuality || "standard"})` : "None"}</p>
                </div>
              </div>
            )}

            {/* Emergency printable wallet card */}
            <EmergencyCard
              destination={tripData.destinationInfo.name}
              dates={`${tripData.request.startDate} to ${new Date(new Date(tripData.request.startDate).setDate(new Date(tripData.request.startDate).getDate() + tripData.request.days)).toISOString().split("T")[0]}`}
              tips={tripData.tips}
              cashAvailability={tripData.cashAvailability}
              networkCoverage={tripData.networkCoverage}
              hotel={tripData.hotels[0]?.name}
            />
          </div>
        )}
      </div>

      {/* TAB 7: Book Everything */}
      <div hidden={activeTab !== "book"} data-tab-panel="book">
        {mounted["book"] && (
          <div className="space-y-6">
            <BookingHub
              destinationState={tripData.destinationInfo.state}
              isTrekDestination={isTrek}
              params={bookingParams}
            />
          </div>
        )}
      </div>
    </div>
  );
}
