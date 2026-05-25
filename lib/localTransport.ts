import { LocalTransportInfo } from "./types";
import { getDestination } from "./destinations";

const STATIC_LOCAL_TRANSPORT: Record<string, LocalTransportInfo> = {
  "delhi": {
    city: "Delhi",
    options: [
      { mode: "Delhi Metro", costRange: "₹10 - ₹60 per ride", tips: "Fastest and cheapest way to traverse the city. Buy a tourist card for unlimited rides." },
      { mode: "Auto Rickshaw", costRange: "₹50 - ₹150", tips: "Negotiate beforehand or request to go by meter. Ridesharing apps like Uber/Ola Auto are safer and transparent." },
      { mode: "E-Rickshaw", costRange: "₹10 - ₹30 per seat", tips: "Great for last-mile connectivity from metro stations over short distances." },
      { mode: "App Cabs (Uber/Ola)", costRange: "₹150 - ₹500", tips: "Convenient for late nights or luggage, but prone to major peak-hour traffic jams." }
    ],
    avgCostPerDay: 250
  },
  "mumbai": {
    city: "Mumbai",
    options: [
      { mode: "Local Train", costRange: "₹5 - ₹20 per ticket", tips: "The absolute lifeline of Mumbai. Avoid traveling during peak directions (8-11 AM southwards, 5-8 PM northwards) to avoid extreme crowds." },
      { mode: "Auto Rickshaw", costRange: "₹23 onwards (Metered)", tips: "Only runs in the suburbs (north of Bandra/Sion). Strictly metered, very honest drivers." },
      { mode: "Kaali-Peeli Taxi", costRange: "₹28 onwards (Metered)", tips: "Iconic black and yellow cabs running in South Mumbai. Strictly metered and reliable." },
      { mode: "BEST Bus", costRange: "₹5 - ₹25 per ticket", tips: "Extremely cheap. Double-decker buses are great for tourist sight-seeing." }
    ],
    avgCostPerDay: 200
  },
  "bangalore": {
    city: "Bangalore",
    options: [
      { mode: "Namma Metro", costRange: "₹10 - ₹60", tips: "Highly recommended to bypass the city's notorious road traffic." },
      { mode: "Auto Rickshaw", costRange: "₹50 - ₹200", tips: "Drivers rarely run on meter and demand 1.5x or double. Use Ola, Uber, or Rapido apps to book autos." },
      { mode: "BMTC Bus", costRange: "₹5 - ₹40", tips: "Reliable and cheap network. Blue/green AC Volvo buses are comfortable but costlier." },
      { mode: "App Cabs & Bike Taxis", costRange: "₹80 - ₹500", tips: "Bike taxis (Rapido) are the fastest way for solo travelers to navigate traffic." }
    ],
    avgCostPerDay: 300
  },
  "goa": {
    city: "Goa",
    options: [
      { mode: "Rented Scooter / Bike", costRange: "₹350 - ₹500 per day", tips: "The most popular way to explore Goa. Fuel is extra. Helmet is mandatory; keep your driver's license handy." },
      { mode: "Local Taxi (GoaMiles)", costRange: "₹400 - ₹1500", tips: "Standard app cabs like Ola/Uber do not operate in Goa. Use the state government-backed GoaMiles app to avoid getting overcharged by local taxi unions." },
      { mode: "Local Bus", costRange: "₹15 - ₹50 per trip", tips: "Extremely cheap but has irregular timings and doesn't reach interior beaches." }
    ],
    avgCostPerDay: 450
  },
  "sankri": {
    city: "Sankri",
    options: [
      { mode: "Walking", costRange: "Free", tips: "Sankri is a tiny mountain village. Walking is the only and best way to get around." },
      { mode: "Shared Jeep", costRange: "₹50 - ₹100", tips: "Only run in the mornings to nearby villages like Mori, Purola, or Jakhol." }
    ],
    avgCostPerDay: 20
  },
  "chitkul": {
    city: "Chitkul",
    options: [
      { mode: "Walking", costRange: "Free", tips: "Chitkul is the last Indian village. No local transport is available or required within the hamlet. Walk along the river and trails." },
      { mode: "Local HRTC Bus", costRange: "₹40 - ₹60", tips: "Only two buses run daily to Sangla and Reckong Peo. Plan your return schedule accordingly." }
    ],
    avgCostPerDay: 10
  }
};

