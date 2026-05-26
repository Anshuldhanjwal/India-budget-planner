import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, AlertOctagon } from "lucide-react";
import { MonthName, TripResponse, BookingLink } from "@/lib/types";
import { getDestination } from "@/lib/destinations";
import { getCityDistance } from "@/lib/distances";
import { getTransportResult } from "@/lib/transport";
import { getTrek } from "@/lib/treks";
import { getPermits } from "@/lib/permits";
import { getGearShops } from "@/lib/gear";
import { getHotelsForDestination } from "@/lib/hotels";
import { getDestinationWeather, getRoadClosure } from "@/lib/weather";
import { generateItinerary } from "@/lib/itinerary";
import { calculateBreakdown } from "@/lib/pricing";
import { generatePackingList } from "@/lib/packing";
import { getCityTips } from "@/lib/tips";
import { getConnectivity } from "@/lib/connectivity";
import { getFoodGuide } from "@/lib/food";
import { getLocalTransport } from "@/lib/localTransport";

// Import components
import ResultsTabs from "@/components/ResultsTabs";
import TabsSkeleton from "@/components/TabsSkeleton";

const MONTHS: MonthName[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getTripPlanData(
  source: string,
  destination: string,
  startDate: string,
  daysStr: string,
  travelersStr: string,
  budget: string
): TripResponse {
  const days = parseInt(daysStr, 10) || 5;
  const travelers = parseInt(travelersStr, 10) || 2;

  const destInfo = getDestination(destination);
  if (!destInfo) {
    throw new Error(`Destination '${destination}' not found in registry`);
  }

  const sourceInfo = getDestination(source);
  if (!sourceInfo) {
    throw new Error(`Source city '${source}' not found in registry`);
  }

  const dateObj = new Date(startDate);
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid start date format");
  }
  const month = MONTHS[dateObj.getMonth()];

  const distanceKm = getCityDistance(source, destination);
  const transport = getTransportResult(source, destination, budget as any, travelers);
  const trekInfo = getTrek(destination);
  const isTrek = !!trekInfo;
  
  const permits = getPermits(destination);
  const gearRental = isTrek && trekInfo ? getGearShops(trekInfo.baseCamp) : undefined;
  const hotels = getHotelsForDestination(destination, budget as any);
  const weather = getDestinationWeather(destination, month);
  const roadClosure = getRoadClosure(destination, month) || undefined;
  const foodGuide = getFoodGuide(destination);
  const localTransport = getLocalTransport(destination);
  const connectivity = getConnectivity(destination) || undefined;
  const tips = getCityTips(destination);
  const itinerary = generateItinerary(source, destination, days, transport);
  const breakdown = calculateBreakdown(source, destination, days, travelers, budget as any, month);
  const packingList = generatePackingList(destination, isTrek, destInfo.altitude, month);

  let weatherWarning: string | undefined;
  if (weather.status === "risky") {
    if (["July", "August"].includes(month)) {
      weatherWarning = `⚠️ Monsoon peak in ${month}. High risk of landslides, heavy downpours, and road blockages in hilly regions. Maintain buffer days.`;
    } else if (["December", "January", "February"].includes(month)) {
      weatherWarning = `⚠️ Winter peak in ${month}. Sub-zero temperatures and snow blocks are highly likely. Carry heavy woolens.`;
    } else if (["May", "June"].includes(month)) {
      weatherWarning = `⚠️ Summer peak in ${month}. Temperatures can reach up to 45°C. Stay hydrated and avoid outdoor travel between 12 PM - 4 PM.`;
    }
  }

  const bookingLinks: BookingLink[] = [
    {
      label: "IRCTC Train Booking",
      url: "https://www.irctc.co.in/nget/",
      category: "train",
      tips: "Book 60 days in advance for confirmed sleeper/AC berths."
    },
    {
      label: "RedBus Online Tickets",
      url: "https://www.redbus.in/",
      category: "bus",
      tips: "Ideal for intercity buses and private Volvos."
    },
    {
      label: "Booking.com Budget Stays",
      url: "https://www.booking.com/",
      category: "hotel",
      tips: "Compare ratings and check for free cancellation options."
    }
  ];

  const hasFlight = transport.type === "direct" && transport.options.some(o => o.mode === "Flight");
  if (hasFlight) {
    bookingLinks.push({
      label: "MakeMyTrip Flights",
      url: "https://www.makemytrip.com/flights/",
      category: "flight",
      tips: "Use incognito mode and book midweek for cheaper airfares."
    });
  }

  const stateTransportLinks: BookingLink[] = [];
  const state = destInfo.state.toLowerCase();
  if (state === "himachal pradesh") {
    stateTransportLinks.push({
      label: "HRTC (Himachal Road Transport)",
      url: "https://hrtchp.com/hrtctickets/",
      category: "state-bus",
      tips: "Cheaper and highly reliable government buses for remote valleys like Spiti, Chitkul, Jibhi."
    });
  } else if (state === "uttarakhand") {
    stateTransportLinks.push({
      label: "UTC (Uttarakhand Transport Corp)",
      url: "https://utconline.uk.gov.in/",
      category: "state-bus",
      tips: "Government buses connecting Rishikesh/Dehradun to remote trek bases like Sankri, Chopta."
    });
  } else if (state === "karnataka") {
    stateTransportLinks.push({
      label: "KSRTC (Karnataka State Transport)",
      url: "https://www.ksrtc.in/",
      category: "state-bus",
      tips: "Excellent Volvo multi-axle services to Coorg, Hampi, Gokarna."
    });
  } else if (state === "kerala") {
    stateTransportLinks.push({
      label: "KSRTC Kerala (Kerala State Transport)",
      url: "https://www.ksrtckerala.com/",
      category: "state-bus",
      tips: "Budget buses connecting Kochi to Munnar and Varkala."
    });
  } else if (state === "maharashtra") {
    stateTransportLinks.push({
      label: "MSRTC (Maharashtra State Transport)",
      url: "https://mahammt.mahaferry.in/",
      category: "state-bus",
      tips: "Cheap state buses to Pune, Alibaug, Lonavala."
    });
  }

  permits.forEach(p => {
    if (p.required && p.onlineUrl) {
      bookingLinks.push({
        label: `Book Permit: ${p.name}`,
        url: p.onlineUrl,
        category: "permit",
        tips: `Requires registration ${p.advanceDays} days in advance. Keep ID card photo ready.`
      });
    }
  });

  return {
    request: {
      source,
      destination,
      startDate,
      days,
      travelers,
      budget: budget as any
    },
    distanceKm,
    destinationInfo: destInfo,
    transport,
    hotels,
    itinerary,
    breakdown,
    foodGuide,
    weather,
    weatherWarning,
    roadClosure,
    packingList,
    tips,
    bookingLinks,
    localTransport,
    trekInfo: trekInfo || undefined,
    altitudeHealth: tips.altitudeHealth,
    permits,
    gearRental,
    cashAvailability: tips.cashAvailability,
    networkCoverage: connectivity,
    stateTransportLinks: stateTransportLinks.length > 0 ? stateTransportLinks : undefined
  };
}

