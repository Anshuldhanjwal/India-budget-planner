import { BudgetLevel } from "./types";

export interface BookingPlatform {
  name: string;
  category: "train" | "bus" | "flight" | "hotel" | "activity" | "trek";
  urlTemplate: string;
  affiliateTag?: string;
  isAffiliate: boolean;
  keyFeature: string;
  icon: string;
  stateRestriction?: string[];
  budgetFit?: BudgetLevel[];
  dateFormat?: string;
}

// TODO: Replace affiliateTag values with real tags after joining each program
// Apply at: confirmtkt.com/affiliates, railyatri.in, ixigo.com/affiliate,
//           redbus.in/affiliates, skyscanner.net/affiliates,
//           booking.com/affiliates, makemytrip.com affiliate program,
//           headout.com/affiliates, thrillophilia.com affiliate

export const STATION_CODES: Record<string, string> = {
  "delhi": "NDLS",
  "new delhi": "NDLS",
  "old delhi": "DLI",
  "mumbai": "CSTM",
  "mumbai central": "BCT",
  "bangalore": "SBC",
  "bengaluru": "SBC",
  "chennai": "MAS",
  "kolkata": "HWH",
  "howrah": "HWH",
  "sealdah": "SDAH",
  "hyderabad": "SC",
  "secunderabad": "SC",
  "pune": "PUNE",
  "ahmedabad": "ADI",
  "jaipur": "JP",
  "lucknow": "LKO",
  "chandigarh": "CDG",
  "amritsar": "ASR",
  "varanasi": "BSB",
  "agra": "AGC",
  "dehradun": "DDN",
  "haridwar": "HW",
  "rishikesh": "RKSH",
  "kathgodam": "KGM",
  "pathankot": "PTK",
  "jammu": "JAT",
  "goa": "MAO",
  "madgaon": "MAO",
  "thivim": "THVM",
  "bhopal": "BPL",
  "indore": "INDB",
  "nagpur": "NGP",
  "patna": "PNBE",
  "guwahati": "GHY",
  "dimapur": "DMV",
  "new jalpaiguri": "NJP",
  "kochi": "ERS",
  "ernakulam": "ERS",
  "manali": "CDG", // use Chandigarh CDG
  "kasol": "CDG"   // use Chandigarh CDG
};

export const AIRPORT_CODES: Record<string, string> = {
  "delhi": "DEL",
  "mumbai": "BOM",
  "bangalore": "BLR",
  "bengaluru": "BLR",
  "chennai": "MAA",
  "kolkata": "CCU",
  "hyderabad": "HYD",
  "pune": "PNQ",
  "ahmedabad": "AMD",
  "goa": "GOI",
  "kochi": "COK",
  "jaipur": "JAI",
  "lucknow": "LKO",
  "chandigarh": "IXC",
  "amritsar": "ATQ",
  "varanasi": "VNS",
  "bhopal": "BHO",
  "indore": "IDR",
  "nagpur": "NAG",
  "patna": "PAT",
  "guwahati": "GAU",
  "bagdogra": "IXB",
  "darjeeling": "IXB",
  "gangtok": "IXB",
  "dimapur": "DMU",
  "jammu": "IXJ",
  "dehradun": "DED",
  "coimbatore": "CJB",
  "vizag": "VTZ",
  "ranchi": "IXR"
};

