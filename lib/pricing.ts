import { BudgetBreakdown, BudgetLevel, MonthName } from "./types";
import { getDestinationWeather } from "./weather";
import { getTransportResult } from "./transport";
import { getTrek } from "./treks";
import { getPermits } from "./permits";
import { estimateGearRentalCost } from "./gear";

export function calculateBreakdown(
  source: string,
  destination: string,
  days: number,
  travelers: number,
  budget: BudgetLevel,
  month: MonthName
): BudgetBreakdown {
  const weather = getDestinationWeather(destination, month);
  
  // 1. Transport calculation (outbound & return parity)
  const transportResult = getTransportResult(source, destination, budget, travelers);
  
  let transportCost = 0;
  let returnTransportCost = 0;
  let returnJourneySummary = "";

  if (transportResult.type === "direct") {
    const recommended = transportResult.options.find(o => o.recommended) || transportResult.options[0];
    transportCost = recommended.costPerPerson * travelers;
    returnTransportCost = transportCost; // return parity
    returnJourneySummary = `${destination} → ${source} via ${recommended.mode} (${recommended.className})`;
  } else {
    // Multi-leg
    transportCost = transportResult.route.totalCostGroup;
    returnTransportCost = transportCost; // return parity
    
    // Build return summary by reversing legs
    const returnSegments: string[] = [];
    for (let i = transportResult.route.legs.length - 1; i >= 0; i--) {
      const leg = transportResult.route.legs[i];
      if (leg.mode !== "trek") {
        returnSegments.push(`${leg.to} → ${leg.from} (${leg.mode})`);
      }
    }
    returnJourneySummary = returnSegments.join(" + ");
  }

  // 2. Trek specifics vs Standard City stays
  const trekInfo = getTrek(destination);
  const isTrek = !!trekInfo;
  
  let permitsCost = 0;
  let gearRentalCost = 0;
  let guideCost = 0;
  let porterCost = 0;
  let accommodationCost = 0;
  let localTransportCost = 0;
  let activitiesCost = 0;
  let foodCost = 0;

  // Seasonal Multiplier
  const seasonalMultiplier = weather.priceMultiplier;

  // Accommodation Rate per room (assume 1 room per 2 travelers)
  const roomsCount = Math.ceil(travelers / 2);
  let hotelRatePerNight = 800; // Ultra-budget default
  
  if (budget === "budget") hotelRatePerNight = 1500;
  else if (budget === "moderate") hotelRatePerNight = 3000;

  // Apply seasonal multiplier to hotel rates
  hotelRatePerNight = Math.round(hotelRatePerNight * seasonalMultiplier);

  // Food rates per person per day
  let foodRatePerDay = 250; // Ultra-budget
  if (budget === "budget") foodRatePerDay = 450;
  else if (budget === "moderate") foodRatePerDay = 850;

  if (isTrek && trekInfo) {
    // A. Trek calculations
    const trekDays = trekInfo.durationDays;
    const baseCampDays = Math.max(1, days - trekDays);

    // Stay at base camp (hotels) + Stay on trek (tents/campsites)
    const baseCampStayCost = baseCampDays * hotelRatePerNight * roomsCount;
    
    // Campsite cost (tents are cheaper, or dharamshalas)
    let campCostPerNight = 300; // Ultra-budget / DIY tent space
    if (budget === "budget") campCostPerNight = 600; // standard dome tent
    else if (budget === "moderate") campCostPerNight = 1200; // luxury glamping/agency tent

    const trekStayCost = (trekDays - 1) * campCostPerNight * travelers;
    accommodationCost = baseCampStayCost + trekStayCost;

    // Food cost during trek is slightly higher due to high altitude carriage
    const trekFoodCost = trekDays * (foodRatePerDay + 150) * travelers;
    const baseCampFoodCost = baseCampDays * foodRatePerDay * travelers;
    foodCost = trekFoodCost + baseCampFoodCost;

    // Permits
    const permitsList = getPermits(destination);
    permitsCost = permitsList.reduce((sum, p) => sum + (p.required ? p.cost : 0), 0) * travelers;

    // Gear Rental
    gearRentalCost = estimateGearRentalCost(trekInfo.name, trekDays) * travelers;

    // Guide and Porter
    if (trekInfo.guideRequired) {
      guideCost = trekInfo.guideApproxCostPerDay * trekDays;
    }
    // Porter is optional for ultra-budget, but recommended for budget/moderate
    if (budget !== "ultra-budget") {
      porterCost = trekInfo.porterApproxCostPerDay * trekDays * Math.ceil(travelers / 2); // 1 porter per 2 people
    }

    // Local Transport at base camp
    localTransportCost = baseCampDays * 150 * travelers; 
  } else {
    // B. Standard City trip calculations
    const nights = Math.max(1, days - 1);
    accommodationCost = nights * hotelRatePerNight * roomsCount;
    foodCost = days * foodRatePerDay * travelers;

    // Local Transport estimation
    let localTransportRate = 200; // Ultra-budget (auto/bus/walk)
    if (budget === "budget") localTransportRate = 500; // mixed cabs + autos
    else if (budget === "moderate") localTransportRate = 1200; // full-day private taxi

    localTransportCost = days * localTransportRate * travelers;

    // Activities (attractions entry fees)
    let estActivities = 100;
    if (budget === "budget") estActivities = 300;
    else if (budget === "moderate") estActivities = 800;
    
    activitiesCost = estActivities * travelers;
  }

  // Emergency buffer (10% of non-transport costs or flat ₹500 per person)
  const baseExpenses = accommodationCost + foodCost + localTransportCost + activitiesCost + permitsCost + gearRentalCost + guideCost + porterCost;
  const emergencyBuffer = Math.round(Math.max(500 * travelers, baseExpenses * 0.1));

  // Grand Total
  const grandTotal = transportCost + returnTransportCost + baseExpenses + emergencyBuffer;
  const costPerPerson = Math.round(grandTotal / travelers);

  const breakdown: BudgetBreakdown = {
    transportCost,
    returnTransportCost,
    accommodationCost,
    foodCost,
    activitiesCost,
    localTransportCost,
    emergencyBuffer,
    permitsCost,
    gearRentalCost,
    guideCost,
    porterCost,
    grandTotal,
    costPerPerson,
    seasonalMultiplier,
    daysCount: days,
    returnJourneySummary
  };

  // If trek, calculate DIY vs Package comparison
  if (isTrek && trekInfo) {
    // DIY total: transport + return transport + base hotel + campsite stay + food + permits + gear + guide + porter + buffer
    breakdown.diyTotal = grandTotal;

    // Package total: Transport + Return Transport + Agency package price + gear rental + personal porter + buffer
    // Agencies package includes local accommodation, food, guide, permits, campsites
    const bestAgency = trekInfo.agencies[0] || { packageCostPerPerson: 7000 };
    const agencyPackageCost = bestAgency.packageCostPerPerson * travelers;
    
    breakdown.packageTotal = transportCost + returnTransportCost + agencyPackageCost + gearRentalCost + porterCost + emergencyBuffer;
  }

  return breakdown;
}