interface PageProps {
  searchParams: Promise<{
    source?: string;
    destination?: string;
    startDate?: string;
    days?: string;
    travelers?: string;
    budget?: string;
    tab?: string;
  }>;
}

export default async function ResultsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const source = resolvedParams.source || "";
  const destination = resolvedParams.destination || "";
  const startDate = resolvedParams.startDate || "";
  const daysStr = resolvedParams.days || "5";
  const travelersStr = resolvedParams.travelers || "2";
  const budget = resolvedParams.budget || "budget";
  const currentTab = resolvedParams.tab || "overview";

  let tripData: TripResponse | null = null;
  let error = "";

  try {
    if (!source || !destination || !startDate) {
      throw new Error("Missing search parameters. Please go back and fill the form.");
    }
    tripData = getTripPlanData(source, destination, startDate, daysStr, travelersStr, budget);
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "An error occurred while building your plan.";
  }

  if (error || !tripData) {
    return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center space-y-4 py-16">
          <div className="inline-flex p-3 bg-red-100 text-red-800 rounded-2xl">
            <AlertOctagon className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Plan Generation Failed</h2>
          <p className="text-sm text-slate-500">{error || "Data load error"}</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    );
  }

  // SECTION B: Compute hasCriticalWarning (server side)
  const hasCriticalWarning =
    !tripData.tips?.cashAvailability?.hasATM ||
    (tripData.networkCoverage?.jio === "none" && tripData.networkCoverage?.airtel === "none") ||
    ["high", "very-high"].includes(tripData.tips?.altitudeHealth?.risk ?? "") ||
    tripData.weatherWarning?.includes("CLOSED") ||
    tripData.permits?.some((p: any) => p.required && p.advanceDays > 7) ||
    !!tripData.destinationInfo?.ilpRequired ||
    !!tripData.destinationInfo?.rapRequired;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto">
        <Suspense fallback={<TabsSkeleton />}>
          <ResultsTabs 
            initialTab={currentTab} 
            tripData={tripData}
            hasCriticalWarning={hasCriticalWarning}
          />
        </Suspense>
      </div>
    </main>
  );
}
