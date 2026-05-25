import { MonthName, MonthWeather, RoadClosure } from "./types";

export const ROAD_CLOSURES: RoadClosure[] = [
  {
    routeName: "Rohtang Pass (Manali → Spiti)",
    closedMonths: ["November", "December", "January", "February", "March", "April", "May"],
    reason: "Heavy snowfall and road blockages",
    alternateRoute: "Shimla → Reckong Peo → Kaza (open year-round)"
  },
  {
    routeName: "Spiti → Kinnaur (Kaza → Reckong Peo via Kunzum)",
    closedMonths: ["November", "December", "January", "February", "March", "April"],
    reason: "Snow, black ice, avalanche hazards",
    alternateRoute: "Enter and exit only via Shimla (Shimla → Kaza)"
  },
  {
    routeName: "Chopta Road (Ukhimath → Chopta)",
    closedMonths: ["December", "January", "February"],
    reason: "Deep snow and lack of municipal clearance",
    alternateRoute: "Destination is completely inaccessible during these months"
  },
  {
    routeName: "Tawang Road (Sela Pass)",
    closedMonths: ["January", "February"],
    reason: "Heavy snowfall and BRO clearance delays",
    alternateRoute: "Wait for border road clearance (can take several days)"
  },
  {
    routeName: "Kedarnath Trek Route",
    closedMonths: ["November", "December", "January", "February", "March", "April"],
    reason: "Kedarnath Temple is officially closed for winter",
    alternateRoute: "Kedarnath Yatra is closed. No pilgrimage/trek permitted."
  },
  {
    routeName: "Hemkund Sahib Trek",
    closedMonths: ["October", "November", "December", "January", "February", "March", "April", "May"],
    reason: "Extreme snow and official temple closure",
    alternateRoute: "Trek opens in June after official Sikh Yatra announcement."
  },
  {
    routeName: "Valley of Flowers National Park",
    closedMonths: ["October", "November", "December", "January", "February", "March", "April", "May", "June"],
    reason: "National Park officially closed to tourists for conservation and winter",
    alternateRoute: "Park opens on July 1st. Choose July, August, or September."
  },
  {
    routeName: "Roopkund Trek Trail",
    closedMonths: ["December", "January", "February", "March", "April"],
    reason: "Trail is completely snow-bound and high risk",
    alternateRoute: "Trek opens in May. Best seasons are May-June or Sept-Oct."
  },
  {
    routeName: "Chandratal Lake Road",
    closedMonths: ["November", "December", "January", "February", "March", "April", "May"],
    reason: "Kunzum Pass closed, road under heavy snow",
    alternateRoute: "Chandratal is inaccessible. Plan for summer months (June to September)."
  }
];

// Helper to check road closures
export function getRoadClosure(destination: string, month: MonthName): RoadClosure | null {
  const destLower = destination.toLowerCase();
  
  // Find which road closure applies to the destination
  let matchingClosure: RoadClosure | undefined;

  if (destLower.includes("spiti") || destLower.includes("kaza")) {
    // Spiti has two possible closure routes, check them
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Spiti") && c.closedMonths.includes(month));
  } else if (destLower.includes("chopta") || destLower.includes("tungnath") || destLower.includes("chandrashila")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Chopta") && c.closedMonths.includes(month));
  } else if (destLower.includes("tawang")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Tawang") && c.closedMonths.includes(month));
  } else if (destLower.includes("kedarnath")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Kedarnath") && c.closedMonths.includes(month));
  } else if (destLower.includes("hemkund")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Hemkund") && c.closedMonths.includes(month));
  } else if (destLower.includes("valley of flowers")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Valley of Flowers") && c.closedMonths.includes(month));
  } else if (destLower.includes("roopkund")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Roopkund") && c.closedMonths.includes(month));
  } else if (destLower.includes("chandratal")) {
    matchingClosure = ROAD_CLOSURES.find(c => c.routeName.includes("Chandratal") && c.closedMonths.includes(month));
  }

  return matchingClosure || null;
}

