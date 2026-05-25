import { Attraction } from "./types";
import { getDestination } from "./destinations";

const STATIC_ATTRACTIONS: Record<string, Attraction[]> = {
  "delhi": [
    { name: "Red Fort (Lal Qila)", description: "17th-century Mughal fortress made of red sandstone, famous for its museums and Independence Day celebrations.", entryFee: 80, timings: "09:00 AM - 05:30 PM (Closed Monday)", durationHours: 2.5, tags: ["history", "heritage", "architecture"] },
    { name: "Qutub Minar", description: "73-meter tall victory tower built in the 12th century, surrounded by ruins of ancient Hindu and Jain temples.", entryFee: 40, timings: "07:00 AM - 09:00 PM (Daily)", durationHours: 1.5, tags: ["history", "heritage", "monument"] },
    { name: "India Gate", description: "War memorial dedicated to Indian soldiers, featuring a lush public park popular for evening strolls and street food.", entryFee: 0, timings: "24/7 (Best in evening)", durationHours: 1, tags: ["monument", "park", "free"] },
    { name: "Lotus Temple (Bahai House of Worship)", description: "Flowerlike temple open to all religions, famous for its white marble petals and peaceful silent prayer hall.", entryFee: 0, timings: "08:30 AM - 05:00 PM (Closed Monday)", durationHours: 1, tags: ["religion", "architecture", "peaceful"] },
    { name: "Humayun's Tomb", description: "Grand tomb built in 1570, the first garden-tomb on the Indian subcontinent, which inspired the Taj Mahal.", entryFee: 40, timings: "06:00 AM - 06:00 PM (Daily)", durationHours: 2, tags: ["heritage", "architecture", "garden"] },
    { name: "Akshardham Temple", description: "Massive modern Hindu temple complex showcasing traditional Indian culture, spirituality, and architecture.", entryFee: 0, timings: "10:00 AM - 08:00 PM (Closed Monday)", durationHours: 4, tags: ["temple", "spiritual", "light-show"] }
  ],
  "mumbai": [
    { name: "Gateway of India", description: "Arch monument built in the early 20th century to commemorate the visit of King George V, located on the waterfront.", entryFee: 0, timings: "24/7", durationHours: 1, tags: ["monument", "sea-view", "heritage"] },
    { name: "Marine Drive", description: "3-kilometer long arc-shaped boulevard along the Arabian Sea, also known as the Queen's Necklace.", entryFee: 0, timings: "24/7", durationHours: 1.5, tags: ["sea-view", "scenic", "relaxing"] },
    { name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)", description: "UNESCO World Heritage railway station featuring striking Victorian Gothic Revival architecture.", entryFee: 0, timings: "24/7", durationHours: 1, tags: ["architecture", "heritage", "transit"] },
    { name: "Elephanta Caves", description: "Rock-cut cave temples on Elephanta Island dedicated to Lord Shiva, reached by ferry from the Gateway.", entryFee: 250, timings: "09:00 AM - 05:00 PM (Closed Monday)", durationHours: 4, tags: ["caves", "history", "ferry-ride"] },
    { name: "Juhu Beach", description: "Broad sandy beach popular for watching sunsets, horse rides, and tasting Mumbai street food like Pav Bhaji.", entryFee: 0, timings: "24/7", durationHours: 2, tags: ["beach", "street-food", "sunset"] },
    { name: "Haji Ali Dargah", description: "Mosque and tomb located on an islet off the coast of Worli, accessible via a narrow causeway during low tide.", entryFee: 0, timings: "06:00 AM - 10:00 PM (Daily)", durationHours: 1.5, tags: ["spiritual", "sea-view", "pilgrimage"] }
  ],
  "bangalore": [
    { name: "Bangalore Palace", description: "Royal palace built in the late 19th century, resembling Windsor Castle, with Tudor-style towers and arches.", entryFee: 230, timings: "10:00 AM - 05:30 PM (Daily)", durationHours: 2, tags: ["palace", "royalty", "history"] },
    { name: "Lalbagh Botanical Garden", description: "Historic 240-acre garden featuring a famous glass house modeled on London's Crystal Palace and a lake.", entryFee: 30, timings: "06:00 AM - 07:00 PM (Daily)", durationHours: 2, tags: ["nature", "garden", "walk"] },
    { name: "Cubbon Park", description: "Lush green lung space in the heart of the city, spanning 300 acres, with walking paths and colonial buildings.", entryFee: 0, timings: "24/7 (Vehicle-free on Sundays)", durationHours: 1.5, tags: ["park", "nature", "free"] },
    { name: "Tipu Sultan's Summer Palace", description: "Two-storied ornate wooden palace built entirely of French teak, featuring beautiful pillars and arches.", entryFee: 20, timings: "08:30 AM - 05:30 PM (Daily)", durationHours: 1, tags: ["history", "architecture", "museum"] },
    { name: "Visvesvaraya Industrial & Technological Museum", description: "Interactive science museum with galleries on engines, space, electronics, and biotechnology.", entryFee: 85, timings: "10:00 AM - 06:00 PM (Daily)", durationHours: 2.5, tags: ["science", "museum", "kids-friendly"] },
    { name: "Nandi Hills", description: "Ancient hill fortress 60km from the city, popular for catching spectacular sunrise views above the clouds.", entryFee: 20, timings: "06:00 AM - 06:00 PM (Daily)", durationHours: 4, tags: ["sunrise", "scenic", "trek"] }
  ],
  "jaipur": [
    { name: "Amber Palace (Amer Fort)", description: "Hilltop fortress featuring opulent royal halls (Sheesh Mahal), ramparts, and panoramic views of Maota Lake.", entryFee: 100, timings: "09:00 AM - 06:00 PM (Daily)", durationHours: 3, tags: ["fort", "heritage", "palace"] },
    { name: "Hawa Mahal (Palace of Winds)", description: "Five-story pink sandstone structure with 953 small windows (jharokhas) designed for royal women to watch street festivals.", entryFee: 50, timings: "09:00 AM - 05:00 PM (Daily)", durationHours: 1, tags: ["architecture", "landmark", "heritage"] },
    { name: "City Palace", description: "Royal residence showcasing a fusion of Rajasthani and Mughal styles, housing museums and private royal courtyards.", entryFee: 200, timings: "09:30 AM - 05:00 PM (Daily)", durationHours: 2, tags: ["palace", "museum", "royalty"] },
    { name: "Jantar Mantar", description: "UNESCO site containing 19 stone astronomical instruments, including the world's largest stone sundial.", entryFee: 50, timings: "09:00 AM - 04:30 PM (Daily)", durationHours: 1.5, tags: ["science", "heritage", "astronomy"] },
    { name: "Nahargarh Fort", description: "Fort overlooking Jaipur city, famous for sunset views, wax museum, and stepwells.", entryFee: 50, timings: "10:00 AM - 05:30 PM (Daily)", durationHours: 2, tags: ["fort", "sunset", "panoramic"] },
    { name: "Albert Hall Museum", description: "The oldest museum in the state, displaying carpets, paintings, ivory, metal sculptures, and an Egyptian mummy.", entryFee: 40, timings: "09:00 AM - 05:00 PM (Night tour: 07:00 PM - 10:00 PM)", durationHours: 2, tags: ["museum", "history", "art"] }
  ],
  "agra": [
    { name: "Taj Mahal", description: "World-famous white marble mausoleum built by Shah Jahan in memory of his favorite wife Mumtaz Mahal.", entryFee: 50, timings: "Sunrise to Sunset (Closed Friday)", durationHours: 3, tags: ["wonder-of-world", "heritage", "monument"] },
    { name: "Agra Fort", description: "UNESCO site, a massive 16th-century red sandstone fortress housing palaces, audience halls, and mosques.", entryFee: 50, timings: "Sunrise to Sunset (Daily)", durationHours: 2, tags: ["fort", "heritage", "history"] },
    { name: "Fatehpur Sikri", description: "Imperial capital of the Mughal Empire in the 16th century, containing Buland Darwaza and Salim Chishti's Tomb.", entryFee: 50, timings: "Sunrise to Sunset (Daily)", durationHours: 3, tags: ["heritage", "architecture", "history"] },
    { name: "Mehtab Bagh", description: "Charbagh garden complex located opposite the Taj Mahal across the Yamuna River, perfect for photography.", entryFee: 25, timings: "Sunrise to Sunset (Daily)", durationHours: 1, tags: ["garden", "taj-view", "scenic"] },
    { name: "Tomb of Itimad-ud-Daulah", description: "Often called 'Baby Taj', this is an exquisite draft of the Taj Mahal built in white marble.", entryFee: 30, timings: "Sunrise to Sunset (Daily)", durationHours: 1.5, tags: ["tomb", "architecture", "heritage"] },
    { name: "Akbar's Tomb, Sikandra", description: "The final resting place of Emperor Akbar, featuring red sandstone and white marble towers set in a deer park.", entryFee: 30, timings: "Sunrise to Sunset (Daily)", durationHours: 2, tags: ["tomb", "history", "park"] }
  ],
  "varanasi": [
    { name: "Kashi Vishwanath Temple", description: "One of the most sacred Hindu temples dedicated to Lord Shiva, featuring a gold-plated spire.", entryFee: 0, timings: "04:00 AM - 11:00 PM (Daily)", durationHours: 2, tags: ["spiritual", "temple", "pilgrimage"] },
    { name: "Dashashwamedh Ghat", description: "The main ghat in Varanasi, world-renowned for the magnificent evening Ganga Aarti ritual performed by young priests.", entryFee: 0, timings: "Aarti starts around 06:30 PM", durationHours: 1.5, tags: ["spiritual", "river-view", "ritual"] },
    { name: "Sarnath", description: "Deer Park where Gautama Buddha first taught the Dharma, containing ancient stupas and a museum.", entryFee: 20, timings: "08:00 AM - 06:00 PM (Daily)", durationHours: 3, tags: ["buddhism", "peaceful", "heritage"] },
    { name: "Assi Ghat", description: "Ghat situated at the confluence of Ganges and Assi rivers, famous for morning Subah-e-Banaras and music.", entryFee: 0, timings: "24/7 (Morning best)", durationHours: 2, tags: ["spiritual", "sunrise", "yoga"] },
    { name: "Banaras Hindu University (BHU) & New Vishwanath Temple", description: "Sprawling university campus housing the towering marble Birla Temple open to all castes.", entryFee: 0, timings: "04:00 AM - 12:00 PM, 01:00 PM - 09:00 PM", durationHours: 2, tags: ["university", "temple", "campus"] },
    { name: "Ramnagar Fort", description: "18th-century sand-colored fort on the eastern bank of Ganges, containing a museum of vintage cars and arms.", entryFee: 20, timings: "10:00 AM - 05:00 PM (Daily)", durationHours: 1.5, tags: ["fort", "museum", "river-view"] }
  ],
  "goa": [
    { name: "Calangute Beach", description: "The 'Queen of Beaches', busiest in North Goa, offering watersports, beach shacks, and vibrant shopping stalls.", entryFee: 0, timings: "24/7", durationHours: 3, tags: ["beach", "watersports", "lively"] },
    { name: "Basilica of Bom Jesus", description: "UNESCO World Heritage site holding the mortal remains of St. Francis Xavier, a masterpiece of Baroque architecture.", entryFee: 0, timings: "09:00 AM - 06:30 PM (Daily)", durationHours: 1, tags: ["church", "heritage", "history"] },
    { name: "Fort Aguada", description: "17th-century Portuguese fort and lighthouse overlooking the Arabian Sea, originally used as a water supply depot.", entryFee: 25, timings: "09:00 AM - 06:00 PM (Daily)", durationHours: 1.5, tags: ["fort", "heritage", "ocean-view"] },
    { name: "Dudhsagar Waterfalls", description: "Four-tiered majestic waterfall on the Mandovi River, looking like a sea of milk cascading down the hills.", entryFee: 400, timings: "09:00 AM - 05:00 PM (Best post-monsoon)", durationHours: 5, tags: ["waterfall", "nature", "jeep-safari"] },
    { name: "Anjuna Beach & Flea Market", description: "Hippie-paradise beach famous for its rocky formations, sunset trance parties, and Wednesday market.", entryFee: 0, timings: "24/7 (Wednesday market daytime)", durationHours: 2.5, tags: ["beach", "shopping", "sunset"] },
    { name: "Salim Ali Bird Sanctuary", description: "Mangrove habitat along the Mandovi River, home to local and migratory birds, visited by canoe.", entryFee: 10, timings: "06:00 AM - 06:00 PM (Daily)", durationHours: 2, tags: ["nature", "birds", "mangroves"] }
  ]
};

