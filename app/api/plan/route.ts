import { MonthName, TripRequest, TripResponse, BookingLink } from "@/lib/types";
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

// Next.js 14 API Route handler using Response.json()
export async function POST(req: Request) {
  try {
    const body: TripRequest = await req.json();
    const { source, destination, startDate, days, travelers, budget } = body;

    // Validation
    if (!source || !destination || !startDate || !days || !travelers || !budget) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (source.toLowerCase() === destination.toLowerCase()) {
      return Response.json({ error: "Source and destination cannot be the same" }, { status: 400 });
    }

    const destInfo = getDestination(destination);
    if (!destInfo) {
      return Response.json({ error: `Destination '${destination}' not found in registry` }, { status: 404 });
    }

    const sourceInfo = getDestination(source);
    if (!sourceInfo) {
      return Response.json({ error: `Source city '${source}' not found in registry` }, { status: 404 });
    }

    // Extract Month Name
    const dateObj = new Date(startDate);
    if (isNaN(dateObj.getTime())) {
      return Response.json({ error: "Invalid start date format" }, { status: 400 });
    }
    const month = MONTHS[dateObj.getMonth()];

    // Calculations
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

    // Weather warning string
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

    // Flight booking if flight exists in transport options
    const hasFlight = transport.type === "direct" && transport.options.some(o => o.mode === "Flight");
    if (hasFlight) {
      bookingLinks.push({
        label: "MakeMyTrip Flights",
        url: "https://www.makemytrip.com/flights/",
        category: "flight",
        tips: "Use incognito mode and book midweek for cheaper airfares."
      });
    }

    // State Transport RTC links
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

    // Trek Permit booking if any permits have online URLs
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

    const response: TripResponse = {
      request: body,
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

    return Response.json(response);
  } catch (error: unknown) {
    console.error("Error generating trip plan:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}
