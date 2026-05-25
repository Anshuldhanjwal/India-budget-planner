import { MonthName, TripRequest, TripResponse, CompareResponse, BookingLink, BudgetLevel } from "@/lib/types";
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

const MONTHS: MonthName[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper to generate a single trip plan response (same logic as POST /api/plan)
function generatePlan(request: TripRequest): TripResponse {
  const { source, destination, startDate, days, travelers, budget } = request;

  const destInfo = getDestination(destination);
  if (!destInfo) {
    throw new Error(`Destination '${destination}' not found in registry`);
  }

  // Extract Month Name
  const dateObj = new Date(startDate);
  const month = MONTHS[dateObj.getMonth()];

  const distanceKm = getCityDistance(source, destination);
  const transport = getTransportResult(source, destination, budget, travelers);
  const trekInfo = getTrek(destination);
  const isTrek = !!trekInfo;
  
  const permits = getPermits(destination);
  const gearRental = isTrek && trekInfo ? getGearShops(trekInfo.baseCamp) : undefined;
  const hotels = getHotelsForDestination(destination, budget);
  const weather = getDestinationWeather(destination, month);
  const roadClosure = getRoadClosure(destination, month) || undefined;
  const foodGuide = getFoodGuide(destination);
  const localTransport = getLocalTransport(destination);
  const connectivity = getConnectivity(destination) || undefined;
  const tips = getCityTips(destination);
  
  const itinerary = generateItinerary(source, destination, days, transport);
  const breakdown = calculateBreakdown(source, destination, days, travelers, budget, month);
  const packingList = generatePackingList(destination, isTrek, destInfo.altitude, month);

  // Weather warning
  let weatherWarning: string | undefined;
  if (weather.status === "risky") {
    if (["July", "August"].includes(month)) {
      weatherWarning = `⚠️ Monsoon peak in ${month}. High risk of landslides, heavy downpours, and road blockages in hills.`;
    } else if (["December", "January", "February"].includes(month)) {
      weatherWarning = `⚠️ Winter peak in ${month}. Sub-zero temperatures and snow blocks are highly likely.`;
    }
  }

  // Build general booking links
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

  // State Transport RTC links
  const stateTransportLinks: BookingLink[] = [];
  const state = destInfo.state.toLowerCase();
  if (state === "himachal pradesh") {
    stateTransportLinks.push({
      label: "HRTC (Himachal Road Transport)",
      url: "https://hrtchp.com/hrtctickets/",
      category: "state-bus",
      tips: "Cheaper and highly reliable government buses."
    });
  } else if (state === "uttarakhand") {
    stateTransportLinks.push({
      label: "UTC (Uttarakhand Transport Corp)",
      url: "https://utconline.uk.gov.in/",
      category: "state-bus",
      tips: "Government buses connecting Rishikesh/Dehradun to trek bases."
    });
  } else if (state === "karnataka") {
    stateTransportLinks.push({
      label: "KSRTC (Karnataka State Transport)",
      url: "https://www.ksrtc.in/",
      category: "state-bus",
      tips: "Excellent Volvo services to Coorg, Hampi, Gokarna."
    });
  } else if (state === "kerala") {
    stateTransportLinks.push({
      label: "KSRTC Kerala",
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
        tips: `Requires registration ${p.advanceDays} days in advance.`
      });
    }
  });

  return {
    request,
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dest1 = searchParams.get("dest1");
    const dest2 = searchParams.get("dest2");
    const source = searchParams.get("source");
    const daysStr = searchParams.get("days");
    const travelersStr = searchParams.get("travelers");
    const budget = searchParams.get("budget");
    const startDate = searchParams.get("startDate");

    // Validation
    if (!dest1 || !dest2 || !source || !daysStr || !travelersStr || !budget || !startDate) {
      return Response.json({ error: "Missing required query parameters" }, { status: 400 });
    }

    const days = parseInt(daysStr, 10);
    const travelers = parseInt(travelersStr, 10);

    if (isNaN(days) || isNaN(travelers)) {
      return Response.json({ error: "Days and travelers must be valid numbers" }, { status: 400 });
    }

    if (dest1.toLowerCase() === dest2.toLowerCase()) {
      return Response.json({ error: "Cannot compare a destination with itself" }, { status: 400 });
    }

    // Call generators in parallel using standard Promise.all
    const [plan1, plan2] = await Promise.all([
      Promise.resolve().then(() => generatePlan({ source, destination: dest1, startDate, days, travelers, budget: budget as BudgetLevel })),
      Promise.resolve().then(() => generatePlan({ source, destination: dest2, startDate, days, travelers, budget: budget as BudgetLevel }))
    ]);

    const compareResponse: CompareResponse = {
      plan1,
      plan2
    };

    return Response.json(compareResponse);
  } catch (error: unknown) {
    console.error("Error generating comparison:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: "Failed to generate comparison", details: errorMessage }, { status: 500 });
  }
}
