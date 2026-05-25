import { TransportResult, JourneyLeg, MultiLegRoute, TransportOption, BudgetLevel } from "./types";
import { getDestination } from "./destinations";
import { getCityDistance } from "./distances";
import { findTrains } from "./trains";

// Hub definitions for remote destinations
const HUB_MAPPINGS: Record<
  string,
  {
    hub: string;
    legs: (Omit<JourneyLeg, "from" | "to"> & { to?: string })[];
  }
> = {
  "sankri": {
    hub: "Dehradun",
    legs: [
      { mode: "shared-jeep", distanceKm: 200, durationHours: 8, costPerPerson: 500, to: "Sankri", notes: "Shared jeep from Dehradun Railway Station to Sankri (departs 6:00 AM - 8:00 AM)" }
    ]
  },
  "kedarkantha": {
    hub: "Dehradun",
    legs: [
      { mode: "shared-jeep", distanceKm: 200, durationHours: 8, costPerPerson: 500, to: "Sankri", notes: "Shared jeep Dehradun to Sankri (base camp)" },
      { mode: "trek", distanceKm: 10, durationHours: 5, costPerPerson: 0, to: "Kedarkantha", notes: "Acclimatized ascent from Sankri base camp to Kedarkantha trail" }
    ]
  },
  "har ki dun": {
    hub: "Dehradun",
    legs: [
      { mode: "shared-jeep", distanceKm: 200, durationHours: 8, costPerPerson: 500, to: "Sankri", notes: "Shared jeep Dehradun to Sankri" },
      { mode: "trek", distanceKm: 12, durationHours: 6, costPerPerson: 0, to: "Har Ki Dun", notes: "Trek from Sankri/Taluka to Har Ki Dun" }
    ]
  },
  "chopta": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 200, durationHours: 7, costPerPerson: 300, to: "Chopta", notes: "Shared local jeep from Rishikesh Natraj Chowk to Chopta" }
    ]
  },
  "chandrashila": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 200, durationHours: 7, costPerPerson: 300, to: "Chopta", notes: "Shared jeep Rishikesh to Chopta" },
      { mode: "trek", distanceKm: 5, durationHours: 3, costPerPerson: 0, to: "Chandrashila", notes: "Trek from Chopta to Tungnath temple and Chandrashila summit" }
    ]
  },
  "munsyari": {
    hub: "Kathgodam",
    legs: [
      { mode: "shared-jeep", distanceKm: 220, durationHours: 9, costPerPerson: 450, to: "Munsyari", notes: "Shared jeep from Kathgodam Station to Munsyari via Almora" }
    ]
  },
  "lohajung": {
    hub: "Kathgodam",
    legs: [
      { mode: "shared-jeep", distanceKm: 220, durationHours: 8, costPerPerson: 400, to: "Lohajung", notes: "Shared jeep Kathgodam to Lohajung base camp" }
    ]
  },
  "roopkund": {
    hub: "Kathgodam",
    legs: [
      { mode: "shared-jeep", distanceKm: 220, durationHours: 8, costPerPerson: 400, to: "Lohajung", notes: "Shared jeep Kathgodam to Lohajung" },
      { mode: "trek", distanceKm: 15, durationHours: 8, costPerPerson: 0, to: "Roopkund", notes: "Trek from Lohajung to Roopkund trail camps" }
    ]
  },
  "valley of flowers": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 290, durationHours: 10, costPerPerson: 500, to: "Govindghat", notes: "Shared jeep Rishikesh to Govindghat" },
      { mode: "trek", distanceKm: 14, durationHours: 6, costPerPerson: 0, to: "Valley of Flowers", notes: "Trek Govindghat to Ghangaria (base camp for Valley of Flowers)" }
    ]
  },
  "hemkund sahib": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 290, durationHours: 10, costPerPerson: 500, to: "Govindghat", notes: "Shared jeep Rishikesh to Govindghat" },
      { mode: "trek", distanceKm: 19, durationHours: 8, costPerPerson: 0, to: "Hemkund Sahib", notes: "Trek Govindghat to Ghangaria, then steep climb to Hemkund Sahib" }
    ]
  },
  "govindghat": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 290, durationHours: 10, costPerPerson: 500, to: "Govindghat", notes: "Shared jeep Rishikesh to Govindghat" }
    ]
  },
  "kaza": {
    hub: "Shimla",
    legs: [
      { mode: "bus", distanceKm: 410, durationHours: 12, costPerPerson: 450, to: "Reckong Peo", notes: "HRTC bus from Shimla to Reckong Peo" },
      { mode: "shared-jeep", distanceKm: 200, durationHours: 8, costPerPerson: 600, to: "Kaza", notes: "Shared local jeep/bus from Reckong Peo to Kaza" }
    ]
  },
  "spiti valley": {
    hub: "Shimla",
    legs: [
      { mode: "bus", distanceKm: 410, durationHours: 12, costPerPerson: 450, to: "Reckong Peo", notes: "HRTC bus Shimla to Reckong Peo" },
      { mode: "shared-jeep", distanceKm: 200, durationHours: 8, costPerPerson: 600, to: "Kaza", notes: "Shared jeep Reckong Peo to Kaza" }
    ]
  },
  "chitkul": {
    hub: "Shimla",
    legs: [
      { mode: "bus", distanceKm: 240, durationHours: 8, costPerPerson: 350, to: "Reckong Peo", notes: "HRTC bus Shimla to Reckong Peo" },
      { mode: "shared-jeep", distanceKm: 65, durationHours: 3, costPerPerson: 250, to: "Chitkul", notes: "Shared local jeep Reckong Peo/Sangla to Chitkul" }
    ]
  },
  "gangtok": {
    hub: "Darjeeling", // maps NJP
    legs: [
      { mode: "shared-jeep", distanceKm: 120, durationHours: 4, costPerPerson: 250, to: "Gangtok", notes: "Shared Sikkim nationalized taxi from NJP station to Gangtok" }
    ]
  },
  "yuksom": {
    hub: "Darjeeling", // maps NJP
    legs: [
      { mode: "shared-jeep", distanceKm: 150, durationHours: 6, costPerPerson: 300, to: "Yuksom", notes: "Shared taxi NJP to Yuksom base camp via Jorethang" }
    ]
  },
  "goechala": {
    hub: "Darjeeling",
    legs: [
      { mode: "shared-jeep", distanceKm: 150, durationHours: 6, costPerPerson: 300, to: "Yuksom", notes: "Shared taxi NJP to Yuksom" },
      { mode: "trek", distanceKm: 18, durationHours: 9, costPerPerson: 0, to: "Goechala", notes: "Trek Yuksom to Goechala view point camps" }
    ]
  },
  "tawang": {
    hub: "Guwahati",
    legs: [
      { mode: "bus", distanceKm: 180, durationHours: 5, costPerPerson: 200, to: "Tezpur", notes: "ASTC bus Guwahati to Tezpur" },
      { mode: "shared-jeep", distanceKm: 320, durationHours: 12, costPerPerson: 800, to: "Tawang", notes: "Tata Sumo shared jeep Tezpur to Tawang via Sela Pass" }
    ]
  },
  "ziro": {
    hub: "Guwahati",
    legs: [
      { mode: "train", distanceKm: 330, durationHours: 6, costPerPerson: 180, to: "Naharlagun", notes: "Donyi Polo Express from Guwahati to Naharlagun" },
      { mode: "shared-jeep", distanceKm: 110, durationHours: 4, costPerPerson: 300, to: "Ziro", notes: "Shared taxi Naharlagun to Ziro" }
    ]
  },
  "kheerganga": {
    hub: "Chandigarh",
    legs: [
      { mode: "bus", distanceKm: 310, durationHours: 8, costPerPerson: 600, to: "Bhuntar", notes: "HRTC Volvo bus Chandigarh to Bhuntar" },
      { mode: "bus", distanceKm: 32, durationHours: 1.5, costPerPerson: 80, to: "Barshaini", notes: "Local bus Bhuntar to Kasol/Barshaini" },
      { mode: "trek", distanceKm: 12, durationHours: 5, costPerPerson: 0, to: "Kheerganga", notes: "Trek from Barshaini to Kheerganga hot springs" }
    ]
  },
  "kasol": {
    hub: "Chandigarh",
    legs: [
      { mode: "bus", distanceKm: 310, durationHours: 8, costPerPerson: 600, to: "Bhuntar", notes: "HRTC bus Chandigarh to Bhuntar" },
      { mode: "bus", distanceKm: 30, durationHours: 1.2, costPerPerson: 60, to: "Kasol", notes: "Local bus Bhuntar to Kasol" }
    ]
  },
  "jibhi": {
    hub: "Chandigarh",
    legs: [
      { mode: "bus", distanceKm: 280, durationHours: 7, costPerPerson: 550, to: "Aut", notes: "HRTC bus Chandigarh to Aut tunnel" },
      { mode: "shared-jeep", distanceKm: 20, durationHours: 1.0, costPerPerson: 150, to: "Jibhi", notes: "Shared taxi Aut to Jibhi" }
    ]
  },
  "tirthan valley": {
    hub: "Chandigarh",
    legs: [
      { mode: "bus", distanceKm: 280, durationHours: 7, costPerPerson: 550, to: "Aut", notes: "HRTC bus Chandigarh to Aut tunnel" },
      { mode: "shared-jeep", distanceKm: 25, durationHours: 1.2, costPerPerson: 150, to: "Tirthan Valley", notes: "Shared taxi Aut to Tirthan Valley" }
    ]
  },
  "kedarnath": {
    hub: "Rishikesh",
    legs: [
      { mode: "shared-jeep", distanceKm: 210, durationHours: 8, costPerPerson: 450, to: "Sonprayag", notes: "Shared jeep Rishikesh to Sonprayag" },
      { mode: "bus", distanceKm: 5, durationHours: 0.5, costPerPerson: 50, to: "Gaurikund", notes: "Shuttle taxi Sonprayag to Gaurikund" },
      { mode: "trek", distanceKm: 16, durationHours: 7, costPerPerson: 0, to: "Kedarnath", notes: "Steep pedestrian trek Gaurikund to Kedarnath Temple" }
    ]
  },
  "mawlynnong": {
    hub: "Guwahati",
    legs: [
      { mode: "shared-jeep", distanceKm: 100, durationHours: 3, costPerPerson: 200, to: "Shillong", notes: "Shared cab Guwahati to Shillong" },
      { mode: "shared-jeep", distanceKm: 90, durationHours: 3.5, costPerPerson: 250, to: "Mawlynnong", notes: "Shared jeep Shillong to Mawlynnong" }
    ]
  },
  "dawki": {
    hub: "Guwahati",
    legs: [
      { mode: "shared-jeep", distanceKm: 100, durationHours: 3, costPerPerson: 200, to: "Shillong", notes: "Shared cab Guwahati to Shillong" },
      { mode: "shared-jeep", distanceKm: 82, durationHours: 3, costPerPerson: 250, to: "Dawki", notes: "Shared jeep Shillong to Dawki" }
    ]
  },
  "cherrapunji": {
    hub: "Guwahati",
    legs: [
      { mode: "shared-jeep", distanceKm: 100, durationHours: 3, costPerPerson: 200, to: "Shillong", notes: "Shared cab Guwahati to Shillong" },
      { mode: "shared-jeep", distanceKm: 54, durationHours: 2, costPerPerson: 150, to: "Cherrapunji", notes: "Shared taxi Shillong to Cherrapunji" }
    ]
  }
};

