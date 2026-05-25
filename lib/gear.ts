import { GearShop, GearRentalItem } from "./types";

const STANDARD_ITEMS: GearRentalItem[] = [
  { item: "Trekking Shoes (High Ankle)", rentPerDay: 100, depositRequired: "Aadhaar Card or ₹500" },
  { item: "Heavy Feather Jacket (-10°C)", rentPerDay: 100, depositRequired: "Aadhaar Card or ₹500" },
  { item: "Trekking Pole (Anti-shock)", rentPerDay: 50, depositRequired: "₹200" },
  { item: "Headlamp (LED with batteries)", rentPerDay: 40, depositRequired: "₹150" },
  { item: "Rain Poncho / Waterproof Layer", rentPerDay: 50, depositRequired: "₹200" }
];

export const GEAR_SHOPS: GearShop[] = [
  {
    name: "Sankri Trekking Gear Rentals",
    town: "Sankri",
    area: "Main Market near Bus Stand",
    items: STANDARD_ITEMS
  },
  {
    name: "Himalayan Gear Hub",
    town: "Sankri",
    area: "Kedarkantha Trail Start Point",
    items: STANDARD_ITEMS
  },
  {
    name: "Lohajung Adventure Gear Shop",
    town: "Lohajung",
    area: "Roopkund Road",
    items: STANDARD_ITEMS
  },
  {
    name: "Valley Gear Rental Govindghat",
    town: "Govindghat",
    area: "Badrinath Highway Market",
    items: STANDARD_ITEMS
  },
  {
    name: "Yuksom Trekking Outfitters",
    town: "Yuksom",
    area: "Yuksom Bazaar, near Forest Office",
    items: STANDARD_ITEMS
  },
  {
    name: "Parvati Valley Trekking Store",
    town: "Kasol",
    area: "Near Manikaran Crossing",
    items: STANDARD_ITEMS
  },
  {
    name: "Himalayan Outfitters Manali",
    town: "Manali",
    area: "Mall Road",
    items: STANDARD_ITEMS
  },
  {
    name: "Uttarkashi Mountaineering Store",
    town: "Uttarkashi",
    area: "Bhatwari Road",
    items: STANDARD_ITEMS
  }
];

export function getGearShops(baseTown: string): GearShop[] {
  const norm = baseTown.toLowerCase().trim();
  return GEAR_SHOPS.filter(
    (shop) => shop.town.toLowerCase() === norm || shop.town.toLowerCase().includes(norm)
  );
}

export function estimateGearRentalCost(trekName: string, durationDays: number): number {
  // Average rental contains trekking shoes, warm jacket, and trekking pole
  // Cost = (100 + 100 + 50) = 250 per day
  const dailyCost = 250;
  return dailyCost * durationDays;
}