export function getLocalTransport(destination: string): LocalTransportInfo {
  const norm = destination.toLowerCase().trim();

  // Try static match
  if (STATIC_LOCAL_TRANSPORT[norm]) {
    return STATIC_LOCAL_TRANSPORT[norm];
  }

  // Try partial static match
  for (const key of Object.keys(STATIC_LOCAL_TRANSPORT)) {
    if (norm.includes(key) || key.includes(norm)) {
      return STATIC_LOCAL_TRANSPORT[key];
    }
  }

  // Fallback generator based on destination type
  const destInfo = getDestination(destination);
  const type = destInfo?.type || [];
  const capitalizedDest = destination.charAt(0).toUpperCase() + destination.slice(1);

  if (type.includes("metro")) {
    return {
      city: capitalizedDest,
      options: [
        { mode: "Metro / Transit System", costRange: "₹10 - ₹60 per ride", tips: "Fastest option to avoid road traffic." },
        { mode: "Auto Rickshaw", costRange: "₹50 - ₹150", tips: "Always use ride-hailing apps for transparent rates." },
        { mode: "App Cabs", costRange: "₹150 - ₹400", tips: "Best for comfort, but subject to peak hour surges." },
        { mode: "Local City Bus", costRange: "₹5 - ₹30", tips: "Highly affordable, covers almost all corners." }
      ],
      avgCostPerDay: 250
    };
  } else if (type.includes("heritage-city")) {
    return {
      city: capitalizedDest,
      options: [
        { mode: "Auto Rickshaw", costRange: "₹50 - ₹150", tips: "Ensure you fix the price before starting the ride." },
        { mode: "Cycle Rickshaw / E-Rickshaw", costRange: "₹20 - ₹50", tips: "Great for slow, eco-friendly rides through old city narrow lanes." },
        { mode: "Walking", costRange: "Free", tips: "Heritage ruins and monuments are often clustered and best explored on foot." }
      ],
      avgCostPerDay: 150
    };
  } else if (type.includes("hill-station")) {
    return {
      city: capitalizedDest,
      options: [
        { mode: "Local Private Taxi", costRange: "₹800 - ₹2000 per day", tips: "Book via the local taxi union booth for fixed tourist rates." },
        { mode: "Rent-a-Scooter", costRange: "₹400 - ₹600 per day", tips: "Very popular in places like Manali/Dharamshala. Check brake condition on slopes." },
        { mode: "Shared Jeep / Sumo", costRange: "₹80 - ₹150 per seat", tips: "Connects the main hill station to nearby villages and viewpoints." },
        { mode: "Walking", costRange: "Free", tips: "Perfect for Mall Road and ridge paths where vehicles are banned." }
      ],
      avgCostPerDay: 350
    };
  } else if (type.includes("beach")) {
    return {
      city: capitalizedDest,
      options: [
        { mode: "Rent-a-Scooter", costRange: "₹350 - ₹500 per day", tips: "The absolute best way to hop between beaches. Wear a helmet to avoid police fines." },
        { mode: "Auto Rickshaw", costRange: "₹80 - ₹250", tips: "Negotiate hard as drivers rarely use meters near beach towns." },
        { mode: "Walking", costRange: "Free", tips: "Best for relaxing strolls along the shores." }
      ],
      avgCostPerDay: 300
    };
  } else if (type.includes("trek-base") || type.includes("trek-destination") || type.includes("offbeat-village")) {
    return {
      city: capitalizedDest,
      options: [
        { mode: "Walking", costRange: "Free", tips: "The village is small enough to navigate entirely on foot. Enjoy the peaceful trails." },
        { mode: "Shared Jeep (inter-village)", costRange: "₹50 - ₹120 per ride", tips: "Runs on fixed routes connecting to the nearest big town, usually leaves only when full." }
      ],
      avgCostPerDay: 40
    };
  } else {
    // Default fallback
    return {
      city: capitalizedDest,
      options: [
        { mode: "Auto Rickshaw", costRange: "₹50 - ₹120", tips: "Negotiate beforehand." },
        { mode: "Walking", costRange: "Free", tips: "Explore local markets on foot." }
      ],
      avgCostPerDay: 100
    };
  }
}