export const TRAIN_PLATFORMS: BookingPlatform[] = [
  {
    name: "IRCTC Official",
    category: "train",
    urlTemplate: "https://www.irctc.co.in/nget/train-search",
    isAffiliate: false,
    keyFeature: "Official & Cheapest",
    icon: "🚂",
    dateFormat: "YYYY-MM-DD"
  },
  {
    name: "ConfirmTkt",
    category: "train",
    urlTemplate: "https://www.confirmtkt.com/train-search?from={src-station}&to={dst-station}&date={date}",
    isAffiliate: true,
    keyFeature: "Seat Availability Prediction",
    icon: "🚂",
    dateFormat: "DD-MM-YYYY"
  },
  {
    name: "RailYatri",
    category: "train",
    urlTemplate: "https://www.railyatri.in/train-tickets?source={src-station}&destination={dst-station}&date={date}",
    isAffiliate: true,
    keyFeature: "Live PNR Tracking",
    icon: "🚂",
    dateFormat: "DD-MM-YYYY"
  },
  {
    name: "Ixigo Trains",
    category: "train",
    urlTemplate: "https://www.ixigo.com/trains/{src-station}-to-{dst-station}/{src}-to-{dst}/{date}",
    isAffiliate: true,
    keyFeature: "Price Alerts",
    icon: "🚂",
    dateFormat: "DDMMYYYY"
  }
];

export const BUS_PLATFORMS: BookingPlatform[] = [
  {
    name: "RedBus",
    category: "bus",
    urlTemplate: "https://www.redbus.in/bus-tickets/{src}-to-{dst}/?doj={date}",
    isAffiliate: true,
    keyFeature: "Largest Inventory",
    icon: "🚌",
    dateFormat: "DD-MMM-YYYY"
  },
  {
    name: "AbhiBus",
    category: "bus",
    urlTemplate: "https://www.abhibus.com/bus_search/{src}/{dst}/{date}/S/0",
    isAffiliate: true,
    keyFeature: "Good for South India",
    icon: "🚌",
    dateFormat: "YYYY-MM-DD"
  },
  {
    name: "MakeMyTrip Bus",
    category: "bus",
    urlTemplate: "https://www.makemytrip.com/bus-tickets/{src}-to-{dst}/",
    isAffiliate: true,
    keyFeature: "Bundle Deals",
    icon: "🚌",
    dateFormat: "YYYY-MM-DD"
  }
];

export const STATE_RTC_MAP: Record<string, BookingPlatform> = {
  "Himachal Pradesh": {
    name: "HRTC",
    category: "bus",
    urlTemplate: "https://hrtchp.com/hrtctickets/",
    isAffiliate: false,
    keyFeature: "Cheapest for Himachal",
    icon: "🚌"
  },
  "Uttarakhand": {
    name: "UTC",
    category: "bus",
    urlTemplate: "https://utconline.uk.gov.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Uttarakhand",
    icon: "🚌"
  },
  "Karnataka": {
    name: "KSRTC KA",
    category: "bus",
    urlTemplate: "https://www.ksrtc.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Karnataka",
    icon: "🚌"
  },
  "Kerala": {
    name: "KSRTC KL",
    category: "bus",
    urlTemplate: "https://www.ksrtckerala.com/",
    isAffiliate: false,
    keyFeature: "Cheapest for Kerala",
    icon: "🚌"
  },
  "Maharashtra": {
    name: "MSRTC",
    category: "bus",
    urlTemplate: "https://mahammt.mahaferry.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Maharashtra",
    icon: "🚌"
  },
  "Uttar Pradesh": {
    name: "UPSRTC",
    category: "bus",
    urlTemplate: "https://upsrtconline.co.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for UP",
    icon: "🚌"
  },
  "Tamil Nadu": {
    name: "TNSTC",
    category: "bus",
    urlTemplate: "https://www.tnstc.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Tamil Nadu",
    icon: "🚌"
  },
  "Andhra Pradesh": {
    name: "APSRTC",
    category: "bus",
    urlTemplate: "https://booking.apsrtconline.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Andhra",
    icon: "🚌"
  },
  "Telangana": {
    name: "TSRTC",
    category: "bus",
    urlTemplate: "https://www.tsrtc.telangana.gov.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Telangana",
    icon: "🚌"
  },
  "Rajasthan": {
    name: "RSRTC",
    category: "bus",
    urlTemplate: "https://rsrtc.rajasthan.gov.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Rajasthan",
    icon: "🚌"
  },
  "Punjab": {
    name: "PRTC",
    category: "bus",
    urlTemplate: "https://prtcpunjab.com/",
    isAffiliate: false,
    keyFeature: "Cheapest for Punjab",
    icon: "🚌"
  },
  "Gujarat": {
    name: "GSRTC",
    category: "bus",
    urlTemplate: "https://www.gsrtc.in/",
    isAffiliate: false,
    keyFeature: "Cheapest for Gujarat",
    icon: "🚌"
  }
};