// Private cab flat rates mapping for group cab threshold logic
const PRIVATE_CAB_RATES: Record<string, { costFlat: number; maxPassengers: number }> = {
  "dehradun-sankri": { costFlat: 5500, maxPassengers: 6 },
  "rishikesh-chopta": { costFlat: 3500, maxPassengers: 6 },
  "kathgodam-munsyari": { costFlat: 4500, maxPassengers: 6 },
  "njp-gangtok": { costFlat: 3000, maxPassengers: 6 },
  "njp-yuksom": { costFlat: 3800, maxPassengers: 6 },
  "tezpur-tawang": { costFlat: 6500, maxPassengers: 6 },
  "guwahati-shillong": { costFlat: 2500, maxPassengers: 6 },
  "shillong-mawlynnong": { costFlat: 3000, maxPassengers: 6 },
  "shillong-dawki": { costFlat: 3000, maxPassengers: 6 },
  "shillong-cherrapunji": { costFlat: 2200, maxPassengers: 6 },
  "chandigarh-manali": { costFlat: 5000, maxPassengers: 6 },
  "aut-jibhi": { costFlat: 1500, maxPassengers: 6 },
  "aut-tirthan valley": { costFlat: 1800, maxPassengers: 6 },
  "kathgodam-lohajung": { costFlat: 4500, maxPassengers: 6 },
  "rishikesh-govindghat": { costFlat: 5000, maxPassengers: 6 },
  "rishikesh-sonprayag": { costFlat: 4000, maxPassengers: 6 },
  "reckong peo-kaza": { costFlat: 6000, maxPassengers: 6 }
};