// Generate weather profile for destinations
export function getDestinationWeather(destination: string, month: MonthName): MonthWeather {
  const destLower = destination.toLowerCase();
  
  // Default values
  let avgTempMin = 20;
  let avgTempMax = 30;
  let rainfallMm = 50;
  let crowdLevel: "low" | "moderate" | "high" | "peak" = "moderate";
  let priceMultiplier = 1.0;
  let clothingAdvice = "Light cotton clothes and comfortable walking shoes.";
  let status: "best" | "good" | "risky" | "closed" = "good";

  // Check if there is an active road closure
  const closure = getRoadClosure(destination, month);
  if (closure) {
    status = "closed";
  }

  // Adjustments based on region/climate type
  if (
    destLower.includes("sankri") ||
    destLower.includes("lohajung") ||
    destLower.includes("chopta") ||
    destLower.includes("munsyari") ||
    destLower.includes("kedarkantha") ||
    destLower.includes("roopkund") ||
    destLower.includes("valley of flowers") ||
    destLower.includes("kedarnath") ||
    destLower.includes("badrinath") ||
    destLower.includes("manali") ||
    destLower.includes("shimla") ||
    destLower.includes("kaza") ||
    destLower.includes("spiti") ||
    destLower.includes("chitkul") ||
    destLower.includes("jibhi") ||
    destLower.includes("tirthan") ||
    destLower.includes("tawang") ||
    destLower.includes("gangtok") ||
    destLower.includes("goechala") ||
    destLower.includes("yuksom")
  ) {
    // Himalayan Highlands/Alpine
    const coldMonths = ["November", "December", "January", "February", "March"];
    const monsoonMonths = ["July", "August", "September"];
    const summerMonths = ["April", "May", "June", "October"];

    if (coldMonths.includes(month)) {
      avgTempMin = -10;
      avgTempMax = 8;
      rainfallMm = 10;
      clothingAdvice = "Heavy down jackets, thermal layers, woolen caps, gloves, and sturdy boots.";
      
      if (status !== "closed") {
        if (["December", "January", "February"].includes(month)) {
          status = "risky";
          crowdLevel = "low";
          priceMultiplier = 0.8;
        } else {
          status = "good";
          crowdLevel = "moderate";
          priceMultiplier = 0.9;
        }
      }
    } else if (monsoonMonths.includes(month)) {
      avgTempMin = 10;
      avgTempMax = 20;
      rainfallMm = 250;
      clothingAdvice = "Rainproof jacket, waterproof boots, umbrella, and quick-dry clothing.";
      
      if (status !== "closed") {
        status = "risky"; // landslides
        crowdLevel = "low";
        priceMultiplier = 0.75;
      }
      
      // Exception: Valley of Flowers is "best" during monsoon (July-Aug) due to blooms
      if (destLower.includes("valley of flowers")) {
        status = "best";
        crowdLevel = "peak";
        priceMultiplier = 1.3;
      }
    } else if (summerMonths.includes(month)) {
      avgTempMin = 8;
      avgTempMax = 22;
      rainfallMm = 30;
      clothingAdvice = "Light woolens for evening, comfortable cotton shirts for day trek.";
      
      if (status !== "closed") {
        status = "best";
        crowdLevel = ["May", "June"].includes(month) ? "peak" : "high";
        priceMultiplier = ["May", "June"].includes(month) ? 1.4 : 1.2;
      }
    }
  } else if (destLower.includes("goa") || destLower.includes("gokarna") || destLower.includes("varkala") || destLower.includes("kovalam") || destLower.includes("kochi")) {
    // Coastal/Beaches
    const monsoonMonths = ["June", "July", "August", "September"];
    const peakMonths = ["December", "January"];
    
    if (monsoonMonths.includes(month)) {
      avgTempMin = 24;
      avgTempMax = 29;
      rainfallMm = 450;
      clothingAdvice = "Quick-dry shorts, umbrella, sandals. Water sports are closed.";
      status = "risky";
      crowdLevel = "low";
      priceMultiplier = 0.6;
    } else if (peakMonths.includes(month)) {
      avgTempMin = 20;
      avgTempMax = 32;
      rainfallMm = 5;
      clothingAdvice = "Light summer clothing, swimwear, sunglasses, sunscreen.";
      status = "best";
      crowdLevel = "peak";
      priceMultiplier = 1.5;
    } else {
      avgTempMin = 22;
      avgTempMax = 33;
      rainfallMm = 20;
      clothingAdvice = "Light summer wear, comfortable sandals.";
      status = "good";
      crowdLevel = "moderate";
      priceMultiplier = 1.0;
    }
  } else if (destLower.includes("jaipur") || destLower.includes("udaipur") || destLower.includes("jaisalmer") || destLower.includes("ranthambore")) {
    // Desert/Dry Rajasthan
    const summerMonths = ["April", "May", "June", "July", "August"];
    const winterMonths = ["November", "December", "January", "February"];

    if (summerMonths.includes(month)) {
      avgTempMin = 28;
      avgTempMax = 44;
      rainfallMm = 40;
      clothingAdvice = "Breathable loose cottons, wide hat, sunglasses, hydration packs.";
      status = "risky"; // extreme heat
      crowdLevel = "low";
      priceMultiplier = 0.7;
    } else if (winterMonths.includes(month)) {
      avgTempMin = 8;
      avgTempMax = 24;
      rainfallMm = 5;
      clothingAdvice = "Sweaters or light jackets for morning/night, cottons for afternoon.";
      status = "best";
      crowdLevel = "high";
      priceMultiplier = 1.3;
    } else {
      avgTempMin = 20;
      avgTempMax = 32;
      rainfallMm = 15;
      clothingAdvice = "Comfortable light clothing.";
      status = "good";
      crowdLevel = "moderate";
      priceMultiplier = 1.0;
    }
  }

  // Double check if road closure overrides status
  if (status === "closed" && closure) {
    clothingAdvice = `Closed season. Do not travel. ${closure.reason}`;
  }

  return {
    month,
    avgTempMin,
    avgTempMax,
    rainfallMm,
    crowdLevel,
    priceMultiplier,
    clothingAdvice,
    status
  };
}