export const FLIGHT_PLATFORMS: BookingPlatform[] = [
  {
    name: "Google Flights",
    category: "flight",
    urlTemplate: "https://www.google.com/travel/flights?q=flights+from+{src}+to+{dst}+on+{date}",
    isAffiliate: false,
    keyFeature: "Best Price Comparison",
    icon: "✈️",
    dateFormat: "YYYY-MM-DD"
  },
  {
    name: "Skyscanner",
    category: "flight",
    urlTemplate: "https://www.skyscanner.co.in/flights/{src-code}/{dst-code}/{date}/",
    isAffiliate: true,
    keyFeature: "Price Alerts & Flex Dates",
    icon: "✈️",
    dateFormat: "YYMMDD"
  },
  {
    name: "MakeMyTrip Flights",
    category: "flight",
    urlTemplate: "https://www.makemytrip.com/flights/domestic/flying-from_{src-code}-to_{dst-code}.html?&departDate={date}",
    isAffiliate: true,
    keyFeature: "Indian Market Leader",
    icon: "✈️",
    dateFormat: "DD/MM/YYYY"
  },
  {
    name: "EaseMyTrip",
    category: "flight",
    urlTemplate: "https://www.easemytrip.com/flights/domestic-flights.aspx",
    isAffiliate: true,
    keyFeature: "No Convenience Fee Deals",
    icon: "✈️",
    dateFormat: "DD/MM/YYYY"
  },
  {
    name: "Ixigo Flights",
    category: "flight",
    urlTemplate: "https://www.ixigo.com/flights/results/oneway/{src-code}/{dst-code}/{date}/1/0/0/E/0/0/NOSTO",
    isAffiliate: true,
    keyFeature: "AI Price Prediction",
    icon: "✈️",
    dateFormat: "DDMMYYYY"
  },
  {
    name: "Cleartrip",
    category: "flight",
    urlTemplate: "https://www.cleartrip.com/flights/results?adults={travelers}&from={src-code}&to={dst-code}&depart_date={date}&type=O",
    isAffiliate: true,
    keyFeature: "Flash Sales",
    icon: "✈️",
    dateFormat: "DD/MM/YYYY"
  }
];

export const HOTEL_PLATFORMS: BookingPlatform[] = [
  {
    name: "MakeMyTrip Hotels",
    category: "hotel",
    urlTemplate: "https://www.makemytrip.com/hotels/hotel-listing/?city={city}&checkin={checkin}&checkout={checkout}&roomCount=1&adultsCount={travelers}",
    isAffiliate: true,
    keyFeature: "Widest India Inventory",
    icon: "🏨",
    dateFormat: "DD/MM/YYYY"
  },
  {
    name: "Booking.com",
    category: "hotel",
    urlTemplate: "https://www.booking.com/searchresults.html?ss={city}&checkin={checkin}&checkout={checkout}&group_adults={travelers}",
    isAffiliate: true,
    keyFeature: "Global Great Reviews",
    icon: "🏨",
    dateFormat: "YYYY-MM-DD"
  },
  {
    name: "Goibibo",
    category: "hotel",
    urlTemplate: "https://www.goibibo.com/hotels/hotels-in-{city-slug}/?ci={checkin}&co={checkout}&r=1&a={travelers}&child=0",
    isAffiliate: true,
    keyFeature: "Instant Booking & Pay at Hotel",
    icon: "🏨",
    dateFormat: "YYYYMMDD"
  },
  {
    name: "OYO",
    category: "hotel",
    urlTemplate: "https://www.oyorooms.com/hotels-in-{city}/?checkin={checkin}&checkout={checkout}&guests={travelers}",
    isAffiliate: true,
    keyFeature: "Budget Rooms Across India",
    icon: "🏨",
    dateFormat: "DD-MM-YYYY"
  },
  {
    name: "Hostelworld",
    category: "hotel",
    urlTemplate: "https://www.hostelworld.com/findabed.php/ChosenCity.{city}/ChosenCountry.India/from.{checkin}/to.{checkout}/no_of_people.{travelers}",
    isAffiliate: true,
    keyFeature: "Best for Hostels & Dorms",
    icon: "🏨",
    dateFormat: "YYYY-MM-DD"
  },
  {
    name: "Zostel",
    category: "hotel",
    urlTemplate: "https://www.zostel.com/zostel/{city-slug}/",
    isAffiliate: true,
    keyFeature: "Premium Backpacker Hostels",
    icon: "🏨"
  },
  {
    name: "Airbnb",
    category: "hotel",
    urlTemplate: "https://www.airbnb.co.in/s/{city}--India/homes?checkin={checkin}&checkout={checkout}&adults={travelers}",
    isAffiliate: true,
    keyFeature: "Homestays & Villas",
    icon: "🏨",
    dateFormat: "YYYY-MM-DD"
  }
];