export function getTransportResult(
  source: string,
  destination: string,
  budget: BudgetLevel,
  travelersCount: number
): TransportResult {
  const travelers = Math.max(1, travelersCount);
  
  // Find destination hub mapping
  const destLower = destination.toLowerCase().trim();
  let hubMappingKey = "";
  for (const key of Object.keys(HUB_MAPPINGS)) {
    if (destLower === key || destLower.includes(key)) {
      hubMappingKey = key;
      break;
    }
  }

  // Case A: Multi-leg routing is required
  if (hubMappingKey) {
    const mapping = HUB_MAPPINGS[hubMappingKey];
    const hubName = mapping.hub;

    // 1. Get transport from source to hub (e.g. Delhi to Dehradun)
    const sourceToHubResult = getTransportResult(source, hubName, budget, travelers);
    
    // We fetch the recommended option or fallback
    let initialLegs: JourneyLeg[] = [];
    let initialCostPerPerson = 0;
    let initialDuration = 0;
    let initialSummary = "";

    if (sourceToHubResult.type === "direct") {
      // Find recommended or cheapest direct option
      const rec = sourceToHubResult.options.find(o => o.recommended) || sourceToHubResult.options[0];
      
      let legMode: JourneyLeg["mode"] = "train";
      if (rec.mode === "Bus") legMode = "bus";
      else if (rec.mode === "Flight") legMode = "flight";

      initialLegs.push({
        from: source,
        to: hubName,
        mode: legMode,
        distanceKm: getCityDistance(source, hubName),
        durationHours: rec.durationHours,
        costPerPerson: rec.costPerPerson,
        notes: rec.trainInfo 
          ? `Direct Train: ${rec.trainInfo.trainName} (${rec.trainInfo.trainNumber})` 
          : `Direct ${rec.mode} connection`,
        trainInfo: rec.trainInfo
      });
      initialCostPerPerson = rec.costPerPerson;
      initialDuration = rec.durationHours;
      initialSummary = `${source} → ${hubName} via ${rec.mode}`;
    } else {
      // It was already multi-leg (e.g., Delhi to Shimla which might be multi-leg)
      initialLegs = [...sourceToHubResult.route.legs];
      initialCostPerPerson = sourceToHubResult.route.totalCostPerPerson;
      initialDuration = sourceToHubResult.route.totalDurationHours;
      initialSummary = sourceToHubResult.route.summary;
    }

    // 2. Append the hub-to-destination legs
    const legs: JourneyLeg[] = [...initialLegs];
    let totalCostPerPerson = initialCostPerPerson;
    let totalDurationHours = initialDuration;
    const summarySegments: string[] = [initialSummary];

    let currentFrom = hubName;
    for (const leg of mapping.legs) {
      const legTo = leg.to || destination;
      
      legs.push({
        from: currentFrom,
        to: legTo,
        mode: leg.mode,
        distanceKm: leg.distanceKm,
        durationHours: leg.durationHours,
        costPerPerson: leg.costPerPerson,
        notes: leg.notes,
        bookingUrl: leg.bookingUrl
      });
      
      totalCostPerPerson += leg.costPerPerson;
      totalDurationHours += leg.durationHours;
      summarySegments.push(`${currentFrom} → ${legTo} (${leg.mode})`);
      
      currentFrom = legTo;
    }

    // Assemble the multi-leg route object
    const route: MultiLegRoute = {
      legs,
      totalCostPerPerson,
      totalCostGroup: totalCostPerPerson * travelers,
      totalDurationHours,
      summary: summarySegments.join(" + ")
    };

    // 3. Apply Group Cab Threshold Logic
    // Check if any of our legs are shared-jeep and have a private cab alternative
    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      if (leg.mode === "shared-jeep") {
        const rateKey = `${leg.from.toLowerCase()}-${leg.to.toLowerCase()}`;
        // Find if we have a private flat rate
        let flatRateInfo = PRIVATE_CAB_RATES[rateKey];
        if (!flatRateInfo) {
          // Try reverse or fuzzy matching
          for (const key of Object.keys(PRIVATE_CAB_RATES)) {
            if (rateKey.includes(key) || key.includes(rateKey)) {
              flatRateInfo = PRIVATE_CAB_RATES[key];
              break;
            }
          }
        }

        if (flatRateInfo && travelers >= 5) {
          const sharedCostTotal = leg.costPerPerson * travelers;
          const privateCostTotal = flatRateInfo.costFlat;
          const savings = sharedCostTotal - privateCostTotal;
          const recommended = privateCostTotal < sharedCostTotal;

          route.privateCabOption = {
            legIndex: i,
            costFlat: privateCostTotal,
            maxPassengers: flatRateInfo.maxPassengers,
            savings,
            recommended
          };

          if (recommended) {
            // Apply private cab savings to the group cost
            route.totalCostGroup = (totalCostPerPerson * travelers) - savings;
            route.totalCostPerPerson = route.totalCostGroup / travelers;
            route.tip = `💡 Group Cab Tip: For ${travelers} travelers, booking a private cab flat rate from ${leg.from} to ${leg.to} (₹${privateCostTotal}) is cheaper than buying ${travelers} shared jeep tickets (₹${sharedCostTotal}). Recommended: Book private cab!`;
          }
        }
      }
    }

    return { type: "multi-leg", route };
  }

  // Case B: Direct connection (train, bus, flight options)
  const distance = getCityDistance(source, destination);
  const options: TransportOption[] = [];

  // 1. Train Option (Look up real trains first)
  const realTrains = findTrains(source, destination);
  if (realTrains.length > 0) {
    // Select class based on budget level
    let trainClass = "Sleeper Class (SL)";
    let perPersonCost = realTrains[0].sleeper;
    
    if (budget === "budget") {
      trainClass = "3 AC (3A)";
      perPersonCost = realTrains[0].ac3;
    } else if (budget === "moderate") {
      trainClass = "2 AC (2A)";
      perPersonCost = realTrains[0].ac2;
    }

    options.push({
      mode: "Train",
      className: trainClass,
      costPerPerson: perPersonCost,
      totalCost: perPersonCost * travelers,
      durationHours: realTrains[0].durationHours,
      recommended: budget !== "moderate", // prefer train for budget/ultra-budget
      trainInfo: {
        trainNumber: realTrains[0].trainNumber,
        trainName: realTrains[0].trainName,
        departureTime: realTrains[0].departureTime,
        arrivalTime: realTrains[0].arrivalTime,
        daysOfOperation: realTrains[0].daysOfOperation,
        bookingUrl: realTrains[0].bookingUrl
      }
    });
  } else {
    // Estimate train based on distance if not found but railhead available
    const dest = getDestination(destination);
    if (dest?.nearestRailhead && distance > 100) {
      let estCost = Math.round(distance * 0.45); // Sleeper fallback rate
      let className = "Sleeper Class (SL)";
      if (budget === "budget") {
        estCost = Math.round(distance * 1.2);
        className = "3 AC (3A)";
      } else if (budget === "moderate") {
        estCost = Math.round(distance * 1.8);
        className = "2 AC (2A)";
      }
      
      // Let's add an estimated train option
      options.push({
        mode: "Train",
        className: className,
        costPerPerson: estCost,
        totalCost: estCost * travelers,
        durationHours: Math.round(distance / 50), // 50 km/h average
        recommended: budget !== "moderate"
      });
    }
  }

  // 2. Bus Option (Estimated or real)
  const busCost = Math.round(distance * (budget === "ultra-budget" ? 1.2 : 2.0)); // Ordinary vs Volvo
  const busClass = budget === "ultra-budget" ? "State Transport Ordinary" : "AC Volvo Sleeper";
  options.push({
    mode: "Bus",
    className: busClass,
    costPerPerson: busCost,
    totalCost: busCost * travelers,
    durationHours: Math.round(distance / 45), // 45 km/h average for buses
    recommended: realTrains.length === 0 && budget !== "moderate"
  });

  // 3. Flight Option (if distance is large and budget is moderate/budget)
  if (distance > 400 && budget !== "ultra-budget") {
    // Flight pricing estimates
    const baseFlightCost = 3500 + Math.round(distance * 0.5); // base price + per km
    options.push({
      mode: "Flight",
      className: "Economy Class",
      costPerPerson: baseFlightCost,
      totalCost: baseFlightCost * travelers,
      durationHours: Math.round((distance / 600) + 2.5), // airport check-in included
      recommended: budget === "moderate" // recommend flights for moderate budgets on long routes
    });
  }

  // Fallback: If no option is recommended yet, make the cheapest one recommended
  if (!options.some(o => o.recommended)) {
    let cheapestIndex = 0;
    for (let i = 1; i < options.length; i++) {
      if (options[i].costPerPerson < options[cheapestIndex].costPerPerson) {
        cheapestIndex = i;
      }
    }
    options[cheapestIndex].recommended = true;
  }

  return { type: "direct", options };
}
