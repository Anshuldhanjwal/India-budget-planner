import { PackingItem } from "./types";
import { getConnectivity } from "./connectivity";
import { getCityTips } from "./tips";
import { getDestination } from "./destinations";

export function generatePackingList(
  destination: string,
  isTrek: boolean,
  altitude?: number,
  month?: string
): PackingItem[] {
  const list: PackingItem[] = [];

  // 1. Standard Essential Items (always included)
  list.push(
    {
      item: "Aadhaar Card / Government Photo ID",
      category: "documents",
      quantity: "Original + 2 Photocopies",
      reason: "Mandatory for hotel check-ins, permits, and security checkpoints.",
      essential: true
    },
    {
      item: "Personal Toiletries (Toothbrush, Paste, Soap)",
      category: "toiletries",
      quantity: "1 set",
      reason: "Basic personal hygiene.",
      essential: true
    },
    {
      item: "Sunscreen (SPF 50+)",
      category: "toiletries",
      quantity: "1 tube",
      reason: "Protects skin against high-UV sun exposure, especially in hills/beaches.",
      essential: true
    },
    {
      item: "Phone Charger & Power Bank (10,000mAh+)",
      category: "gear",
      quantity: "1 each",
      reason: "To keep devices running during long journeys and power outages.",
      essential: true
    },
    {
      item: "Personal Medication Kit",
      category: "medical",
      quantity: "As required",
      reason: "Band-aids, ORS, paracetamol, painkillers, and digestive pills.",
      essential: true
    }
  );

  // 2. Network Quality Check
  const conn = getConnectivity(destination);
  if (conn && (conn.jio === "none" || conn.airtel === "none" || conn.bestNetwork.toLowerCase().includes("no signal") || conn.jio === "patchy")) {
    list.push(
      {
        item: "Offline Maps (Maps.me / Google Maps)",
        category: "gear",
        quantity: "Downloaded on phone",
        reason: conn.offlineMapsAdvice || "Network signal will be extremely weak or absent. Pre-download maps for offline navigation.",
        essential: true
      },
      {
        item: "Emergency Contact List (Printed)",
        category: "documents",
        quantity: "1 copy",
        reason: "Printed list of emergency numbers, hotel addresses, and trek plans since mobile internet may fail.",
        essential: true
      }
    );
  }

  // 3. Cash Availability Check
  const tips = getCityTips(destination);
  if (tips && tips.cashAvailability) {
    const cash = tips.cashAvailability;
    if (!cash.hasATM || !cash.upiWorks || cash.recommendedCashAmount !== "₹2,000") {
      list.push({
        item: `Hard Cash (${cash.recommendedCashAmount || "₹5,000+"})`,
        category: "documents",
        quantity: cash.recommendedCashAmount || "₹5,000",
        reason: cash.tip || "No ATMs at the destination and UPI fails due to poor internet. Bring physical cash before arrival.",
        essential: true
      });
    }
  }

  // 4. Altitude Check
  const resolvedAltitude = altitude ?? getDestination(destination)?.altitude ?? 0;
  if (resolvedAltitude > 2500) {
    list.push(
      {
        item: "Thermal Inner Wear",
        category: "clothing",
        quantity: "2 pairs",
        reason: `Destination is at ${resolvedAltitude}m. Core body temperature must be protected in high altitudes.`,
        essential: true
      },
      {
        item: "Diamox (Acetazolamide) Tablets",
        category: "medical",
        quantity: "1 strip",
        reason: "Helps prevent or reduce symptoms of Acute Mountain Sickness (AMS). Consult a doctor before use.",
        essential: true
      },
      {
        item: "Portable Oxygen Canister",
        category: "medical",
        quantity: "1 can",
        reason: "First-aid breathing support in case of sudden high-altitude breathlessness.",
        essential: true
      },
      {
        item: "Medical Fitness Certificate",
        category: "documents",
        quantity: "Original",
        reason: "Required by forest/administration checkpoints for travel above 2500m.",
        essential: true
      }
    );
  }

  // 5. Trekking Specific Items
  if (isTrek) {
    list.push(
      {
        item: "Trekking Shoes (High Ankle)",
        category: "gear",
        quantity: "1 pair",
        reason: "High-ankle boots are necessary to provide grip, support, and prevent water ingress on rough trails.",
        essential: true
      },
      {
        item: "Trekking Pole (Anti-shock)",
        category: "gear",
        quantity: "1-2 poles",
        reason: "Saves up to 25% of leg energy on steep climbs and protects knees during descents.",
        essential: true
      },
      {
        item: "Rain Poncho / Waterproof Backpack Cover",
        category: "clothing",
        quantity: "1 piece",
        reason: "Mountain weather is unpredictable; keeps your clothes and gear dry from sudden rains.",
        essential: true
      },
      {
        item: "Quick-Dry Trekking Pants",
        category: "clothing",
        quantity: "2 pairs",
        reason: "Breathable material that dries rapidly from rain or sweat on the trail.",
        essential: false
      },
      {
        item: "Headlamp with Extra Batteries",
        category: "gear",
        quantity: "1 set",
        reason: "Keeps hands free during late evening walks or early morning summit attempts.",
        essential: true
      }
    );
  }

  // 6. Seasonal / Month Check
  const monthLower = month?.toLowerCase() || "";
  const isWinter = ["november", "december", "january", "february", "march"].some(m => monthLower.includes(m));
  const isMonsoon = ["june", "july", "august", "september"].some(m => monthLower.includes(m));

  if (isWinter) {
    list.push(
      {
        item: "Down Jacket / Heavy Fleece",
        category: "clothing",
        quantity: "1 piece",
        reason: "Essential outer layer to withstand sub-zero windchill temperatures.",
        essential: true
      },
      {
        item: "Woolen Cap (Balaclava) & Gloves",
        category: "clothing",
        quantity: "1 set",
        reason: "Keeps ears, head, and fingers warm to prevent heat loss.",
        essential: true
      },
      {
        item: "Thermos Flask (Insulated)",
        category: "gear",
        quantity: "1 piece (1 Liter)",
        reason: "Prevents drinking water from freezing and keeps liquids hot for hours.",
        essential: true
      }
    );
  }

  if (isMonsoon) {
    list.push(
      {
        item: "Quick-drying socks",
        category: "clothing",
        quantity: "4-5 pairs",
        reason: "Wet socks lead to blisters and cold feet; change them immediately after the day's trek.",
        essential: true
      },
      {
        item: "Ziploc Bags / Dry Bags",
        category: "gear",
        quantity: "5-6 bags",
        reason: "Keeps electronics, IDs, and clean clothes safe inside your backpack during heavy downpours.",
        essential: true
      },
      {
        item: "Odomos / Mosquito Repellent Cream",
        category: "toiletries",
        quantity: "1 tube",
        reason: "Protection against mosquitoes and bugs that proliferate during the monsoon season.",
        essential: true
      }
    );
  }

  return list;
}