export const ACTIVITY_PLATFORMS_CITY: BookingPlatform[] = [
  {
    name: "Headout",
    category: "activity",
    urlTemplate: "https://www.headout.com/cities/{city-slug}/",
    isAffiliate: true,
    keyFeature: "Tours & Tickets",
    icon: "🎟️"
  },
  {
    name: "Thrillophilia",
    category: "activity",
    urlTemplate: "https://www.thrillophilia.com/places/{city-slug}",
    isAffiliate: true,
    keyFeature: "Local Day Activities",
    icon: "🎟️"
  },
  {
    name: "GetYourGuide",
    category: "activity",
    urlTemplate: "https://www.getyourguide.com/s/?q={city}+India",
    isAffiliate: true,
    keyFeature: "International Quality Tours",
    icon: "🎟️"
  },
  {
    name: "BookMyShow",
    category: "activity",
    urlTemplate: "https://in.bookmyshow.com/explore/activities/{city}",
    isAffiliate: false,
    keyFeature: "Events & Local Experiences",
    icon: "🎟️"
  }
];

export const ACTIVITY_PLATFORMS_TREK: BookingPlatform[] = [
  {
    name: "Indiahikes",
    category: "trek",
    urlTemplate: "https://indiahikes.com/treks/",
    isAffiliate: false,
    keyFeature: "Largest Organized Operator",
    icon: "⛺"
  },
  {
    name: "Trek The Himalayas",
    category: "trek",
    urlTemplate: "https://www.trekhimalayas.com/",
    isAffiliate: false,
    keyFeature: "Budget Trek Packages",
    icon: "⛺"
  },
  {
    name: "Bikat Adventures",
    category: "trek",
    urlTemplate: "https://bikatadventures.com/",
    isAffiliate: false,
    keyFeature: "Safety & Learning Focused",
    icon: "⛺"
  },
  {
    name: "The Hiking Club",
    category: "trek",
    urlTemplate: "https://www.thehikingclub.com/",
    isAffiliate: false,
    keyFeature: "Budget Focus Operator",
    icon: "⛺"
  }
];

export function getStationCode(city: string): string | null {
  if (!city) return null;
  const key = city.toLowerCase().trim();
  return STATION_CODES[key] || null;
}

export function getAirportCode(city: string): string | null {
  if (!city) return null;
  const key = city.toLowerCase().trim();
  return AIRPORT_CODES[key] || null;
}

export function getNearestHub(destination: string, destInfo?: any): { railhead: string, railCode: string, airport: string, airportCode: string } {
  const railhead = destInfo?.nearestRailhead || destination;
  const airport = destInfo?.nearestAirport || destination;
  
  return {
    railhead,
    railCode: getStationCode(railhead) || railhead,
    airport,
    airportCode: getAirportCode(airport) || airport
  };
}