// Recalculates the budget dynamically on the client side when inputs change
export function recalculateOnClient(
  baseBreakdown: BudgetBreakdown,
  newTravelers: number,
  isTrek: boolean
): BudgetBreakdown {
  const travelers = Math.max(1, newTravelers);
  const oldTravelers = baseBreakdown.grandTotal / baseBreakdown.costPerPerson > 0 
    ? Math.round(baseBreakdown.grandTotal / baseBreakdown.costPerPerson) 
    : 1;

  // Scaled transport cost (transportCost scales with travelers directly except for private cab)
  // Let's assume outbound transport cost scales per-person
  const transportPerPerson = baseBreakdown.transportCost / oldTravelers;
  const transportCost = Math.round(transportPerPerson * travelers);
  const returnTransportCost = transportCost;

  // Accommodation (scales with rooms, assume 1 room per 2 travelers)
  const oldRooms = Math.ceil(oldTravelers / 2);
  const newRooms = Math.ceil(travelers / 2);
  const accommodationCost = Math.round((baseBreakdown.accommodationCost / oldRooms) * newRooms);

  // Per-person scaling costs
  const foodCost = Math.round((baseBreakdown.foodCost / oldTravelers) * travelers);
  const activitiesCost = Math.round((baseBreakdown.activitiesCost / oldTravelers) * travelers);
  const localTransportCost = Math.round((baseBreakdown.localTransportCost / oldTravelers) * travelers);
  const permitsCost = Math.round((baseBreakdown.permitsCost / oldTravelers) * travelers);
  const gearRentalCost = Math.round((baseBreakdown.gearRentalCost / oldTravelers) * travelers);

  // Guide cost (flat cost, doesn't scale with travelers)
  const guideCost = baseBreakdown.guideCost;

  // Porter cost (scales with room/baggage, 1 porter per 2 people)
  const porterCost = Math.round((baseBreakdown.porterCost / oldRooms) * newRooms);

  // Emergency buffer (recalculated as 10% of new expenses)
  const baseExpenses = accommodationCost + foodCost + localTransportCost + activitiesCost + permitsCost + gearRentalCost + guideCost + porterCost;
  const emergencyBuffer = Math.round(Math.max(500 * travelers, baseExpenses * 0.1));

  const grandTotal = transportCost + returnTransportCost + baseExpenses + emergencyBuffer;
  const costPerPerson = Math.round(grandTotal / travelers);

  const newBreakdown: BudgetBreakdown = {
    ...baseBreakdown,
    transportCost,
    returnTransportCost,
    accommodationCost,
    foodCost,
    activitiesCost,
    localTransportCost,
    emergencyBuffer,
    permitsCost,
    gearRentalCost,
    guideCost,
    porterCost,
    grandTotal,
    costPerPerson
  };

  if (isTrek && baseBreakdown.packageTotal) {
    const oldAgencyPackageTotal = baseBreakdown.packageTotal - (baseBreakdown.transportCost * 2) - baseBreakdown.gearRentalCost - baseBreakdown.porterCost - baseBreakdown.emergencyBuffer;
    const agencyPackagePerPerson = oldAgencyPackageTotal / oldTravelers;
    const newAgencyPackageTotal = agencyPackagePerPerson * travelers;

    newBreakdown.diyTotal = grandTotal;
    newBreakdown.packageTotal = transportCost + returnTransportCost + newAgencyPackageTotal + gearRentalCost + porterCost + emergencyBuffer;
  }

  return newBreakdown;
}