export function getAttractions(destination: string): Attraction[] {
  const norm = destination.toLowerCase().trim();

  // If destination is a trek destination, return empty array
  const destInfo = getDestination(destination);
  if (destInfo && destInfo.type.includes("trek-destination")) {
    return [];
  }

  // Also manually block popular trek names just in case
  const trekNames = [
    "kedarkantha", "roopkund", "valley of flowers", "goechala", "kheerganga",
    "hampta pass", "pin parvati", "har ki dun", "chandrashila", "hemkund sahib",
    "dzukou valley", "sandakphu", "triund", "beas kund", "prashar lake"
  ];
  if (trekNames.some(trek => norm.includes(trek))) {
    return [];
  }

  // Try static match
  if (STATIC_ATTRACTIONS[norm]) {
    return STATIC_ATTRACTIONS[norm];
  }

  // Try partial static match
  for (const key of Object.keys(STATIC_ATTRACTIONS)) {
    if (norm.includes(key) || key.includes(norm)) {
      return STATIC_ATTRACTIONS[key];
    }
  }

  // If not a trek, and not in static map, generate 6 realistic attractions based on city name
  const capitalizedDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  return [
    {
      name: `${capitalizedDest} View Point`,
      description: `A panoramic vantage point offering breathtaking views of the surrounding hills, valleys, and ${capitalizedDest} town landscape.`,
      entryFee: 0,
      timings: "06:00 AM - 06:00 PM",
      durationHours: 1.5,
      tags: ["scenic", "viewpoint", "nature"]
    },
    {
      name: `${capitalizedDest} Monastery & Temple Complex`,
      description: `A peaceful religious site reflecting the local cultural heritage, decorated with beautiful statues and traditional murals.`,
      entryFee: 0,
      timings: "08:00 AM - 06:00 PM",
      durationHours: 1,
      tags: ["spiritual", "heritage", "peaceful"]
    },
    {
      name: `${capitalizedDest} Pine Forest Walk`,
      description: `A calm trail through dense pine and deodar forests, ideal for morning walks, birdwatching, and enjoying fresh air.`,
      entryFee: 0,
      timings: "24/7",
      durationHours: 2,
      tags: ["nature", "walk", "forest"]
    },
    {
      name: `Local Heritage Museum of ${capitalizedDest}`,
      description: `A small museum displaying artifacts, traditional attire, old photographs, and tools representing the history of the local tribes.`,
      entryFee: 30,
      timings: "10:00 AM - 05:00 PM (Closed Sunday)",
      durationHours: 1.5,
      tags: ["museum", "culture", "history"]
    },
    {
      name: `${capitalizedDest} Waterfalls`,
      description: `A scenic natural waterfall cascading down rocky cliffs into a pool, surrounded by lush green foliage.`,
      entryFee: 20,
      timings: "08:00 AM - 05:00 PM",
      durationHours: 2,
      tags: ["nature", "waterfall", "scenic"]
    },
    {
      name: `${capitalizedDest} Local Bazaar`,
      description: `A bustling marketplace perfect for purchasing local handicrafts, woolen clothes, spices, and trying traditional food.`,
      entryFee: 0,
      timings: "09:00 AM - 08:00 PM",
      durationHours: 2,
      tags: ["shopping", "street-food", "culture"]
    }
  ];
}