export function getPlatformsForCategory(
  category: "train" | "bus" | "flight" | "hotel" | "activity",
  destinationState?: string,
  isTrekDestination?: boolean
): BookingPlatform[] {
  switch (category) {
    case "train":
      return TRAIN_PLATFORMS;
    case "bus": {
      const baseBuses = [...BUS_PLATFORMS];
      if (destinationState) {
        const stateKey = Object.keys(STATE_RTC_MAP).find(
          (k) => k.toLowerCase() === destinationState.toLowerCase().trim()
        );
        if (stateKey && STATE_RTC_MAP[stateKey]) {
          baseBuses.push(STATE_RTC_MAP[stateKey]);
        }
      }
      return baseBuses;
    }
    case "flight":
      return FLIGHT_PLATFORMS;
    case "hotel":
      return HOTEL_PLATFORMS;
    case "activity":
      return isTrekDestination ? ACTIVITY_PLATFORMS_TREK : ACTIVITY_PLATFORMS_CITY;
    default:
      return [];
  }
}

function formatDate(date: Date, format: string): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const yy = String(yyyy).slice(-2);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mmm = months[date.getMonth()];
  
  switch (format) {
    case "DD-MM-YYYY":
      return `${dd}-${mm}-${yyyy}`;
    case "DD/MM/YYYY":
      return `${dd}/${mm}/${yyyy}`;
    case "DDMMYYYY":
      return `${dd}${mm}${yyyy}`;
    case "YYYY-MM-DD":
      return `${yyyy}-${mm}-${dd}`;
    case "YYYYMMDD":
      return `${yyyy}${mm}${dd}`;
    case "YYMMDD":
      return `${yy}${mm}${dd}`;
    case "DD-MMM-YYYY":
      return `${dd}-${mmm}-${yyyy}`;
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}

export function buildBookingUrl(
  platform: BookingPlatform,
  params: {
    source: string;
    destination: string;
    date: string; // ISO YYYY-MM-DD
    checkin?: string;
    checkout?: string;
    travelers: number;
    destinationInfo?: any;
  }
): string {
  const srcName = params.source;
  const dstName = params.destination;
  
  const hubInfo = getNearestHub(dstName, params.destinationInfo);
  
  const srcCode = getAirportCode(srcName) || "DEL";
  const dstCode = getAirportCode(hubInfo.airport) || "DEL";
  
  const srcStation = getStationCode(srcName) || "NDLS";
  const dstStation = getStationCode(hubInfo.railhead) || "NDLS";

  const baseDate = new Date(params.date);
  const checkinDate = params.checkin ? new Date(params.checkin) : baseDate;
  const checkoutDate = params.checkout ? new Date(params.checkout) : new Date(baseDate.getTime() + 4 * 24 * 60 * 60 * 1000);
  
  const df = platform.dateFormat || "YYYY-MM-DD";
  
  const formattedDate = formatDate(baseDate, df);
  const formattedCheckin = formatDate(checkinDate, df);
  const formattedCheckout = formatDate(checkoutDate, df);
  
  const slugify = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const urlEncode = (str: string) => encodeURIComponent(str);
  
  let url = platform.urlTemplate;
  
  url = url.replace(/{src}/g, slugify(srcName));
  url = url.replace(/{dst}/g, slugify(dstName));
  url = url.replace(/{src-code}/g, srcCode);
  url = url.replace(/{dst-code}/g, dstCode);
  url = url.replace(/{src-station}/g, srcStation);
  url = url.replace(/{dst-station}/g, dstStation);
  url = url.replace(/{date}/g, formattedDate);
  url = url.replace(/{checkin}/g, formattedCheckin);
  url = url.replace(/{checkout}/g, formattedCheckout);
  url = url.replace(/{travelers}/g, String(params.travelers));
  url = url.replace(/{city}/g, urlEncode(dstName));
  url = url.replace(/{city-slug}/g, slugify(dstName));
  
  if (platform.isAffiliate && platform.affiliateTag) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}${platform.affiliateTag}`;
  }
  
  return url;
}
