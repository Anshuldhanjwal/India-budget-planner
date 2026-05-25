import { getDestination } from "./destinations";

// Hardcoded road distances in km for popular pairs
const HARDCODED_DISTANCES: Record<string, number> = {
  "delhi-jaipur": 270,
  "jaipur-delhi": 270,
  "delhi-agra": 230,
  "agra-delhi": 230,
  "delhi-shimla": 340,
  "shimla-delhi": 340,
  "delhi-manali": 530,
  "manali-delhi": 530,
  "delhi-dehradun": 250,
  "dehradun-delhi": 250,
  "delhi-kathgodam": 290,
  "kathgodam-delhi": 290,
  "delhi-rishikesh": 240,
  "rishikesh-delhi": 240,
  "delhi-haridwar": 220,
  "haridwar-delhi": 220,
  "delhi-dharamshala": 480,
  "dharamshala-delhi": 480,
  "mumbai-pune": 150,
  "pune-mumbai": 150,
  "mumbai-goa": 590,
  "goa-mumbai": 590,
  "bangalore-mysore": 140,
  "mysore-bangalore": 140,
  "bangalore-ooty": 270,
  "ooty-bangalore": 270,
  "bangalore-chennai": 350,
  "chennai-bangalore": 350,
  "kolkata-darjeeling": 615,
  "darjeeling-kolkata": 615,
  "guwahati-shillong": 100,
  "shillong-guwahati": 100,
  "shillong-cherrapunji": 54,
  "cherrapunji-shillong": 54,
  "shillong-dawki": 82,
  "dawki-shillong": 82,
  "njp-gangtok": 120,
  "gangtok-njp": 120,
  "dehradun-sankri": 200,
  "sankri-dehradun": 200,
  "kathgodam-lohajung": 220,
  "lohajung-kathgodam": 220,
  "rishikesh-chopta": 200,
  "chopta-rishikesh": 200,
  "haridwar-rishikesh": 20,
  "rishikesh-haridwar": 20,
  "dehradun-mussoorie": 35,
  "mussoorie-dehradun": 35,
  "shimla-kaza": 410,
  "kaza-shimla": 410,
  "manali-kaza": 200,
  "kaza-manali": 200,
  "delhi-chandigarh": 250,
  "chandigarh-delhi": 250,
  "chandigarh-manali": 310,
  "manali-chandigarh": 310,
  "guwahati-shillong-cherrapunji": 154,
  "rishikesh-govindghat": 290,
  "govindghat-rishikesh": 290,
  "mumbai-lonavala": 83,
  "lonavala-mumbai": 83,
};

// Haversine formula to calculate great-circle distance between two points
function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getCityDistance(fromCity: string, toCity: string): number {
  if (fromCity.toLowerCase() === toCity.toLowerCase()) {
    return 0;
  }

  const key = `${fromCity.toLowerCase()}-${toCity.toLowerCase()}`;
  if (HARDCODED_DISTANCES[key]) {
    return HARDCODED_DISTANCES[key];
  }

  const destA = getDestination(fromCity);
  const destB = getDestination(toCity);

  if (!destA || !destB) {
    // Return a default fallback if either destination is missing
    return 500;
  }

  const crowFlyDistance = calculateHaversineDistance(
    destA.lat,
    destA.lng,
    destB.lat,
    destB.lng
  );

  // Apply a 1.3 road factor as specified in implementation plan
  return Math.round(crowFlyDistance * 1.3);
}
